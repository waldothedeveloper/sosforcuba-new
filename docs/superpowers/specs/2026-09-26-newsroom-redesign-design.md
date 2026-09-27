# Newsroom redesign — design spec

Date: 2026-09-26
Branch: `feat/newsroom-redesign`
Status: approved direction ("A · Modern newsroom")

## Goal

Replace the current Libre Franklin + Source Serif 4 look (navy header, many accent colors, heavy
shadows, cramped display type) with a calm, credible, newsroom-style design that reads well for
long-form articles. Page structure, content, and routing stay the same.

## Non-goals

- Dark mode (`viewport.colorScheme` stays `"light"`).
- New logo or imagery.
- Content, routing, metadata, or data-layer changes.

## 1. Type system

- Fonts via `next/font/google` in `app/layout.tsx`:
  - **Newsreader** (variable, `axes: ["opsz"]`, normal + italic) → `--font-serif`. Used for
    headlines, decks, ledes, article body, pull quotes, fact numbers, wordmark.
  - **Instrument Sans** (variable) → `--font-sans`. Used for nav, buttons, eyebrows, card meta,
    bylines, captions, form controls, article h2/h3, footer links.
- Headline weights 500–600; body 400. Display tracking around `-0.02em` (not `-0.045em`).
- Fluid type scale tokens on `:root`, each a `clamp()`:
  - `--step--1` ≈ 13–14px (meta, captions)
  - `--step-0` ≈ 16–17px (UI body)
  - `--step-1` ≈ 19–21px (article body, ledes)
  - `--step-2` ≈ 24–28px (card titles, h3)
  - `--step-3` ≈ 30–40px (section h2, prose h2)
  - `--step-4` ≈ 40–60px (page titles)
  - `--step-5` ≈ 46–84px (hero, article title)
- Article prose: `--step-1`, line-height 1.65, max measure ~68ch.

## 2. Color and surfaces

Tokens on `:root` (old tokens `--sky`, `--gold`, `--paper-deep`, `--shadow`, `--white`,
`--ink-soft`, `--red-dark` removed or remapped):

| Token | Value | Use |
|---|---|---|
| `--paper` | `#FAF8F4` | page background |
| `--ink` | `#111418` | text, dark bands, primary button |
| `--ink-2` | `#4A4F55` | secondary text |
| `--ink-3` | `#6B7075` | meta / captions |
| `--rule` | `rgba(17,20,24,.12)` | hairlines |
| `--rule-strong` | `rgba(17,20,24,.28)` | emphasized dividers, inputs |
| `--surface` | `#FFFFFF` | inputs |
| `--red` | `#C8102E` | the single accent: eyebrows, underline accents, focus |
| `--red-deep` | `#9E0C24` | red text on paper (AA contrast) |
| `--blue` | `#1F4E8C` | callout rule, link hover |

- No drop shadows. Structure comes from hairlines and whitespace.
- Cuban-flag reference kept as a 4px tricolor bar (blue / white / red) across the top of the header.
- Global `:focus-visible` outline: 2px `--red`, offset 3px.

## 3. Components

**Header** (`SiteHeader`, `SiteNav` styles): paper background, 4px flag bar on top, hairline bottom
border. Wordmark "SOS" in Newsreader 600 with red underline + "for Cuba". Nav in Instrument Sans,
`--ink-2`, current page = ink with red underline. Mobile menu panel: paper, hairline border.

**Hero** (home): paper background, dark ink text. Eyebrow in red sans caps; headline `--step-5`
Newsreader; lede `--step-1` Newsreader in `--ink-2`. Primary button = ink fill; secondary = text
link with 2px red underline. Collage kept (two photos), no shadows, no rotated photo note (removed
from markup), no decorative circle or side flag stripe.

**Buttons**: `.button.primary` ink fill / paper text; `.button.secondary` outlined — on dark bands
it uses paper outline. Square corners, 48px min height, no translate-on-hover (hover = color change).

**Fact ribbon**: paper, hairlines top and bottom, three columns; numbers in Newsreader `--step-4`,
labels sans `--step--1` `--ink-2`.

**Section headings**: eyebrow + Newsreader `--step-3`.

**Article card**: no box, border, or shadow. 3:2 image, then meta row (date · tag) in sans caps
`--ink-3` with a hairline under it, title Newsreader `--step-2`, description sans `--ink-2`,
"Read article →" link. Hover: title underline, subtle image zoom retained.

**Manifesto band**: ink background (was red), eyebrow red-tinted, paper text, secondary button with
paper outline.

**History feature**: unchanged layout, no shadow on image.

**Archive / page heroes**: left aligned, title `--step-4`, lede Newsreader `--ink-2`.
Search tools: no gray box — label + white input with `--rule-strong` border; tag filters as pill
buttons with hairline border, selected = ink fill.

**Article page**: header left-aligned inside the narrow shell; tag row left-aligned, tags as small
red sans caps text links (no boxes); title `--step-5`; deck `--step-1` `--ink-2`; byline row in
sans with hairline top. Cover image wider than prose, no shadow. Prose: Newsreader body; h2/h3 in
Instrument Sans 600; links ink with red underline; blockquote = pull quote, large italic Newsreader,
3px red left rule, no background; callout = paper with 3px blue top rule and hairline border;
figure captions sans `--step--1` `--ink-3`.

**Not found**: same page-hero treatment.

**Footer**: ink background, eyebrow red-tinted, h2 Newsreader, links sans; meta row hairline.

## 4. Files

- `app/layout.tsx` — swap fonts, `themeColor` → `#FAF8F4`.
- `app/globals.css` — rewritten, organized as: tokens → base → layout → header/nav → buttons →
  home → cards → archive → article/prose → footer → responsive → reduced motion. Class names used
  by existing markup are preserved.
- `app/page.tsx` — remove `.flag-stripe` element and `.photo-note` paragraph.
- `components/SiteHeader.tsx` — add flag bar element if CSS pseudo-element isn't sufficient
  (prefer `::before` on `.site-header`, no markup change).
- `components/ArticleCard.tsx` — no markup change expected.

## 5. Verification

- `npm run typecheck`, `npm run lint`, `npm run build` all pass.
- Browser check at 1280px and 375px: `/`, `/articles`, one `/articles/[slug]` (with blockquote /
  figure if available), `/july-11`, `/human-rights`, a 404 URL. No horizontal scroll at 375px;
  focus styles visible when tabbing the header.
- Screenshots sent to the user.
