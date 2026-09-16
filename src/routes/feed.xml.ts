import type { APIEvent } from "@solidjs/start/server";
import { getAllInsights } from "~/data/insights";
import site from "~/data/site";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET({ request }: APIEvent) {
  const baseUrl = site.url.replace(/\/$/, "");
  const insights = await getAllInsights();
  const now = new Date().toUTCString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(site.description)}</description>
    <language>${site.language}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />`;

  for (const insight of insights.slice(0, 20)) {
    const pubDate = new Date(insight.date).toUTCString();
    xml += `
    <item>
      <title>${escapeXml(insight.title)}</title>
      <link>${baseUrl}${insight.url}</link>
      <guid isPermaLink="true">${baseUrl}${insight.url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(insight.excerpt)}</description>
      <author>${escapeXml(insight.author)}</author>
    </item>`;
  }

  xml += `
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
