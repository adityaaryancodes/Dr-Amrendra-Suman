import ThemeScript from "@/components/ThemeScript";
import "@/styles/globals.css";

export const metadata = {
  title: "Author Portfolio Blog",
  description: "A literary archive for poems, visual fragments, and author portfolio writing."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
