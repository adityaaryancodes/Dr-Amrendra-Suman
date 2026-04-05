import PoemCard from "@/components/PoemCard";

export default function GalleryGrid({
  posts = [],
  emptyTitle = "No poems yet",
  emptyDescription = "Upload your first piece from the admin panel and the gallery will appear here."
}) {
  if (!posts.length) {
    return (
      <div className="rounded-[22px] bg-surface px-8 py-14 text-center shadow-sm">
        <h2 className="font-display text-3xl text-foreground">{emptyTitle}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
      {posts.map((post) => (
        <div key={post.id} className="mb-6 break-inside-avoid">
          <PoemCard post={post} />
        </div>
      ))}
    </div>
  );
}
