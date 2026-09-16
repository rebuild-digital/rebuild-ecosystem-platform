import type { APIEvent } from "@solidjs/start/server";
import { getAllInsights } from "~/data/insights";
import site from "~/data/site";

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/directory/", priority: "0.8", changefreq: "weekly" },
  { url: "/insights/", priority: "0.8", changefreq: "weekly" },
];

export async function GET({ request }: APIEvent) {
  const baseUrl = site.url.replace(/\/$/, "");
  const insights = await getAllInsights();
  const now = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  for (const page of staticPages) {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }

  for (const insight of insights) {
    const date = new Date(insight.date).toISOString().split("T")[0];
    xml += `
  <url>
    <loc>${baseUrl}${insight.url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
