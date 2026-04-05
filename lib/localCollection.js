import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const collectionDirectory = path.join(process.cwd(), "public", "images", "collection");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const metadataByFileName = {
  "image 2.jpeg": {
    title: "Quiet Light",
    description: "A soft visual poem from your collection, shown automatically on the site while the gallery is being built out.",
    category: "Reflection",
    tags: ["quiet", "light", "memory"]
  },
  "image 3.jpeg": {
    title: "Between Lines",
    description: "A still piece from the collection that gives the website an immediate gallery presence.",
    category: "Reflection",
    tags: ["stillness", "archive", "poem"]
  },
  "WhatsApp Image 2026-03-20 at 14.16.08.jpeg": {
    title: "After the Rain",
    description: "A visual fragment from the original collection, placed directly into the website gallery.",
    category: "Nature",
    tags: ["rain", "weather", "calm"]
  },
  "WhatsApp Image 2026-03-20 at 14.16.09.jpeg": {
    title: "Letter to Dusk",
    description: "One of the artwork images from your folder, presented as a public poem card on the site.",
    category: "Longing",
    tags: ["dusk", "letter", "longing"]
  },
  "WhatsApp Image 2026-03-20 at 14.16.10.jpeg": {
    title: "Small Flame",
    description: "A starter entry from your folder, now part of the gallery shown on the website.",
    category: "Hope",
    tags: ["hope", "flame", "warmth"]
  },
  "WhatsApp Image 2026-03-20 at 14.21.31.jpeg": {
    title: "Window of Silence",
    description: "A quiet composition from your collection, used as a built-in local gallery post.",
    category: "Solitude",
    tags: ["window", "silence", "solitude"]
  },
  "WhatsApp Image 2026-03-20 at 14.22.15.jpeg": {
    title: "Fading Street",
    description: "A passing city-like moment from the provided image set, now visible on the site.",
    category: "City",
    tags: ["street", "passing", "night"]
  },
  "WhatsApp Image 2026-03-20 at 14.24.02.jpeg": {
    title: "Holding On",
    description: "A visual verse preserved from your collection so readers can browse it immediately.",
    category: "Love",
    tags: ["holding", "love", "memory"]
  },
  "WhatsApp Image 2026-03-20 at 14.25.00.jpeg": {
    title: "Last Gold",
    description: "The final starter piece from the collection, now included in the public website gallery.",
    category: "Light",
    tags: ["gold", "evening", "glow"]
  }
};

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function humanizeFileName(fileName) {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  return withoutExtension
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getDefaultDescription(fileName) {
  return `${humanizeFileName(fileName)} is part of the poetry image collection added from the local folder and shown directly on the website.`;
}

function getCollectionPosts() {
  if (!existsSync(collectionDirectory)) {
    return [];
  }

  return readdirSync(collectionDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => {
      const metadata = metadataByFileName[entry.name] || {};
      const absolutePath = path.join(collectionDirectory, entry.name);
      const fileStats = statSync(absolutePath);

      return {
        id: `local-${slugify(entry.name)}`,
        title: metadata.title || humanizeFileName(entry.name),
        description: metadata.description || getDefaultDescription(entry.name),
        image_url: `/images/collection/${encodeURIComponent(entry.name)}`,
        category: metadata.category || "Collection",
        tags: metadata.tags || [],
        created_at: metadata.created_at || fileStats.mtime.toISOString()
      };
    })
    .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime());
}

export function getLocalPosts({ query = "", category = "", limit } = {}) {
  const filtered = getCollectionPosts().filter((post) => {
    const matchesQuery = query ? post.title.toLowerCase().includes(String(query).toLowerCase()) : true;
    const matchesCategory = category ? post.category === category : true;
    return matchesQuery && matchesCategory;
  });

  return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

export function getLocalCategories() {
  return Array.from(new Set(getCollectionPosts().map((post) => post.category).filter(Boolean))).sort((left, right) =>
    left.localeCompare(right)
  );
}

export function getLocalPostById(id) {
  return getCollectionPosts().find((post) => post.id === id) || null;
}
