# SOS for Cuba

A content-first redesign of [sosforcuba.com](https://www.sosforcuba.com/) built with Next.js, TypeScript, React, and MDX.

## What is included

- Advocacy-first homepage with recent articles
- English MDX content with a locale-ready directory structure
- Article archive with client-side search and tag filters
- Article tag pages, RSS, sitemap, robots metadata, and social metadata
- Permanent redirects from important Gatsby URLs
- Responsive editorial design with accessible navigation and reduced-motion support
- HLS playback for preserved legacy videos

The old protest database, submission forms, Fauna integration, donations, Mailchimp, LogRocket, and COVID-era content are intentionally excluded.

## Local development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Before publishing:

```bash
npm run typecheck
npm run lint
npm run build
```

## Add an article

Create `content/en/articles/my-article.mdx`:

```mdx
---
title: "Article title"
description: "A concise search and social description."
date: "2026-07-31"
author: "SOS for Cuba"
tags: ["Human rights", "Cuba"]
cover: "/media/legacy/example.jpg"
coverAlt: "Describe the image for readers using assistive technology"
featured: false
draft: false
---

Your article begins here.
```

Available MDX components:

```mdx
<MediaImage src="/media/legacy/example.jpg" alt="Required alt text" caption="Optional caption" />
<Video src="https://example.com/video.m3u8" poster="https://example.com/poster.jpg" title="Required title" />
<Callout title="Optional label">Important context.</Callout>
<SourceLink href="https://example.com/source">Source title</SourceLink>
```

Articles are discovered automatically. No registry file needs to be edited.

## Add Spanish later

English source lives under `content/en`. Add translated material under `content/es` with the same slugs, then introduce a locale route segment and locale switcher. Keeping slugs aligned makes cross-language linking and canonical metadata straightforward.

## Media

Legacy images are preserved under `public/media/legacy`. The specific 2020 COVID image and Gatsby starter artwork were not migrated. Some archived images are intentionally unused by the current pages but remain available for future editorial work.
