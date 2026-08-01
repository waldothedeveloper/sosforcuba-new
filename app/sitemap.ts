import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/articles", "/about", "/human-rights", "/july-11", "/resources"];
  return [
    ...pages.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.7 })),
    ...getAllArticles().map((article) => ({ url: `${siteConfig.url}/articles/${article.slug}`, lastModified: new Date(article.updated ?? article.date), changeFrequency: "yearly" as const, priority: 0.8 }))
  ];
}
