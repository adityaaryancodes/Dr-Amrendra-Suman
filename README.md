# Author Portfolio Blog - Poetry and Stories Archive

An editorial-style full stack author website built with Next.js App Router, Tailwind CSS, Supabase, and Vercel. It combines a public literary portfolio with an admin panel for publishing poems, stories, and poetry-image gallery entries.

## What It Includes

- Home page with hero, featured poems, latest stories, gallery preview, and author section
- Dedicated `Poems`, `Stories`, `Gallery`, `About`, and `Contact` pages
- Single post pages for every poem, story, and gallery entry
- Title search and category filters across archive sections
- Light and dark mode support
- Responsive editorial layout with elegant typography
- Admin login with signed cookie sessions
- Create, edit, publish, and delete posts
- Supabase Storage uploads for poetry images
- Contact form submissions stored in Supabase
- Local fallback content so the site still renders while Supabase is empty

## Stack

- Next.js App Router
- Tailwind CSS
- Supabase PostgreSQL
- Supabase Storage
- Vercel

## Current Project Folder

The app lives in this repository folder:

```text
poetry-gallery/
```

You can keep that folder name, or rename it later if you want the repo to match the new brand.

## Project Structure

```text
poetry-gallery/
  app/
    page.js
    poems/page.js
    stories/page.js
    gallery/page.js
    post/[id]/page.js
    about/page.js
    contact/page.js
    admin/login/page.js
    admin/dashboard/page.js
    admin/upload/page.js
    admin/posts/page.js
    admin/posts/[id]/edit/page.js
  components/
  lib/
    supabaseClient.js
    posts.js
    actions.js
    auth.js
    localContent.js
  public/
    images/collection/
  scripts/
    create-admin.mjs
    sync-collection.mjs
  styles/
  supabase/
    schema.sql
```

## Supabase Schema

The SQL in [supabase/schema.sql](./supabase/schema.sql) creates:

- `posts`
- `author`
- `admin_users`
- `contact_messages`
- storage bucket `poetry-images`

It also includes a compatibility step for older installs that still used a `description` column on `posts`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Notes:

- The public client accepts either `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.
- `ADMIN_SESSION_SECRET` should be a long random string.

## Setup

1. Install dependencies.

```bash
npm install
```

2. If you already have poetry images in the top-level `COLLECTION` folder, sync them into the site assets.

```bash
npm run sync:collection
```

3. Copy the environment file and fill in the values above.

```bash
cp .env.example .env.local
```

4. Open the Supabase SQL editor and run `supabase/schema.sql`.

5. Create an admin password hash.

```bash
npm run hash-admin -- admin@example.com your-password
```

6. Run the printed SQL insert statement in Supabase to create the admin login.

7. Optional but recommended: insert one row into `author` for the public profile.

```sql
insert into public.author (name, bio, email, social_links)
values (
  'Your Name',
  'Short biography for the homepage and about page.',
  'you@example.com',
  '{"instagram":"","x":"","website":""}'::jsonb
);
```

8. Start the app.

```bash
npm run dev
```

## Public Routes

- `/`
- `/poems`
- `/stories`
- `/gallery`
- `/post/[id]`
- `/about`
- `/contact`
- `/category/[name]`

## Admin Routes

- `/admin/login`
- `/admin/dashboard`
- `/admin/upload`
- `/admin/posts`
- `/admin/posts/[id]/edit`

## Content Model

`posts.type` supports:

- `poem`
- `story`
- `gallery`

Typical usage:

- Poems can be text-first or image-led
- Stories work as blog posts, essays, or prose pieces
- Gallery posts are image-based archive entries with caption text

## Local Fallback Content

If Supabase is not configured yet, or the database tables are still empty, the app can render local fallback content from:

- `lib/localContent.js`
- `public/images/collection/`

This helps the site look complete during setup.

## Deploying To Vercel

1. Push the repository to Git.
2. Import the repo into Vercel.
3. Add the same environment variables in the Vercel project settings.
4. Deploy.

## Security Notes

- The `admin_users.password` field stores an `scrypt` hash in `salt:hash` format.
- Admin writes run with the service role on the server only.
- If secrets were ever shared in chat or screenshots, rotate them in Supabase before production.
