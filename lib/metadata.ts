import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
  openGraph?: { type: "website" } | { type: "article"; publishedTime?: string; modifiedTime?: string };
};

const defaultImage = { url: "/media/legacy/sos_for_cuba_logo.jpg", width: 240, height: 240, alt: siteConfig.name };

// Next merges metadata shallowly, so a page that only sets `title` would inherit the
// root layout's canonical, og:url, and og:title. Build every page's set explicitly.
export function pageMetadata({ title, description, path, image, openGraph = { type: "website" } }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path, types: { "application/rss+xml": "/feed.xml" } },
    openGraph: {
      ...openGraph,
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [image ?? defaultImage]
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined
    }
  };
}
