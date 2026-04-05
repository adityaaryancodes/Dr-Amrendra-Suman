import AboutAuthor from "@/components/AboutAuthor";
import SiteShell from "@/components/SiteShell";
import { getAuthorProfile } from "@/lib/posts";

export const metadata = {
  title: "About | Author Portfolio Blog",
  description: "Read the author's full profile, published works, and literary background."
};

export default async function AboutPage() {
  const author = await getAuthorProfile();
  const coverImage = author.cover_image || author.profile_image;

  return (
    <SiteShell>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="relative overflow-hidden rounded-[34px] border border-border bg-surface shadow-card">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,165,126,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(107,122,143,0.14),transparent_22%)]" />
          <div className="relative grid items-stretch gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-8 sm:p-10 lg:p-14">
              <p className="text-sm uppercase tracking-[0.28em] text-muted">{author.about?.eyebrow || "About the author"}</p>
              <h1 className="mt-4 max-w-[12ch] font-display text-4xl leading-[1.02] sm:text-5xl lg:text-[4.1rem]">
                {author.about?.title || "A full profile of the author and literary archive."}
              </h1>
              {author.bio ? <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{author.bio}</p> : null}
            </div>

            <div className="relative min-h-[320px] overflow-hidden border-t border-border lg:min-h-full lg:border-l lg:border-t-0">
              {coverImage ? (
                <img src={coverImage} alt={author.name} className="h-full w-full object-cover object-bottom" />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center bg-[var(--secondary-soft)] px-8 text-center text-muted">
                  Author cover image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-l lg:from-black/10 lg:via-transparent lg:to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <AboutAuthor author={author} detailed />
    </SiteShell>
  );
}
