import type { ArticleMeta } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const organization = {
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  logo: `${siteConfig.url}/media/legacy/sos_for_cuba_logo.jpg`
};

// `<` is escaped so frontmatter text can never close the script tag early.
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c") }}
    />
  );
}

export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@graph": [
          organization,
          {
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`,
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            inLanguage: siteConfig.language,
            publisher: { "@id": organization["@id"] }
          }
        ]
      }}
    />
  );
}

export function ArticleJsonLd({ article }: { article: ArticleMeta }) {
  const url = `${siteConfig.url}/articles/${article.slug}`;
  return (
    <JsonLd
      data={{
        "@type": "Article",
        headline: article.title,
        description: article.description,
        image: [new URL(article.cover, siteConfig.url).href],
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        author: { "@type": "Organization", name: article.author, url: siteConfig.url },
        publisher: organization,
        mainEntityOfPage: url,
        url,
        keywords: article.tags.join(", "),
        inLanguage: siteConfig.language
      }}
    />
  );
}
