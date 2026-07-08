import { siteConfig } from "@/config/site";
import { getCaseFiles } from "@/lib/case-files";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const urls = [
    {
      loc: siteConfig.url,
      priority: "1.0",
    },
    {
      loc: `${siteConfig.url}/case-files`,
      priority: "0.8",
    },
    ...getCaseFiles().map((caseFile) => ({
      loc: `${siteConfig.url}/case-files/${caseFile.slug}`,
      priority: "0.7",
    })),
  ];

  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls.map(
      (url) =>
        `  <url><loc>${escapeXml(url.loc)}</loc><changefreq>weekly</changefreq><priority>${url.priority}</priority></url>`,
    ),
    `</urlset>`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
