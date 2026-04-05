import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import DeletePostButton from "@/components/DeletePostButton";
import { deletePostAction } from "@/lib/actions";
import { requireAdminSession } from "@/lib/auth";
import { getAdminPosts } from "@/lib/posts";
import { formatDisplayDate, truncateText } from "@/lib/utils";

export const metadata = {
  title: "Posts | Author Portfolio Admin"
};

export default async function AdminPostsPage() {
  const session = await requireAdminSession();
  const posts = await getAdminPosts();

  return (
    <AdminShell
      title="Manage posts"
      description="Edit poems, stories, and gallery entries, update publish state, or remove work from the archive."
      adminEmail={session.email}
    >
      {posts.length ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="grid gap-5 rounded-[30px] border border-border bg-background p-4 lg:grid-cols-[180px_minmax(0,1fr)]"
            >
              {post.image_url ? (
                <img src={post.image_url} alt={post.title} className="h-full w-full rounded-[24px] object-cover" />
              ) : (
                <div className="flex min-h-[180px] items-center justify-center rounded-[24px] bg-surface text-sm uppercase tracking-[0.18em] text-muted">
                  {post.type}
                </div>
              )}

              <div className="flex flex-col justify-between gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {post.type}
                    </span>
                    <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted">{post.category}</span>
                    <span className="rounded-full bg-surface px-3 py-1 text-xs text-muted">{post.published ? "Published" : "Draft"}</span>
                    <span className="text-xs text-muted">{formatDisplayDate(post.created_at)}</span>
                  </div>
                  <h2 className="mt-3 font-display text-3xl">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{truncateText(post.content, 240)}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href={`/post/${post.id}`} className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground">
                    View
                  </Link>
                  <Link href={`/admin/posts/${post.id}/edit`} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
                    Edit
                  </Link>
                  <form action={deletePostAction.bind(null, post.id, post.image_url, post.type)}>
                    <DeletePostButton />
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-border px-6 py-10 text-center text-sm leading-7 text-muted">
          No archive posts have been created yet. Start by adding a poem, story, or gallery entry.
        </div>
      )}
    </AdminShell>
  );
}
