import Link from "next/link";
import PoemCard from "@/components/PoemCard";
import SearchBar from "@/components/SearchBar";
import SiteShell from "@/components/SiteShell";
import { getPosts } from "@/lib/posts";

export async function generateMetadata({ params }) {
  const { name } = await params;
  const category = decodeURIComponent(name);

  return {
    title: `${category} | Author Portfolio Blog`,
    description: `Browse poems and gallery works filed under ${category}.`
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { name } = await params;
  const { q = "" } = await searchParams;
  const category = decodeURIComponent(name);
  const posts = (await getPosts({ query: q, category })).filter((post) => post.type !== "story");

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl space-y-6 px-4 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Category</p>
          <h1 className="font-display text-5xl leading-tight sm:text-6xl">{category}</h1>
          <p className="max-w-2xl text-base leading-8 text-muted">
            Browse everything in this archive category across poems and gallery work.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <Link
              href={`/poems?category=${encodeURIComponent(category)}`}
              className="rounded-full bg-surface px-4 py-2 text-sm text-muted shadow-sm transition duration-300 hover:-translate-y-0.5 hover:text-foreground hover:shadow-md"
            >
              Poems in {category}
            </Link>
            <Link
              href={`/gallery?category=${encodeURIComponent(category)}`}
              className="rounded-full bg-surface px-4 py-2 text-sm text-muted shadow-sm transition duration-300 hover:-translate-y-0.5 hover:text-foreground hover:shadow-md"
            >
              Gallery in {category}
            </Link>
          </div>
        </div>
      </section>

      <section className="editorial-rule mx-auto max-w-6xl space-y-6 px-4 pt-10 sm:px-6 lg:px-8">
        <SearchBar
          actionPath={`/category/${encodeURIComponent(category)}`}
          defaultValue={q}
          placeholder={`Search ${category} titles...`}
        />

        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PoemCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] bg-surface px-8 py-14 text-center shadow-sm">
            <h2 className="font-display text-3xl text-foreground">No archive entries found in {category}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted">
              Try another title search or open the poems or gallery sections for a broader browse.
            </p>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
