import AdminSidebar from "@/components/AdminSidebar";

export default function AdminShell({ title, description, adminEmail, children }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 lg:py-12">
      <AdminSidebar adminEmail={adminEmail} />

      <div className="space-y-6">
        <div className="glass-panel rounded-[32px] border border-border p-7 shadow-card sm:p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Admin workspace</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{description}</p>
        </div>
        <div className="glass-panel rounded-[32px] border border-border p-6 shadow-card sm:p-8">{children}</div>
      </div>
    </section>
  );
}
