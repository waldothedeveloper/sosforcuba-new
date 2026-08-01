import Link from "next/link";

const navigation = [
  { href: "/articles", label: "Articles" },
  { href: "/july-11", label: "July 11" },
  { href: "/human-rights", label: "Human rights" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="SOS for Cuba home">
          <span className="wordmark-mark">SOS</span>
          <span>for Cuba</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
