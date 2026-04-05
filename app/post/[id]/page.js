import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import SiteShell from "@/components/SiteShell";
import { getPostById } from "@/lib/posts";
import { buildUrl, truncateText } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    return {
      title: "Work not found | Author Portfolio Blog"
    };
  }

  return {
    title: `${post.title} | Author Portfolio Blog`,
    description: truncateText(post.content, 150),
    openGraph: {
      title: post.title,
      description: truncateText(post.content, 150),
      images: post.image_url ? [post.image_url] : [],
      url: buildUrl(`/post/${post.id}`)
    }
  };
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <SiteShell>
      <PostDetail post={post} />
    </SiteShell>
  );
}
