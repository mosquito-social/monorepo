import { parse } from "hast-mds";
import { ContentEntry, Metadata } from "../types";

export function getAllContent(): Record<string, ContentEntry> {
  const ret: Record<string, ContentEntry> = {};

  // Vite exposes raw file content with { query: '?raw', import: 'default', eager: true }
  const files = import.meta.glob<{ default: string }>("../../content/**/*.md", {
    query: "?raw",
    eager: true,
  });

  for (const [filepath, content] of Object.entries(files)) {
    let rawString = "";
    // Handle both { default: '...' } and just '...' just in case Vite version differs
    if (typeof content === "string") {
      rawString = content;
    } else if (content && typeof (content as any).default === "string") {
      rawString = (content as any).default;
    }

    const parsed = parse<{
      title: string;
      description?: string;
      date?: string;
      author?: string;
    }>(rawString, new Set(["cta"]));

    // Normalize path. filepath looks like '../../content/blog/first-post.md'
    const routePath = filepath
      .replace("../../content", "")
      .replace(/\.md$/, ""); // e.g. /blog/first-post

    ret[routePath] = parsed;
  }

  return ret;
}

/**
 * Get all global metadata from the content files for creating overviews
 * @returns An object with the metadata for each content file.
 */
export function getAllMetadata(): Record<string, Metadata> {
  const content = getAllContent();
  return Object.fromEntries(
    Object.entries(content).map(([path, entry]) => [path, entry.global ?? {}]),
  );
}
