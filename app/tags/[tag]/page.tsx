import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { articlesForTag, getAllTags } from "@/lib/content";

type Props = { params: { tag: string } };

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decoded = safeDecode(params.tag);
  return { title: `Articles tagged ${decoded ?? params.tag}` };
}

export default async function TagPage({ params }: Props) {
  const decoded = safeDecode(params.tag);
  if (!decoded) notFound();
  const articles = articlesForTag(decoded);
  return (
    <main className="section shell">
      <header className="archive-header"><p className="eyebrow">Topic</p><h1>{decoded}</h1><p>{articles.length} archived {articles.length === 1 ? "article" : "articles"}.</p></header>
      <div className="article-grid">{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
    </main>
  );
}
