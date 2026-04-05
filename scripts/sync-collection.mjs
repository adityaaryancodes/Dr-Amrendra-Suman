import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";

const sourceDirectory = path.join(process.cwd(), "..", "COLLECTION");
const targetDirectory = path.join(process.cwd(), "public", "images", "collection");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

if (!existsSync(sourceDirectory)) {
  console.error(`Source folder not found: ${sourceDirectory}`);
  process.exit(1);
}

mkdirSync(targetDirectory, { recursive: true });

const files = readdirSync(sourceDirectory).filter((fileName) =>
  supportedExtensions.has(path.extname(fileName).toLowerCase())
);

for (const fileName of files) {
  copyFileSync(path.join(sourceDirectory, fileName), path.join(targetDirectory, fileName));
}

console.log(`Synced ${files.length} image(s) from COLLECTION to public/images/collection.`);
