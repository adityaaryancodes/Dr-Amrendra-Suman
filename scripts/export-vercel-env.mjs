import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, ".env.local");
const targetPath = path.join(projectRoot, ".env.vercel.local");

const allowedKeys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ADMIN_SESSION_SECRET",
  "NEXT_PUBLIC_SITE_URL",
  "DATABASE_URL"
];

function parseEnv(content) {
  const values = new Map();

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    values.set(key, value);
  }

  return values;
}

async function main() {
  let source;

  try {
    source = await readFile(sourcePath, "utf8");
  } catch {
    console.error("Could not find .env.local. Create it first, then run `npm run export:vercel-env`.");
    process.exit(1);
  }

  const env = parseEnv(source);
  const lines = [
    "# Copy these values into Vercel -> Project Settings -> Environment Variables",
    "# This file is generated from .env.local and is ignored by git.",
    ""
  ];

  for (const key of allowedKeys) {
    const value = env.get(key);

    if (typeof value === "string" && value.length > 0) {
      lines.push(`${key}=${value}`);
    }
  }

  await writeFile(targetPath, `${lines.join("\n")}\n`, "utf8");

  console.log(`Created ${path.basename(targetPath)} from .env.local`);
  console.log("Use this file as a reference when adding environment variables in Vercel.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
