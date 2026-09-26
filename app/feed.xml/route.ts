import { getAllArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" }[char] ?? char));

// Content only changes on deploy; getAllArticles is cached, so this handler prerenders at build.
export async function GET() {
  const items = (await getAllArticles())
    .map((article) => {
      const slug = encodeURIComponent(article.slug);
      return `<item><title>${escapeXml(article.title)}</title><link>${siteConfig.url}/articles/${slug}</link><guid>${siteConfig.url}/articles/${slug}</guid><pubDate>${new Date(`${article.date}T12:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(article.description)}</description></item>`;
    })
    .join("");
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${siteConfig.name}</title><link>${siteConfig.url}</link><description>${escapeXml(siteConfig.description)}</description><language>en-us</language>${items}</channel></rss>`;
  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
