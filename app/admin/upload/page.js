import AdminShell from "@/components/AdminShell";
import UploadForm from "@/components/UploadForm";
import { requireAdminSession } from "@/lib/auth";
import { createPostAction } from "@/lib/actions";
import { getAdminCategories } from "@/lib/posts";

export const metadata = {
  title: "Create Post | Author Portfolio Admin"
};

export default async function AdminUploadPage() {
  const session = await requireAdminSession();
  const categories = await getAdminCategories();

  return (
    <AdminShell
      title="Create a post"
      description="Publish a poem, write a story, or add a gallery image entry from one editor."
      adminEmail={session.email}
    >
      <UploadForm action={createPostAction} submitLabel="Publish post" pendingLabel="Publishing..." categories={categories} />
    </AdminShell>
  );
}
