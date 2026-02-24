import { parse } from 'hast-mds';

export interface Metadata {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  parent?: string | null;
  weight?: number;
  [key: string]: any;
}

export interface ContentEntry {
  path: string;
  metadata: Metadata;
  raw: string;
}

export function getAllContent(): {
  blog: ContentEntry[];
  docs: ContentEntry[];
} {
  // Vite exposes raw file content with { query: '?raw', import: 'default', eager: true }
  const files = import.meta.glob<{ default: string }>('../../content/**/*.md', {
    query: '?raw',
    eager: true,
  });

  const blog: ContentEntry[] = [];
  const docs: ContentEntry[] = [];

  for (const [filepath, content] of Object.entries(files)) {
    let rawString = '';
    // Handle both { default: '...' } and just '...' just in case Vite version differs
    if (typeof content === 'string') {
      rawString = content;
    } else if (content && typeof content.default === 'string') {
      rawString = content.default;
    }

    const parsed = parse(rawString);
    console.log(parsed);
    const metadata = (parsed.global || {}) as Metadata;

    // Normalize path. filepath looks like '../../content/blog/first-post.md'
    const routePath = filepath
      .replace('../../content', '/posts')
      .replace(/\.md$/, ''); // e.g. /blog/first-post

    const entry = { path: routePath, metadata, raw: rawString };

    if (filepath.includes('/content/blog/')) {
      blog.push(entry);
    } else if (filepath.includes('/content/documentation/')) {
      docs.push(entry);
    }
  }

  // Sort blog by date descending
  blog.sort((a, b) => {
    const dateA = a.metadata.date || '';
    const dateB = b.metadata.date || '';
    return dateB.localeCompare(dateA);
  });

  // Sort docs by weight
  docs.sort((a, b) => {
    const wA = typeof a.metadata.weight === 'number' ? a.metadata.weight : 999;
    const wB = typeof b.metadata.weight === 'number' ? b.metadata.weight : 999;
    return wA - wB;
  });

  return { blog, docs };
}
