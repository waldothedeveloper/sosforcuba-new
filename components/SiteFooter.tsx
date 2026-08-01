import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
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
        <span>© {new Date().getFullYear()} SOS for Cuba</span>
        <span>English edition · Spanish-ready architecture</span>
      </div>
    </footer>
  );
}
