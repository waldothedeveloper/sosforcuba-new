"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const navigation = [
  { href: "/articles", label: "Articles" },
  { href: "/july-11", label: "July 11" },
  { href: "/human-rights", label: "Human rights" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" }
];

function NavLinks() {
  const pathname = usePathname();
  return navigation.map((item) => {
    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
    return (
      <Link href={item.href} key={item.href} aria-current={active ? "page" : undefined}>
        {item.label}
      </Link>
    );
  });
}

export function DesktopNav() {
  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      <NavLinks />
    </nav>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  // The header lives in the root layout and survives client navigations, so close the menu ourselves.
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details className="mobile-nav" ref={ref}>
      <summary>Menu</summary>
      <nav aria-label="Mobile navigation">
        <NavLinks />
      </nav>
    </details>
  );
}
