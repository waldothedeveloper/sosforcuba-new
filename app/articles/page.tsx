import type { Metadata } from "next";
import { ArticleExplorer } from "@/components/ArticleExplorer";
import { getAllArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Articles",
  description: "Reporting, historical context, and advocacy about Cuba, July 11, political repression, and human rights.",
  path: "/articles"
});

export default function ArticlesPage() {
  return (
    <main className="section shell">
      <header className="archive-header">
        <p className="eyebrow">The archive</p>
        <h1>History, testimony, and context</h1>
        <p>Explore preserved reporting from the original SOS for Cuba project and new MDX articles as they are published.</p>
      </header>
      <ArticleExplorer articles={getAllArticles()} />
    </main>
  );
}
