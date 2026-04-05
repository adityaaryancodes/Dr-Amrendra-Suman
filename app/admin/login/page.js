import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { getAdminSession } from "@/lib/auth";

export const metadata = {
  title: "Admin Login | Author Portfolio Blog"
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[36px] border border-border p-8 shadow-card sm:p-10">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Author portfolio admin</p>
          <h1 className="mt-4 font-display text-5xl leading-tight">Manage poems, stories, gallery posts, and the literary archive.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            Sign in to publish poems, write stories, upload gallery images, and manage the public author website.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/poems"
              className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              View archive
            </Link>
            <Link
              href="/"
              className="inline-flex rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent"
            >
              Back home
            </Link>
          </div>
        </div>

        <div className="glass-panel rounded-[36px] border border-border p-8 shadow-card sm:p-10">
          <p className="text-sm uppercase tracking-[0.28em] text-muted">Secure sign in</p>
          <h2 className="mt-3 font-display text-4xl">Welcome back.</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Use the admin email and hashed password record you created in Supabase.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
