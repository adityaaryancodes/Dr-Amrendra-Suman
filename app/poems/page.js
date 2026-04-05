import CategoryFilter from "@/components/CategoryFilter";
import PoemCard from "@/components/PoemCard";
import SearchBar from "@/components/SearchBar";
import SiteShell from "@/components/SiteShell";
import { getCategories, getGalleryPosts, getPoems } from "@/lib/posts";

export const metadata = {
  title: "Poems | Author Portfolio Blog",
  description: "Read poetry, image-led verses, and lyrical fragments from the archive."
};

export default async function PoemsPage({ searchParams }) {
  const { q = "", category = "" } = await searchParams;
  const [posts, categories, galleryPosts] = await Promise.all([
    getPoems({ query: q, category }),
    getCategories({ type: "poem" }),
    getGalleryPosts()
  ]);
  const visualPoemTitles = ["Last Gold", "Holding On", "Fading Street", "Window of Silence", "Between Lines", "Small Flame"];
  const visualPoems = visualPoemTitles
    .map((title) => galleryPosts.find((post) => post.title === title))
    .filter(Boolean)
    .map((post) => ({
      ...post,
      type: "poem",
      category: "Visual Poem"
    }));
  const showVisualPoems = !q && !category && visualPoems.length > 0;

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl space-y-6 px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Poems</p>
          <h1 className="font-display text-5xl leading-tight sm:text-6xl">Poetry, fragments, and image-led verses.</h1>
          <p className="max-w-2xl text-base leading-8 text-muted">
            Browse published poems, search by title, and filter the archive by category.
          </p>
        </div>
      </section>

      <section className="editorial-rule mx-auto max-w-6xl space-y-6 px-4 pt-10 sm:px-6 lg:px-8">
        <SearchBar actionPath="/poems" defaultValue={q} hiddenFields={{ category }} placeholder="Search poems by title..." />
        <CategoryFilter categories={categories} currentCategory={category} query={q} basePath="/poems" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PoemCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {showVisualPoems ? (
        <section className="editorial-rule mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-muted">Visual poems</p>
              <h2 className="mt-2 font-display text-[2rem] leading-tight sm:text-[2.1rem]">Image-based poems from the archive.</h2>
              <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
                These poem-images are now included on the Poems page as well, so readers can browse both text poems and visual verses from one place.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visualPoems.map((post) => (
              <PoemCard key={`visual-${post.id}`} post={post} />
            ))}
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}
