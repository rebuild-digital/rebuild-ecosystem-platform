import { chromium } from "playwright";
import * as fs from "node:fs";
import * as path from "node:path";

const LIVE = "https://www.rebuild.net";
const LOCAL = "http://localhost:3000";
const OUT = path.join(process.cwd(), "scripts/screenshots");

const PAGES = [
  { slug: "home", path: "/" },
  { slug: "about", path: "/about/" },
  { slug: "apply", path: "/apply/" },
  { slug: "data", path: "/data/" },
  { slug: "directory", path: "/directory/" },
  { slug: "gathering-request", path: "/gathering-request/" },
  { slug: "gatherings", path: "/gatherings/" },
  { slug: "gatherings-rebuild-2", path: "/gatherings/rebuild-2/" },
  { slug: "gatherings-rebuild-3", path: "/gatherings/rebuild-3/" },
  { slug: "get-in-touch", path: "/get-in-touch/" },
  { slug: "insights", path: "/insights/" },
  { slug: "journey", path: "/journey/" },
  { slug: "newsletter", path: "/newsletter/" },
  { slug: "open-positions", path: "/open-positions/" },
  { slug: "people", path: "/people/" },
  { slug: "privacy", path: "/privacy/" },
  { slug: "suggest", path: "/suggest/" },
  { slug: "tools", path: "/tools/" },
  { slug: "changelog", path: "/changelog/" },
  // Sample insight posts
  { slug: "insight-thomas-madsen-mygdal", path: "/insights/thomas-madsen-mygdal/" },
  { slug: "insight-collaboration", path: "/insights/collaboration/" },
  { slug: "insight-social-design-framework", path: "/insights/social-design-framework/" },
];

fs.mkdirSync(path.join(OUT, "live"), { recursive: true });
fs.mkdirSync(path.join(OUT, "local"), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
});

async function screenshot(page, url, outPath) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`  ✓ ${url}`);
    return true;
  } catch (e) {
    console.log(`  ✗ ${url} — ${e.message}`);
    return false;
  }
}

const page = await context.newPage();

console.log("\n=== Screenshotting live site ===");
for (const p of PAGES) {
  await screenshot(page, LIVE + p.path, path.join(OUT, "live", `${p.slug}.png`));
}

console.log("\n=== Screenshotting local site ===");
for (const p of PAGES) {
  await screenshot(page, LOCAL + p.path, path.join(OUT, "local", `${p.slug}.png`));
}

await browser.close();
console.log("\nDone. Screenshots saved to scripts/screenshots/");
