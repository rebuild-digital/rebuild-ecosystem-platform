import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Server-only. Risved's Postgres add-on injects DATABASE_URL; the database is
// reachable only on Risved's private network, so no TLS there (ADR 0005).
// Locally, point DATABASE_URL at your own Postgres.

export const casing = "snake_case";

function connect(url: string) {
  return drizzle(postgres(url, { max: 5 }), { schema, casing });
}

let db: ReturnType<typeof connect> | undefined;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  db ??= connect(url);
  return db;
}
