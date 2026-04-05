import Link from "next/link";
import { formatDisplayDate, getReadingTimeLabel, truncateText } from "@/lib/utils";

export default function StoryCard({ post }) {
  return (
    <article className="rounded-[22px] bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-muted">
        <span>{post.category || "Story"}</span>
        <span>{formatDisplayDate(post.created_at)}</span>
      </div>
      <h3 className="mt-4 font-display text-2xl leading-snug">
        <Link href={`/post/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="mt-4 text-[15px] leading-7 text-muted">{truncateText(post.content, 260)}</p>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm text-muted">
        <span>{getReadingTimeLabel(post.content)}</span>
        <Link href={`/post/${post.id}`} className="font-semibold text-[var(--secondary-accent)]">
          Read story
        </Link>
      </div>
    </article>
  );
}
