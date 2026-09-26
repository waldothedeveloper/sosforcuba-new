const DEFAULT_SITE_URL = "https://www.sosforcuba.com";

// Tolerates an unset/empty env var and a value missing its scheme, so `new URL()` never throws at build time.
function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();
  if (!value) return DEFAULT_SITE_URL;
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "SOS for Cuba",
  shortName: "SOS Cuba",
  description:
    "Independent advocacy and historical context about freedom, human rights, and civic life in Cuba.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  email: "info@sosforcuba.com",
  locale: "en_US",
  language: "en"
} as const;
