import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { articlesForTag, findTag, getAllTags } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ tag: string }> };

// Only tags that exist in content are valid. Without this, /tags/<any text> rendered a 200 page
// with the URL text as its heading and title.
export const dynamicParams = false;

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
};

const resolveTag = (value: string) => {
  const decoded = safeDecode(value);
  return decoded ? findTag(decoded) : null;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = resolveTag((await params).tag);
  if (!tag) return {};
  return pageMetadata({
    title: `Articles tagged ${tag}`,
    description: `Archived SOS for Cuba reporting and context about ${tag}.`,
    path: `/tags/${encodeURIComponent(tag.toLowerCase())}`
  });
}

export default async function TagPage({ params }: Props) {
  const tag = resolveTag((await params).tag);
  if (!tag) notFound();
  const articles = articlesForTag(tag);
  return (
    <main className="section shell">
      <header className="archive-header"><p className="eyebrow">Topic</p><h1>{tag}</h1><p>{articles.length} archived {articles.length === 1 ? "article" : "articles"}.</p></header>
      <div className="article-grid">{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
    </main>
  );
}
