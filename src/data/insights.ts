"use server";

import * as fs from "node:fs";
import * as path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const INSIGHTS_DIR = path.join(process.cwd(), "src/content/insights");

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

function parseInsightFile(filename: string): Insight | null {
  const filePath = path.join(INSIGHTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const frontmatter = data as InsightFrontmatter;
  if (!frontmatter.published) return null;

  const slug = filename.replace(/\.md$/, "");
  const html = marked.parse(content) as string;

  return {
    slug,
    url: `/insights/${slug}/`,
    frontmatter,
    html,
  };
}

export async function getAllInsights(): Promise<InsightSummary[]> {
  const files = fs
    .readdirSync(INSIGHTS_DIR)
    .filter((f) => f.endsWith(".md"));

  const insights: InsightSummary[] = [];

  for (const file of files) {
    const parsed = parseInsightFile(file);
    if (!parsed) continue;

    insights.push({
      slug: parsed.slug,
      url: parsed.url,
      title: parsed.frontmatter.title,
      date: parsed.frontmatter.date,
      author: parsed.frontmatter.author,
      tags: parsed.frontmatter.tags,
      excerpt: parsed.frontmatter.excerpt,
      featured_image: parsed.frontmatter.featured_image,
      published: parsed.frontmatter.published,
    });
  }

  return insights.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getInsightBySlug(
  slug: string
): Promise<Insight | null> {
  const filename = `${slug}.md`;
  const filePath = path.join(INSIGHTS_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  return parseInsightFile(filename);
}
