export default function SectionTransition({ label = "" }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8" aria-hidden="true">
      <div className="flex items-center gap-4">
        <span className="section-bridge-line h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />
        <div className="section-reveal flex items-center gap-3" style={{ "--reveal-delay": "0.04s" }}>
          <span className="section-bridge-dot h-2 w-2 rounded-full bg-[var(--secondary-accent)]/70" />
          {label ? <span className="text-[11px] uppercase tracking-[0.34em] text-muted">{label}</span> : null}
          <span className="section-bridge-orb h-3 w-3 rounded-full bg-[var(--accent)]/80" />
        </div>
        <span className="section-bridge-line h-px flex-1 bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />
      </div>
    </div>
  );
}
