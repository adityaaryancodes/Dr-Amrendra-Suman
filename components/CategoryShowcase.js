import Link from "next/link";

export default function CategoryShowcase({ items = [] }) {
  const gridClass = items.length >= 3 ? "lg:grid-cols-3" : items.length === 2 ? "md:grid-cols-2" : "";

  return (
    <section className="editorial-rule section-reveal mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8" style={{ "--reveal-delay": "0.08s" }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Category section</p>
          <h2 className="mt-2 font-display text-[2rem] leading-tight sm:text-[2.2rem]">Browse the archive by section.</h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
            Move through the work by poems and visual archive pieces so each reading path feels distinct instead of mixed together.
          </p>
        </div>
      </div>

      <div className={`mt-8 grid gap-6 ${gridClass}`}>
        {items.map((item, index) => (
          <article
            key={item.title}
            className={`section-reveal group relative overflow-hidden rounded-[26px] border border-border bg-surface p-7 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-md ${item.tone}`}
            style={{ "--reveal-delay": `${0.14 + index * 0.1}s` }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">{item.eyebrow}</p>
                <h3 className="mt-3 font-display text-4xl leading-none text-foreground">{item.title}</h3>
              </div>
              <div className="rounded-full bg-background/85 px-4 py-2 text-sm font-semibold text-foreground shadow-sm">
                {item.count}
              </div>
            </div>

            <p className="mt-5 text-[15px] leading-8 text-muted">{item.description}</p>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.24em] text-muted">{item.helper}</span>
              <Link
                href={item.href}
                className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                Explore
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
