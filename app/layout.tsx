import "./globals.css";

import { Instrument_Sans, Newsreader } from "next/font/google";
import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/site";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SOS for Cuba — Freedom, dignity, and a voice",
    template: "%s | SOS for Cuba",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  // No canonical or og:url here: they would be inherited by every page. See lib/metadata.ts.
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/media/legacy/sos_for_cuba_logo.jpg",
        width: 240,
        height: 240,
        alt: "SOS for Cuba",
      },
    ],
  },
  twitter: {
    card: "summary",
  },
  icons: { icon: "/media/legacy/sos_cuba_logo_2.jpg" },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#FAF8F4",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <SpeedInsights />
      </body>
    </html>
  );
}
