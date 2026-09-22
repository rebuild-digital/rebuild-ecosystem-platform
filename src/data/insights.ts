"use server";

import matter from "gray-matter";
import { marked } from "marked";

const insightFiles = import.meta.glob<string>("/src/content/insights/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export interface InsightFrontmatter {
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  featured_image?: string;
  featured_image_credit?: string;
  featured_image_credit_theme?: string;
  published: boolean;
}

export interface Insight {
  slug: string;
  url: string;
  frontmatter: InsightFrontmatter;
  html: string;
}

export interface InsightSummary {
  slug: string;
  url: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  featured_image?: string;
  published: boolean;
}

let summaryCache: InsightSummary[] | null = null;

function parseInsightRaw(slug: string, raw: string): Insight | null {
  const { data, content } = matter(raw);
  const frontmatter = data as InsightFrontmatter;
  if (!frontmatter.published) return null;
  const html = marked.parse(content) as string;
  return { slug, url: `/insights/${slug}/`, frontmatter, html };
}

export async function getAllInsights(): Promise<InsightSummary[]> {
  if (summaryCache) return summaryCache;

  const insights: InsightSummary[] = [];

  for (const [filePath, raw] of Object.entries(insightFiles)) {
    const slug = filePath.replace(/^.*\//, "").replace(/\.md$/, "");
    const { data } = matter(raw);
    const fm = data as InsightFrontmatter;
    if (!fm.published) continue;
    insights.push({
      slug,
      url: `/insights/${slug}/`,
      title: fm.title,
      date: fm.date,
      author: fm.author,
      tags: fm.tags,
      excerpt: fm.excerpt,
      featured_image: fm.featured_image,
      published: fm.published,
    });
  }

  summaryCache = insights.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return summaryCache;
}

export async function getInsightBySlug(
  slug: string
): Promise<Insight | null> {
  const key = `/src/content/insights/${slug}.md`;
  const raw = insightFiles[key];
  if (!raw) return null;
  return parseInsightRaw(slug, raw);
}
