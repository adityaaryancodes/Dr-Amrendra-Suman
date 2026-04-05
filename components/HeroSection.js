import Link from "next/link";
import { formatDisplayDate, getReadingTimeLabel } from "@/lib/utils";

export default function HeroSection({ author, featuredPost }) {
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20 lg:pt-16">
      <div className="flex flex-col justify-center">
        <span className="inline-flex w-fit rounded-full bg-accent-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-foreground">
          Author portfolio
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] text-foreground sm:text-[4rem]">
          Poems and visual fragments gathered in one quiet archive.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted">
          {author.bio}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/poems"
            className="soft-button inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            Read poems
          </Link>
          <Link
            href="/gallery"
            className="soft-button-secondary inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            View gallery
          </Link>
          <Link href="/admin" className="inline-flex items-center px-2 py-3 text-sm font-semibold text-[var(--secondary-accent)]">
            Admin
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-8 top-10 h-36 w-36 rounded-full bg-accent-soft blur-3xl" />
        <div className="absolute bottom-4 right-0 h-40 w-40 rounded-full bg-[var(--secondary-soft)] blur-3xl" />
        {featuredPost ? (
          <div className="relative overflow-hidden rounded-[26px] bg-surface shadow-card">
            {featuredPost.image_url ? (
              <img src={featuredPost.image_url} alt={featuredPost.title} className="h-[520px] w-full object-cover" />
            ) : (
              <div className="flex h-[520px] items-center justify-center bg-[var(--secondary-soft)] px-10 text-center text-muted">
                A featured literary work from the archive.
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-6 text-white sm:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-white/70">{featuredPost.type}</p>
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{featuredPost.title}</h2>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/80">
                <span>{formatDisplayDate(featuredPost.created_at)}</span>
                <span>{getReadingTimeLabel(featuredPost.content)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[420px] items-center justify-center rounded-[26px] bg-surface shadow-card">
            <p className="max-w-sm text-center text-sm leading-7 text-muted">
              The archive will highlight a featured poem or gallery piece here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
