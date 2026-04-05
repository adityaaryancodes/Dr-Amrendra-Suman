"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/poems", label: "Poems" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isActive(href) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md dark:bg-white/95 dark:text-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 border-b border-border py-5 dark:border-black/10">
          <Link href="/" className="group flex items-center gap-3">
            <div className="rounded-full bg-surface px-3 py-2 text-sm font-semibold tracking-[0.22em] text-foreground shadow-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md dark:bg-white dark:text-black dark:ring-1 dark:ring-black/10">
              [ AA ]
            </div>
            <div>
              <p className="font-display text-[1.3rem] leading-none dark:text-black">Author Archive</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted dark:text-black/60">Poetry and gallery</p>
            </div>
          </Link>

          <button
            type="button"
            className="inline-flex rounded-full bg-surface px-4 py-2 text-sm shadow-sm sm:hidden dark:bg-white dark:text-black dark:ring-1 dark:ring-black/10"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
          >
            Menu
          </button>

          <div className="hidden items-center gap-5 sm:flex">
            <nav className="flex items-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition duration-300 ${
                    isActive(link.href)
                      ? "bg-accent-soft text-foreground dark:bg-black dark:text-white"
                      : "text-muted hover:bg-surface hover:text-foreground hover:shadow-sm dark:text-black/65 dark:hover:bg-black/5 dark:hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <DarkModeToggle />
          </div>
        </div>

        {isOpen ? (
          <div className="border-t border-border py-4 dark:border-black/10 sm:hidden">
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-4 py-3 text-sm transition duration-300 ${
                    isActive(link.href)
                      ? "bg-accent-soft text-foreground dark:bg-black dark:text-white"
                      : "bg-transparent text-muted hover:bg-surface hover:text-foreground dark:text-black/65 dark:hover:bg-black/5 dark:hover:text-black"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <DarkModeToggle />
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
