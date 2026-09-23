import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

// Only production is indexable (see site.indexable). The header covers what
// the robots meta tag can't: the feed, sitemap and static downloads.
// robots.txt still allows crawling, since a blocked crawler never sees it.
const robotsHeaders =
  process.env.VITE_SITE_INDEXABLE === "true"
    ? {}
    : { "X-Robots-Tag": "noindex, nofollow" };

export default defineConfig({
  middleware: "./src/middleware.ts",
  server: {
    preset: "node-server",
    plugins: ["./src/server/warmDataCaches.ts", "./src/server/migrateDb.ts"],
    // Drizzle migrations ride along in the server bundle for migrateDb.ts.
    serverAssets: [{ baseName: "migrations", dir: "./drizzle" }],
    routeRules: {
      "/**": { headers: robotsHeaders },
      "/assets/**": {
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      },
      "/fonts/**": {
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        // Agent worktrees live under .claude/; their generated tsconfigs
        // otherwise make Vite clear its cache and reload this dev server.
        ignored: ["**/.claude/**"],
      },
    },
  },
});
