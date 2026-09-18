import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  middleware: "./src/middleware.ts",
  server: {
    preset: "node-server",
    routeRules: {
      "/assets/**": {
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      },
      "/fonts/**": {
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      },
      "/": { prerender: true },
      "/directory": { prerender: true },
      "/data": { prerender: true },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
