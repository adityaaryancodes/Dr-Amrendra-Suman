import Link from "next/link";

function buildHref({ basePath, category, query }) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (category) {
    params.set("category", category);
  }

  const suffix = params.toString();
  return suffix ? `${basePath}?${suffix}` : basePath;
}

export default function CategoryFilter({ categories = [], currentCategory = "", query = "", basePath = "/gallery" }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={buildHref({ basePath, category: "", query })}
        className={`rounded-full px-4 py-2 text-sm shadow-sm transition duration-300 ${
          !currentCategory ? "soft-button text-white" : "bg-surface text-muted hover:-translate-y-0.5 hover:text-foreground hover:shadow-md"
        }`}
      >
        All categories
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={buildHref({ basePath, category, query })}
          className={`rounded-full px-4 py-2 text-sm shadow-sm transition duration-300 ${
            currentCategory === category
              ? "soft-button text-white"
              : "bg-surface text-muted hover:-translate-y-0.5 hover:text-foreground hover:shadow-md"
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
