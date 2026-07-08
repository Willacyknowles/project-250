const fallbackSiteUrl = "https://theknowlescollection.com";

function normalizeUrl(url: string) {
  return url.replace(/\/$/, "");
}

export const siteConfig = {
  company: "Parable Labs",
  platformName: "Project 250",
  platformDescription:
    "AI-assisted provenance and historical investigation platform.",
  publicProduct: "The Knowles Collection",
  tagline: "Follow the Evidence.",
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl),
} as const;
