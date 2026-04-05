import Link from "next/link";
import AdminShell from "@/components/AdminShell";
import { requireAdminSession } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/posts";

export const metadata = {
  title: "Dashboard | Author Portfolio Admin"
};

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();
  const dashboard = await getAdminDashboardData();

  return (
    <AdminShell
      title="Dashboard"
      description="Track poems, stories, gallery entries, and publishing status across the whole literary archive."
      adminEmail={session.email}
    >
      <div className="grid gap-5 lg:grid-cols-4">
        <div className="rounded-[28px] bg-accent px-6 py-7 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-white/70">Total posts</p>
          <p className="mt-3 font-display text-5xl">{dashboard.totalPosts}</p>
        </div>
        <div className="rounded-[28px] border border-border bg-background px-6 py-7">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Published</p>
          <p className="mt-3 font-display text-5xl">{dashboard.publishedPosts}</p>
        </div>
        <div className="rounded-[28px] border border-border bg-background px-6 py-7">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Poems / Stories</p>
          <p className="mt-3 font-display text-5xl">
            {dashboard.poemCount} / {dashboard.storyCount}
          </p>
        </div>
        <div className="rounded-[28px] border border-border bg-background px-6 py-7">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Gallery</p>
          <p className="mt-3 font-display text-5xl">{dashboard.galleryCount}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl">Recent posts</h2>
            <p className="mt-1 text-sm text-muted">The latest works added to the public archive.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/upload" className="text-sm font-semibold text-accent">
              Create post
            </Link>
            <Link href="/admin/posts" className="text-sm font-semibold text-accent">
              Manage all posts
            </Link>
          </div>
        </div>

        {dashboard.categories.length ? (
          <div className="flex flex-wrap gap-2">
            {dashboard.categories.map((category) => (
              <span key={category} className="rounded-full bg-background px-3 py-1 text-xs text-muted">
                {category}
              </span>
            ))}
          </div>
        ) : null}

        {dashboard.latestPosts.length ? (
          <div className="grid gap-4">
            {dashboard.latestPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col gap-4 rounded-[28px] border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} className="h-20 w-20 rounded-2xl object-cover" />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface text-xs uppercase tracking-[0.18em] text-muted">
                      {post.type}
                    </div>
                  )}
                  <div>
                    <p className="font-display text-2xl">{post.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {post.type} | {post.category || "Archive"} | {post.published ? "Published" : "Draft"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={`/post/${post.id}`} className="rounded-full border border-border px-4 py-2 text-sm text-foreground">
                    View
                  </Link>
                  <Link href={`/admin/posts/${post.id}/edit`} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-border px-6 py-10 text-center text-sm leading-7 text-muted">
            Your dashboard will populate after you create the first archived post.
          </div>
        )}
      </div>
    </AdminShell>
  );
}
