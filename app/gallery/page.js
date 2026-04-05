import CategoryFilter from "@/components/CategoryFilter";
import GalleryGrid from "@/components/GalleryGrid";
import SearchBar from "@/components/SearchBar";
import SiteShell from "@/components/SiteShell";
import { getCategories, getGalleryPosts } from "@/lib/posts";

export const metadata = {
  title: "Gallery | Author Portfolio Blog",
  description: "Browse poetry images, visual poems, and gallery fragments from the archive."
};

export default async function GalleryPage({ searchParams }) {
  const { q = "", category = "" } = await searchParams;
  const [posts, categories] = await Promise.all([
    getGalleryPosts({ query: q, category }),
    getCategories({ type: "gallery" })
  ]);

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl space-y-6 px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Gallery</p>
          <h1 className="font-display text-5xl leading-tight sm:text-6xl">Poetry images and visual works.</h1>
          <p className="max-w-2xl text-base leading-8 text-muted">
            Search visual entries by title, filter by category, and open each work on its own page.
          </p>
        </div>
      </section>

      <section className="editorial-rule mx-auto max-w-6xl space-y-6 px-4 pt-10 sm:px-6 lg:px-8">
        <SearchBar actionPath="/gallery" defaultValue={q} hiddenFields={{ category }} placeholder="Search gallery titles..." />
        <CategoryFilter categories={categories} currentCategory={category} query={q} basePath="/gallery" />

        <GalleryGrid
          posts={posts}
          emptyTitle="No matching gallery entries found"
          emptyDescription="Try another title search or pick a different gallery category."
        />
      </section>
    </SiteShell>
  );
}
