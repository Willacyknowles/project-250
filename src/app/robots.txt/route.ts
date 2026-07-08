import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  return new Response(
    [`User-agent: *`, `Allow: /`, `Sitemap: ${siteConfig.url}/sitemap.xml`, ``].join(
      "\n",
    ),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
