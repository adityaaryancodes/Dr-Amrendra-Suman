create extension if not exists pgcrypto;

create or replace function public.set_current_timestamp_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  image_url text,
  category text not null default 'Archive',
  type text not null default 'poem' check (type in ('poem', 'story', 'gallery')),
  published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'posts'
      and column_name = 'description'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'posts'
      and column_name = 'content'
  ) then
    alter table public.posts rename column description to content;
  end if;
end $$;

alter table public.posts add column if not exists image_url text;
alter table public.posts add column if not exists content text;
alter table public.posts add column if not exists category text not null default 'Archive';
alter table public.posts add column if not exists type text not null default 'poem';
alter table public.posts add column if not exists published boolean not null default true;
alter table public.posts add column if not exists created_at timestamptz not null default timezone('utc', now());
alter table public.posts add column if not exists updated_at timestamptz not null default timezone('utc', now());

update public.posts
set image_url = null
where image_url = '';

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'posts'
      and column_name = 'description'
  ) and exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'posts'
      and column_name = 'content'
  ) then
    execute 'update public.posts set content = coalesce(content, description) where content is null';
  end if;
end $$;

alter table public.posts alter column content set not null;
alter table public.posts alter column image_url drop not null;
alter table public.posts alter column category set not null;
alter table public.posts alter column type set default 'poem';
alter table public.posts alter column published set default true;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'posts_type_check'
  ) then
    alter table public.posts
      add constraint posts_type_check check (type in ('poem', 'story', 'gallery'));
  end if;
end $$;

create table if not exists public.author (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text not null default '',
  profile_image text,
  email text,
  social_links jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists posts_category_idx on public.posts (category);
create index if not exists posts_type_idx on public.posts (type);
create index if not exists posts_published_idx on public.posts (published);
create index if not exists posts_title_lower_idx on public.posts (lower(title));

drop trigger if exists set_posts_updated_at on public.posts;
create trigger set_posts_updated_at
before update on public.posts
for each row
execute function public.set_current_timestamp_updated_at();

drop trigger if exists set_author_updated_at on public.author;
create trigger set_author_updated_at
before update on public.author
for each row
execute function public.set_current_timestamp_updated_at();

alter table public.posts enable row level security;
alter table public.author enable row level security;
alter table public.admin_users enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
on public.posts
for select
using (published = true);

drop policy if exists "Public can read author profile" on public.author;
create policy "Public can read author profile"
on public.author
for select
using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'poetry-images',
  'poetry-images',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

drop policy if exists "Public can view poetry images" on storage.objects;
create policy "Public can view poetry images"
on storage.objects
for select
using (bucket_id = 'poetry-images');

comment on table public.admin_users is 'Password column stores an scrypt hash in the format salt:hash.';
comment on table public.contact_messages is 'Messages submitted from the public contact form.';
