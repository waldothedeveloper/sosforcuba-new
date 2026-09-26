import "./globals.css";

import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/site";

const sans = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Source_Serif_4({
  subsets: ["latin"],
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
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "SOS for Cuba",
    description: siteConfig.description,
    images: [
      {
        url: "/media/legacy/sos_for_cuba_logo.jpg",
        width: 1200,
        height: 630,
        alt: "SOS for Cuba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: { icon: "/media/legacy/sos_cuba_logo_2.jpg" },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#071724",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
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
