export function formatDisplayDate(value) {
  if (!value) {
    return "Recently added";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium"
  }).format(new Date(value));
}

export function normalizeTags(input) {
  return String(input || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeCategory(input) {
  return String(input || "").trim();
}

export function truncateText(text, maxLength = 170) {
  const value = String(text || "").trim();

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trimEnd()}...`;
}

export function getReadingTimeLabel(text) {
  const words = String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

export function parseStoragePathFromUrl(imageUrl) {
  if (!imageUrl) {
    return null;
  }

  const marker = "/poetry-images/";
  const index = imageUrl.indexOf(marker);

  if (index === -1) {
    return null;
  }

  return decodeURIComponent(imageUrl.slice(index + marker.length));
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function buildUrl(pathname = "/") {
  return new URL(pathname, getSiteUrl()).toString();
}
