import Link from "next/link";

export default function AboutAuthor({ author, detailed = false }) {
  const aboutProfile = author.about || {};
  const detailItems = Array.isArray(aboutProfile.details) ? aboutProfile.details : [];
  const detailSections = Array.isArray(aboutProfile.sections) ? aboutProfile.sections : [];

  if (detailed) {
    return (
      <section className="editorial-rule mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="overflow-hidden rounded-[24px] bg-surface shadow-sm">
            {author.profile_image ? (
              <img src={author.profile_image} alt={author.name} className="h-full min-h-[420px] w-full object-cover object-bottom" />
            ) : (
              <div className="flex min-h-[420px] items-center justify-center bg-[var(--secondary-soft)] px-8 text-center text-muted">
                Author photo will be added here.
              </div>
            )}
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-muted">{aboutProfile.eyebrow || "About the author"}</p>
            <h2 className="mt-4 font-display text-[2.6rem] leading-tight">{author.name}</h2>
            {author.bio ? <p className="mt-5 max-w-3xl text-base leading-8 text-muted">{author.bio}</p> : null}

            {detailItems.length ? (
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {detailItems.map((item) => (
                  <div key={item.label} className="rounded-[22px] bg-surface p-5 shadow-sm">
                    <dt className="text-xs uppercase tracking-[0.24em] text-muted">{item.label}</dt>
                    <dd className="mt-3 text-base leading-7 text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="soft-button rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {detailSections.length ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {detailSections.map((section) => (
              <article key={section.title} className={`rounded-[22px] bg-surface p-6 shadow-sm ${section.fullWidth ? "lg:col-span-2" : ""}`}>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">{section.title}</p>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={`${section.title}-${index}`} className="mt-4 text-[15px] leading-8 text-muted">
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section className="editorial-rule mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="overflow-hidden rounded-[24px] bg-surface shadow-sm">
          {author.profile_image ? (
            <img src={author.profile_image} alt={author.name} className="h-full min-h-[360px] w-full object-cover object-bottom" />
          ) : (
            <div className="flex min-h-[360px] items-center justify-center bg-[var(--secondary-soft)] text-muted">Author portrait</div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">About the author</p>
          <h2 className="mt-4 font-display text-[2.4rem] leading-tight">{author.name}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">{author.bio}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="soft-button rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm">
              Full profile
            </Link>
            <Link href="/contact" className="soft-button-secondary rounded-full px-6 py-3 text-sm font-semibold text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
