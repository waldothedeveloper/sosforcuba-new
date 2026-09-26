import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/components/ArticleCard";
import { MdxContent } from "@/components/MdxContent";
import { getAllArticles, getArticle } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

// Every article is known at build time; anything else should 404 without touching the filesystem.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${slug}`,
    image: { url: article.cover, alt: article.coverAlt },
    openGraph: { type: "article", publishedTime: article.date, modifiedTime: article.updated }
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <article>
        <header className="article-header shell narrow">
          <Link className="back-link" href="/articles">← All articles</Link>
          <div className="tag-row">{article.tags.map((tag) => <Link href={`/tags/${encodeURIComponent(tag.toLowerCase())}`} key={tag}>{tag}</Link>)}</div>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.description}</p>
          <div className="byline"><span>{article.author}</span><span>·</span><time dateTime={article.date}>{formatDate(article.date)}</time></div>
        </header>
        <div className="article-cover shell"><Image src={article.cover} alt={article.coverAlt} width={1600} height={950} priority /></div>
        <div className="prose shell narrow"><MdxContent source={article.body} /></div>
      </article>
    </main>
  );
}
