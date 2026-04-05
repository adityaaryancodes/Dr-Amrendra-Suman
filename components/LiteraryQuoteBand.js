export default function LiteraryQuoteBand({ eyebrow, quote, attribution }) {
  return (
    <section className="section-reveal literary-quote-band my-6 w-full px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8" style={{ "--reveal-delay": "0.06s" }}>
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm uppercase tracking-[0.34em] text-white/60">{eyebrow}</p>
        <blockquote className="mx-auto mt-6 max-w-5xl font-display text-4xl leading-[1.18] text-white sm:text-5xl lg:text-[4.25rem]">
          {quote}
        </blockquote>
        {attribution ? <p className="mt-7 font-alt text-xl tracking-[0.16em] text-[#f2c38b]">{attribution}</p> : null}
      </div>
    </section>
  );
}
