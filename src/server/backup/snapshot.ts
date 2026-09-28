// Logical database snapshots (plan §7.11). Risved Cloud has no SSH and the
// app image has no pg_dump, so tables are exported as JSON through SQL and
// restored with json_populate_recordset, which lets Postgres cast every
// value back to its column type. It covers every table in the public and
// drizzle schemas, so tables added later (e.g. Better Auth's) are included
// without changes here.
//
// A snapshot holds data, not schema: restore into a database migrated to
// the same code (the drizzle migration records are part of the snapshot).

import { sql } from "drizzle-orm";
import type { Db } from "../db";

export interface Snapshot {
  format: "rebuild-db-snapshot";
  version: 1;
  createdAt: string;
  tables: { schema: string; name: string; rows: Record<string, unknown>[] }[];
}

const SCHEMAS = ["public", "drizzle"];
const CHUNK = 500;

const ident = (schema: string, name: string) => sql.raw(`"${schema}"."${name}"`);

// execute() returns the row array with postgres.js but { rows } with PGlite.
async function query<T>(db: Pick<Db, "execute">, q: ReturnType<typeof sql>): Promise<T[]> {
  const result = (await db.execute(q)) as unknown as T[] | { rows: T[] };
  return Array.isArray(result) ? result : result.rows;
}

/** Tables in foreign-key order: every table comes after the tables it references. */
async function tablesInDependencyOrder(db: Db) {
  const tables = await query<{ schema: string; name: string }>(db, sql`
    select n.nspname as schema, c.relname as name
    from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where c.relkind = 'r' and n.nspname in ${SCHEMAS}
    order by 1, 2
  `);
  const refs = await query<{ child: string; parent: string }>(db, sql`
    select cn.nspname || '.' || cc.relname as child, pn.nspname || '.' || pc.relname as parent
    from pg_constraint k
    join pg_class cc on cc.oid = k.conrelid join pg_namespace cn on cn.oid = cc.relnamespace
    join pg_class pc on pc.oid = k.confrelid join pg_namespace pn on pn.oid = pc.relnamespace
    where k.contype = 'f' and k.conrelid <> k.confrelid
  `);

  const key = (t: { schema: string; name: string }) => `${t.schema}.${t.name}`;
  const ordered: typeof tables = [];
  const done = new Set<string>();
  const visit = (t: (typeof tables)[number], path: Set<string>) => {
    if (done.has(key(t)) || path.has(key(t))) return;
    path.add(key(t));
    for (const r of refs.filter((r) => r.child === key(t))) {
      const parent = tables.find((p) => key(p) === r.parent);
      if (parent) visit(parent, path);
    }
    done.add(key(t));
    ordered.push(t);
  };
  for (const t of tables) visit(t, new Set());
  return ordered;
}

export async function takeSnapshot(db: Db): Promise<Snapshot> {
  const tables: Snapshot["tables"] = [];
  for (const t of await tablesInDependencyOrder(db)) {
    const [result] = await query<{ rows: unknown }>(
      db,
      sql`select coalesce(json_agg(t), '[]'::json) as rows from ${ident(t.schema, t.name)} t`,
    );
    const raw = result.rows;
    const rows = (typeof raw === "string" ? JSON.parse(raw) : raw) as Record<string, unknown>[];
    tables.push({ ...t, rows });
  }
  return { format: "rebuild-db-snapshot", version: 1, createdAt: new Date().toISOString(), tables };
}

/**
 * Replace the contents of every snapshot table, in one transaction. The
 * target must already have the same schema (run the migrations first).
 */
export async function restoreSnapshot(db: Db, snapshot: Snapshot): Promise<void> {
  if (snapshot.format !== "rebuild-db-snapshot" || snapshot.version !== 1) {
    throw new Error("Not a rebuild-db-snapshot v1 file");
  }
  await db.transaction(async (tx) => {
    const all = snapshot.tables.map((t) => ident(t.schema, t.name));
    if (all.length) await tx.execute(sql`truncate ${sql.join(all, sql`, `)} restart identity cascade`);

    for (const t of snapshot.tables) {
      for (let i = 0; i < t.rows.length; i += CHUNK) {
        const chunk = JSON.stringify(t.rows.slice(i, i + CHUNK));
        await tx.execute(sql`
          insert into ${ident(t.schema, t.name)} overriding system value
          select * from json_populate_recordset(null::${ident(t.schema, t.name)}, ${chunk}::json)
        `);
      }
    }

    // Serial and identity columns: move their sequences past the restored ids.
    const sequences = await query<{ schema: string; name: string; column: string }>(tx, sql`
      select table_schema as schema, table_name as name, column_name as column
      from information_schema.columns
      where table_schema in ${SCHEMAS}
        and (column_default like 'nextval(%' or is_identity = 'YES')
    `);
    for (const s of sequences) {
      const table = `"${s.schema}"."${s.name}"`;
      await tx.execute(sql`
        select setval(pg_get_serial_sequence(${table}, ${s.column}),
                      coalesce(max(${sql.identifier(s.column)}), 1),
                      max(${sql.identifier(s.column)}) is not null)
        from ${ident(s.schema, s.name)}
      `);
    }
  });
}
