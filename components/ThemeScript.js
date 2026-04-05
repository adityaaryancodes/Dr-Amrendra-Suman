export default function ThemeScript() {
  const script = `
    (function () {
      try {
        var storedTheme = localStorage.getItem("poetry-gallery-theme");
        var isDark = storedTheme === "dark";
        document.documentElement.classList.toggle("dark", isDark);
      } catch (error) {
        console.error("Theme boot error", error);
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
