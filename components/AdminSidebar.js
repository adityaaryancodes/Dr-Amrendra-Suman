"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdminAction } from "@/lib/actions";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/upload", label: "New Post" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/", label: "View site" }
];

export default function AdminSidebar({ adminEmail }) {
  const pathname = usePathname();

  return (
    <aside className="glass-panel h-fit rounded-[32px] border border-border p-5 shadow-card">
      <div className="rounded-[24px] bg-accent px-5 py-6 text-white">
        <p className="text-xs uppercase tracking-[0.24em] text-white/75">Admin panel</p>
        <p className="mt-3 font-display text-3xl">Author Portfolio</p>
        <p className="mt-2 text-sm text-white/80">{adminEmail}</p>
      </div>

      <nav className="mt-5 flex flex-col gap-2">
        {links.map((link) => {
          const active = link.href !== "/" && pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-2xl px-4 py-3 text-sm transition ${
                active ? "bg-accent text-white" : "text-muted hover:bg-accent-soft hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={logoutAdminAction} className="mt-6">
        <button
          type="submit"
          className="w-full rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
