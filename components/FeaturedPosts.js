import Link from "next/link";
import PoemCard from "@/components/PoemCard";
import StoryCard from "@/components/StoryCard";

export default function FeaturedPosts({ eyebrow, title, description, posts = [], type = "poem", viewAllHref = "/", viewAllLabel = "View all" }) {
  const CardComponent = type === "story" ? StoryCard : PoemCard;

  return (
    <section className="editorial-rule section-reveal mx-auto max-w-6xl px-4 pb-6 pt-16 sm:px-6 lg:px-8" style={{ "--reveal-delay": "0.08s" }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted">{eyebrow}</p>
          <h2 className="mt-2 font-display text-[2rem] leading-tight sm:text-[2.1rem]">{title}</h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-muted">{description}</p>
        </div>
        <Link href={viewAllHref} className="text-sm font-semibold text-[var(--secondary-accent)]">
          {viewAllLabel}
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <CardComponent key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
