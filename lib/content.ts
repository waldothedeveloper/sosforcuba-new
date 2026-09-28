import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cacheLife } from "next/cache";

const CONTENT_ROOT = path.join(process.cwd(), "content", "en");

export type ArticleMeta = {
  slug: string;
  title: string;
  // Shorter <title> for search results when the headline is too long; falls back to `title`.
  seoTitle?: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  featured?: boolean;
  draft?: boolean;
};

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow?: string;
  body: string;
};

export type Article = ArticleMeta & { body: string };

function readMdx(directory: "articles" | "pages", slug: string) {
  const filePath = path.join(CONTENT_ROOT, directory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const file = fs.readFileSync(filePath, "utf8");
  return matter(file);
}

// YAML parses unquoted dates (date: 2021-07-12) into Date objects; keep everything as YYYY-MM-DD.
function toDateString(value: unknown): string | undefined {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value.toISOString().slice(0, 10);
  return value ? String(value) : undefined;
}

function toArticle(slug: string, data: Record<string, unknown>, body = ""): Article {
  return {
    slug,
    title: String(data.title ?? slug),
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    description: String(data.description ?? ""),
    date: toDateString(data.date) ?? "2021-07-11",
    updated: toDateString(data.updated),
    author: String(data.author ?? "SOS for Cuba"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? "/media/legacy/sos_for_cuba_logo.jpg"),
    coverAlt: String(data.coverAlt ?? "SOS for Cuba"),
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    body
  };
}

function toMeta(article: Article): ArticleMeta {
  return {
    slug: article.slug,
    title: article.title,
    seoTitle: article.seoTitle,
    description: article.description,
    date: article.date,
    updated: article.updated,
    author: article.author,
    tags: article.tags,
    cover: article.cover,
    coverAlt: article.coverAlt,
    featured: article.featured,
    draft: article.draft
  };
}

// Content only changes on deploy, so every reader below is cached for the life of the build ("max").
// Each is async because `use cache` only applies to async functions.
export async function getAllArticles(): Promise<ArticleMeta[]> {
  "use cache";
  cacheLife("max");
  const directory = path.join(CONTENT_ROOT, "articles");
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const parsed = readMdx("articles", slug);
      return parsed ? toArticle(slug, parsed.data) : null;
    })
    .filter((article): article is Article => Boolean(article && !article.draft))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(toMeta);
}

// Slugs come from the URL. Only read files that are already in the published list, so unknown
// or crafted slugs 404 without touching the filesystem (this replaced `dynamicParams = false`).
export async function getArticle(slug: string): Promise<Article | null> {
  "use cache";
  cacheLife("max");
  const known = (await getAllArticles()).some((article) => article.slug === slug);
  if (!known) return null;
  const parsed = readMdx("articles", slug);
  return parsed ? toArticle(slug, parsed.data, parsed.content) : null;
}

export async function getPage(slug: string): Promise<ContentPage | null> {
  "use cache";
  cacheLife("max");
  const parsed = readMdx("pages", slug);
  if (!parsed) return null;
  return {
    slug,
    title: String(parsed.data.title ?? slug),
    description: String(parsed.data.description ?? ""),
    eyebrow: parsed.data.eyebrow ? String(parsed.data.eyebrow) : undefined,
    body: parsed.content
  };
}

export async function getAllTags() {
  const tags = new Set((await getAllArticles()).flatMap((article) => article.tags));
  return [...tags].sort((a, b) => a.localeCompare(b));
}

// Tag URLs are lowercased; recover the display casing used in frontmatter.
export async function findTag(tag: string) {
  return (await getAllTags()).find((candidate) => candidate.toLowerCase() === tag.toLowerCase()) ?? null;
}

export async function articlesForTag(tag: string) {
  return (await getAllArticles()).filter((article) =>
    article.tags.some((candidate) => candidate.toLowerCase() === tag.toLowerCase())
  );
}
