"use client";

import { useMemo, useState } from "react";
import type { ArticleMeta } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";

export function ArticleExplorer({ articles }: { articles: ArticleMeta[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const tags = useMemo(
    () => ["All", ...Array.from(new Set(articles.flatMap((article) => article.tags))).sort()],
    [articles]
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesTag = tag === "All" || article.tags.includes(tag);
      const haystack = [article.title, article.description, ...article.tags].join(" ").toLowerCase();
      return matchesTag && (!needle || haystack.includes(needle));
    });
  }, [articles, query, tag]);

  return (
    <>
      <div className="article-tools">
        <label>
          <span>Search the archive</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search topics, people, or events"
          />
        </label>
        <div className="tag-filter" role="group" aria-label="Filter articles by topic">
          {tags.map((candidate) => (
            <button
              type="button"
              key={candidate}
              onClick={() => setTag(candidate)}
              aria-pressed={tag === candidate}
            >
              {candidate}
            </button>
          ))}
        </div>
      </div>
      <p className="results-count">{visible.length} {visible.length === 1 ? "article" : "articles"}</p>
      <div className="article-grid">
        {visible.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </div>
      {visible.length === 0 ? <p className="empty-state">No articles match that search yet.</p> : null}
    </>
  );
}
