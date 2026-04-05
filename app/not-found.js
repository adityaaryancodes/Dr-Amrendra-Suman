import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="rounded-[26px] bg-surface px-8 py-14 shadow-sm">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Not found</p>
          <h1 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">This poem is no longer on the shelf.</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-muted">
            The page you requested does not exist, or the post has been removed from the gallery.
          </p>
          <Link
            href="/gallery"
            className="soft-button mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            Return to gallery
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
