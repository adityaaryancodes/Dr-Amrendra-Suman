import { notFound } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import UploadForm from "@/components/UploadForm";
import { updatePostAction } from "@/lib/actions";
import { requireAdminSession } from "@/lib/auth";
import { getAdminCategories, getAdminPostById } from "@/lib/posts";

export default async function AdminEditPostPage({ params }) {
  const session = await requireAdminSession();
  const { id } = await params;
  const [post, categories] = await Promise.all([getAdminPostById(id), getAdminCategories()]);

  if (!post) {
    notFound();
  }

  return (
    <AdminShell
      title="Edit post"
      description="Update the title, content, category, type, publish state, or replace the uploaded image."
      adminEmail={session.email}
    >
      <UploadForm
        action={updatePostAction.bind(null, post.id)}
        submitLabel="Save changes"
        pendingLabel="Saving..."
        post={post}
        categories={categories}
      />
    </AdminShell>
  );
}
