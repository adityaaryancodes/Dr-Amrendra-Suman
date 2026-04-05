"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const nextValue = !isDark;
    setIsDark(nextValue);
    document.documentElement.classList.toggle("dark", nextValue);
    localStorage.setItem("poetry-gallery-theme", nextValue ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-white dark:text-black dark:ring-1 dark:ring-black/10"
      aria-label="Toggle color theme"
    >
      <span className={`h-2.5 w-2.5 rounded-full ${isDark ? "bg-black" : "bg-accent"}`} />
      <span>{isDark ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
