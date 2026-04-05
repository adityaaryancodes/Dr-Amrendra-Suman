import Link from "next/link";
import AboutAuthor from "@/components/AboutAuthor";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedPosts from "@/components/FeaturedPosts";
import HeroSection from "@/components/HeroSection";
import LiteraryQuoteBand from "@/components/LiteraryQuoteBand";
import PoemCard from "@/components/PoemCard";
import SectionTransition from "@/components/SectionTransition";
import SiteShell from "@/components/SiteShell";
import { getAuthorProfile, getGalleryPosts, getPoems } from "@/lib/posts";

export default async function HomePage() {
  const [author, poemPosts, galleryPosts] = await Promise.all([
    getAuthorProfile(),
    getPoems(),
    getGalleryPosts()
  ]);

  const poems = poemPosts.slice(0, 3);
  const galleryPreview = galleryPosts.slice(0, 6);
  const featuredPost = poems[0] || galleryPreview[0] || null;
  const categoryItems = [
    {
      eyebrow: "Lyrical archive",
      title: "Poems",
      count: poemPosts.length,
      description: "Image-led verses, lyrical fragments, and meditative poems arranged for slow reading and return visits.",
      helper: "Read by rhythm",
      href: "/poems",
      tone: "bg-gradient-to-br from-[rgba(230,165,126,0.14)] via-surface to-surface"
    },
    {
      eyebrow: "Visual archive",
      title: "Gallery",
      count: galleryPosts.length,
      description: "Image-led poems, visual fragments, and preserved literary cards arranged for browsing and return visits.",
      helper: "Explore the visuals",
      href: "/gallery",
      tone: "bg-gradient-to-br from-[rgba(230,165,126,0.09)] via-surface to-[rgba(107,122,143,0.10)]"
    }
  ];

  return (
    <SiteShell>
      <div className="section-reveal" style={{ "--reveal-delay": "0.02s" }}>
        <HeroSection author={author} featuredPost={featuredPost} />
      </div>

      <SectionTransition label="Browse the archive" />

      <CategoryShowcase items={categoryItems} />

      <SectionTransition label="Selected poems" />

      <FeaturedPosts
        eyebrow="Featured poems"
        title="Poems that anchor the archive"
        description="A small selection of poems from the portfolio, blending image-led work and text-first pieces."
        posts={poems}
        type="poem"
        viewAllHref="/poems"
        viewAllLabel="View all poems"
      />

      <SectionTransition label="Literary interlude" />

      <LiteraryQuoteBand
        eyebrow="Typography section"
        quote="Every archive is partly memory, partly arrangement, and partly the courage to publish what would otherwise stay hidden."
        attribution="Archive note"
      />

      <SectionTransition label="Visual fragments" />

      <section className="editorial-rule section-reveal mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8" style={{ "--reveal-delay": "0.08s" }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-muted">Gallery preview</p>
            <h2 className="mt-2 font-display text-[2rem] leading-tight sm:text-[2.1rem]">Poetry images and visual fragments</h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
              A glimpse of the image archive that sits alongside the poems and the author profile.
            </p>
          </div>
          <Link href="/gallery" className="text-sm font-semibold text-[var(--secondary-accent)]">
            View gallery
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {galleryPreview.map((post) => (
            <PoemCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <SectionTransition label="Author profile" />

      <div className="section-reveal" style={{ "--reveal-delay": "0.08s" }}>
        <AboutAuthor author={author} />
      </div>
    </SiteShell>
  );
}
