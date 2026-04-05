/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        muted: "var(--muted)"
      },
      boxShadow: {
        card: "0 14px 40px rgba(42, 42, 42, 0.06)",
        soft: "0 6px 24px rgba(42, 42, 42, 0.05)"
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-heading)"],
        alt: ["var(--font-alt)"]
      }
    }
  },
  plugins: []
};
