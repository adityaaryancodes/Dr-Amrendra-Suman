import Link from "next/link";
import { formatDisplayDate, getReadingTimeLabel, truncateText } from "@/lib/utils";

export default function PoemCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-[22px] bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link href={`/post/${post.id}`} className="block">
        <div className="overflow-hidden">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="h-auto w-full transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex min-h-[220px] items-end bg-gradient-to-br from-[var(--accent-soft)] via-surface to-[var(--secondary-soft)] p-6">
              <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm">
                {post.type || "Archive"}
              </span>
            </div>
          )}
        </div>
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {post.type === "gallery" ? "Gallery" : post.category || "Poem"}
            </span>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span>{formatDisplayDate(post.created_at)}</span>
              <span>{getReadingTimeLabel(post.content)}</span>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-xl leading-snug text-foreground sm:text-[1.35rem]">{post.title}</h3>
            <p className="poetry-copy text-[15px] leading-7 text-muted">{truncateText(post.content, 220)}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
