import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({ title: siteConfig.name, description: siteConfig.description, path: "/" }),
  title: { absolute: "SOS for Cuba — Freedom, dignity, and a voice" }
};

const facts = [
  { number: "1959", label: "The present political era began" },
  { number: "11J", label: "A nationwide civic uprising in 2021" },
  { number: "∞", label: "Every Cuban voice deserves to be heard" }
];

export default function HomePage() {
  const articles = getAllArticles();
  const latest = articles.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="flag-stripe" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">Independent Cuban advocacy</p>
            <h1>Cuba deserves a future written by its people.</h1>
            <p className="hero-lede">
              We document civic resistance, human-rights abuses, and the lived reality behind more than six decades of authoritarian rule.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/articles">Read the latest</Link>
              <Link className="button secondary" href="/july-11">Understand July 11</Link>
            </div>
          </div>
          <div className="hero-collage" aria-label="Scenes from Cuban protests and civic life">
            <div className="portrait portrait-main"><Image src="/media/legacy/girl_protesting.jpg" alt="A young woman protesting for freedom in Cuba" fill priority sizes="(max-width: 800px) 80vw, 34vw" /></div>
            <div className="portrait portrait-small"><Image src="/media/legacy/sos_pic_3.jpg" alt="A demonstrator holding a Cuban flag" fill sizes="(max-width: 800px) 42vw, 18vw" /></div>
            <p className="photo-note">The truth survives when people keep telling it.</p>
          </div>
        </div>
      </section>

      <section className="fact-ribbon" aria-label="Key context">
        <div className="shell fact-grid">
          {facts.map((fact) => (
            <div key={fact.number}><strong>{fact.number}</strong><span>{fact.label}</span></div>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">Latest from the archive</p><h2>Stories that must remain visible</h2></div>
          <Link className="text-link" href="/articles">Explore all articles <span aria-hidden="true">→</span></Link>
        </div>
        <div className="article-grid">
          {latest.map((article, index) => <ArticleCard article={article} priority={index === 0} key={article.slug} />)}
        </div>
      </section>

      <section className="manifesto">
        <div className="shell manifesto-grid">
          <div><p className="eyebrow light">What we stand for</p><h2>No more silence.<br />No more repression.</h2></div>
          <div>
            <p>Freedom of expression is not a privilege. Peaceful dissent is not a crime. Families should not have to search for loved ones taken for speaking out.</p>
            <Link className="button secondary" href="/human-rights">Read the human-rights overview</Link>
          </div>
        </div>
      </section>

      <section className="section shell history-feature">
        <div className="history-image"><Image src="/media/legacy/protests-map-july-11.png" alt="Map of reported protests across Cuba on July 11, 2021" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div>
          <p className="eyebrow">A country spoke</p>
          <h2>July 11, 2021 changed the record forever.</h2>
          <p>From San Antonio de los Baños, demonstrations spread across the island. Cubans called for freedom, dignity, and an end to fear.</p>
          <Link className="text-link" href="/articles/july-11-2021">Read the documented timeline <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
