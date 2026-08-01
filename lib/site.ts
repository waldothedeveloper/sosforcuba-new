export const siteConfig = {
  name: "SOS for Cuba",
  shortName: "SOS Cuba",
  description:
    "Independent advocacy and historical context about freedom, human rights, and civic life in Cuba.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sosforcuba.com",
  email: "info@sosforcuba.com",
  locale: "en_US",
  language: "en"
} as const;
