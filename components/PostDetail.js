import ShareButton from "@/components/ShareButton";
import { formatDisplayDate, getReadingTimeLabel } from "@/lib/utils";

export default function PostDetail({ post }) {
  const hasImage = Boolean(post.image_url);

  return (
    <section
      className={`mx-auto max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:px-8 lg:py-20 ${
        hasImage ? "grid lg:grid-cols-[1.05fr_0.95fr]" : "block"
      }`}
    >
      {hasImage ? (
        <div className="overflow-hidden rounded-[24px] bg-surface shadow-card">
          <img src={post.image_url} alt={post.title} className="h-full w-full object-cover" />
        </div>
      ) : null}

      <div className={`flex flex-col justify-center ${hasImage ? "" : "mx-auto max-w-4xl"}`}>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              {post.type || post.category || "Archive"}
            </span>
            <span className="text-sm text-muted">{formatDisplayDate(post.created_at)}</span>
            <span className="text-sm text-muted">{getReadingTimeLabel(post.content)}</span>
          </div>
          <h1 className="font-display text-5xl leading-tight sm:text-6xl">{post.title}</h1>
          <div className="poetry-copy max-w-3xl text-base leading-8 text-muted">{post.content}</div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ShareButton />
        </div>
      </div>
    </section>
  );
}
