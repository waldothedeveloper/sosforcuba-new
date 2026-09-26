import Link from "next/link";
import { DesktopNav, MobileNav } from "@/components/SiteNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="SOS for Cuba home">
          <span className="wordmark-mark">SOS</span>
          <span>for Cuba</span>
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
