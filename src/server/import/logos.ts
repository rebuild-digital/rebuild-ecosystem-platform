// Re-host platform logos on Bunny Storage (plan §2.3a): Notion file URLs
// expire, and external URLs would hotlink third parties. Only the Bunny CDN
// URL is stored in Postgres.

import { createHash } from "node:crypto";
import type { LogoSource } from "./notion";

export interface LogoStore {
  /** Upload and return the public URL. */
  put(path: string, body: Uint8Array<ArrayBuffer>, contentType: string): Promise<string>;
}

const MAX_BYTES = 5 * 1024 * 1024;
const TIMEOUT_MS = 20_000;

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
 * Bunny Storage via its HTTP API. Needs BUNNY_STORAGE_ZONE,
 * BUNNY_STORAGE_KEY (the zone's password) and BUNNY_CDN_URL (its pull
 * zone). BUNNY_STORAGE_HOST is the region endpoint (default Falkenstein).
 * Returns null when not configured, so imports can run without logos.
 */
export function bunnyLogoStore(env = process.env): LogoStore | null {
  const zone = env.BUNNY_STORAGE_ZONE;
  const key = env.BUNNY_STORAGE_KEY;
  const cdn = env.BUNNY_CDN_URL?.replace(/\/$/, "");
  if (!zone || !key || !cdn) return null;
  const host = env.BUNNY_STORAGE_HOST || "storage.bunnycdn.com";

  return {
    async put(path, body, contentType) {
      const res = await fetch(`https://${host}/${zone}/${path}`, {
        method: "PUT",
        headers: { AccessKey: key, "Content-Type": contentType },
        body,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`Bunny upload failed: HTTP ${res.status}`);
      return `${cdn}/${path}`;
    },
  };
}

/**
 * Download a logo and upload it under a content-hashed name, so the CDN can
 * cache it forever and a changed logo gets a new URL.
 */
export async function rehostLogo(source: LogoSource, slug: string, store: LogoStore): Promise<string> {
  const res = await fetch(source.url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
  const contentType = res.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ?? "";
  const ext = EXTENSIONS[contentType];
  if (!ext) throw new Error(`not a supported image (${contentType || "no content type"})`);
  const body = new Uint8Array(await res.arrayBuffer());
  if (body.byteLength > MAX_BYTES) throw new Error(`too large (${body.byteLength} bytes)`);
  const hash = createHash("sha256").update(body).digest("hex").slice(0, 12);
  return store.put(`platform-logos/${slug}-${hash}.${ext}`, body, contentType);
}
