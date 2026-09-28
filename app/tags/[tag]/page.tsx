import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { articlesForTag, findTag, getAllTags } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ tag: string }> };

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
};

// Only tags that exist in content are valid; anything else must 404 rather than render
// a 200 page with the URL text as its heading and title.
const resolveTag = async (value: string) => {
  const decoded = safeDecode(value);
  return decoded ? findTag(decoded) : null;
};

export async function generateStaticParams() {
  return (await getAllTags()).map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await resolveTag((await params).tag);
  if (!tag) return {};
  return pageMetadata({
    title: `Articles tagged ${tag}`,
    description: `Articles about ${tag} from the SOS for Cuba archive: reporting, testimony, and historical context on freedom and human rights in Cuba.`,
    path: `/tags/${encodeURIComponent(tag.toLowerCase())}`
  });
}

export default async function TagPage({ params }: Props) {
  const tag = await resolveTag((await params).tag);
  if (!tag) notFound();
  const articles = await articlesForTag(tag);
  return (
    <main className="section shell">
      <header className="archive-header"><p className="eyebrow">Topic</p><h1>{tag}</h1><p>{articles.length} archived {articles.length === 1 ? "article" : "articles"}.</p></header>
      <div className="article-grid">{articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</div>
    </main>
  );
}
