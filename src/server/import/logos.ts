// Re-host platform logos on Bunny Storage (plan §2.3a): Notion file URLs
// expire, and external URLs would hotlink third parties. Only the Bunny CDN
// URL is stored in Postgres.

import { createHash } from "node:crypto";
import { bunnyStorage } from "../bunny";
import type { LogoSource } from "./notion";

export interface LogoStore {
  /** Upload and return the public URL. */
  put(path: string, body: Uint8Array<ArrayBuffer>, contentType: string): Promise<string>;
}

const MAX_BYTES = 5 * 1024 * 1024;
const TIMEOUT_MS = 20_000;
const USER_AGENT = "Mozilla/5.0 (compatible; RebuildLogoImporter/1.0; +https://rebuild.net)";

// Bot protection is inconsistent: some hosts reject requests without a
// User-Agent, others reject ours, and some block intermittently. On 403/429
// the download is retried with the next header set.
const ATTEMPTS: { headers: Record<string, string>; delayMs: number }[] = [
  { headers: { "User-Agent": USER_AGENT }, delayMs: 0 },
  { headers: {}, delayMs: 0 },
  { headers: { "User-Agent": USER_AGENT }, delayMs: 1500 },
];

async function download(url: string): Promise<Response> {
  let res: Response | undefined;
  for (const { headers, delayMs } of ATTEMPTS) {
    if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs));
    res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (res.status !== 403 && res.status !== 429) return res;
  }
  return res!;
}

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
};

/**
 * Logos go to the public zone behind BUNNY_CDN_URL (its pull zone). Needs
 * BUNNY_STORAGE_ZONE and BUNNY_STORAGE_KEY; BUNNY_STORAGE_HOST is optional.
 * Returns null when not configured, so imports can run without logos.
 */
export function bunnyLogoStore(env = process.env): LogoStore | null {
  const cdn = env.BUNNY_CDN_URL?.replace(/\/$/, "");
  if (!env.BUNNY_STORAGE_ZONE || !env.BUNNY_STORAGE_KEY || !cdn) return null;
  const storage = bunnyStorage(env.BUNNY_STORAGE_ZONE, env.BUNNY_STORAGE_KEY, env.BUNNY_STORAGE_HOST || undefined);
  return {
    async put(path, body, contentType) {
      await storage.put(path, body, contentType);
      return `${cdn}/${path}`;
    },
  };
}

/**
 * Download a logo and upload it under a content-hashed name, so the CDN can
 * cache it forever and a changed logo gets a new URL.
 */
export async function rehostLogo(source: LogoSource, slug: string, store: LogoStore): Promise<string> {
  // URLs pasted into Notion can carry invisible characters before "http".
  const url = source.url.trim().replace(/^[^h]+(?=https?:\/\/)/, "");
  const res = await download(url);
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
  const contentType = res.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ?? "";
  const ext = EXTENSIONS[contentType];
  if (!ext) throw new Error(`not a supported image (${contentType || "no content type"})`);
  const body = new Uint8Array(await res.arrayBuffer());
  if (body.byteLength > MAX_BYTES) throw new Error(`too large (${body.byteLength} bytes)`);
  const hash = createHash("sha256").update(body).digest("hex").slice(0, 12);
  return store.put(`platform-logos/${slug}-${hash}.${ext}`, body, contentType);
}
