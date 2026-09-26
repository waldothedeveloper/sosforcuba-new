import Link from "next/link";
import { cacheLife } from "next/cache";
import { siteConfig } from "@/lib/site";

// `new Date()` can't run in a prerendered shell. Caching it for a day lets every page stay static
// while the year still rolls over within a day of New Year (pages revalidate on the same schedule).
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-kicker">Patria y vida</p>
          <h2>Cuba deserves freedom, dignity, and a voice.</h2>
        </div>
        <div className="footer-links">
          <Link href="/articles">Articles</Link>
          <Link href="/human-rights">Human rights</Link>
          <Link href="/resources">Resources</Link>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </div>
      <div className="shell footer-meta">
        <span>© {await currentYear()} SOS for Cuba</span>
        <span>English edition · Spanish-ready architecture</span>
      </div>
    </footer>
  );
}
