import { defineConfig } from "drizzle-kit";

// `npm run db:generate` needs no database. db:migrate and db:studio use
// DATABASE_URL: a local Postgres, since Risved's is private (ADR 0005).
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  casing: "snake_case",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
