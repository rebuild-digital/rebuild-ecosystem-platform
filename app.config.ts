import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  middleware: "./src/middleware.ts",
  server: {
    preset: "node-server",
    plugins: ["./src/server/warmDataCaches.ts"],
    routeRules: {
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
