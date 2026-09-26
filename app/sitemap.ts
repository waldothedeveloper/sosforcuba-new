import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";
import { getAllArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";
// `new Date()` isn't allowed in a prerender; a cached call pins it to when the sitemap was generated.
async function generatedAt() {
  "use cache";
  cacheLife("max");
  return new Date().toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [lastModified, articles] = await Promise.all([generatedAt(), getAllArticles()]);
  const pages = ["", "/articles", "/about", "/human-rights", "/july-11", "/resources"];
  return [
    ...pages.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified, changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...articles.map((article) => ({ url: `${siteConfig.url}/articles/${article.slug}`, lastModified: new Date(article.updated ?? article.date), changeFrequency: "yearly" as const, priority: 0.8 }))
  ];
}
