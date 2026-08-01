import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/content";

export function ArticleCard({ article, priority = false }: { article: ArticleMeta; priority?: boolean }) {
  return (
    <article className="article-card">
      <Link className="card-image" href={`/articles/${article.slug}`} aria-label={article.title}>
        <Image
          src={article.cover}
          alt={article.coverAlt}
          fill
          sizes="(max-width: 760px) 100vw, 33vw"
          priority={priority}
        />
      </Link>
      <div className="card-body">
        <div className="card-meta">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          {article.tags[0] ? <span>{article.tags[0]}</span> : null}
        </div>
        <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.description}</p>
        <Link className="text-link" href={`/articles/${article.slug}`}>Read article <span>→</span></Link>
      </div>
    </article>
  );
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T00:00:00Z`));
}
