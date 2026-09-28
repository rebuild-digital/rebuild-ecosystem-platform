// Bunny Storage over its HTTP API, shared by logo re-hosting (public zone)
// and database backups (private zone, no pull zone).

const TIMEOUT_MS = 60_000;

export interface StorageFile {
  name: string;
  size: number;
}

export interface BunnyStorage {
  put(path: string, body: Uint8Array<ArrayBuffer>, contentType?: string): Promise<void>;
  get(path: string): Promise<Uint8Array>;
  /** Files (not folders) directly inside `dir`, e.g. "backups/". */
  list(dir: string): Promise<StorageFile[]>;
  remove(path: string): Promise<void>;
}

/**
 * `zone` is the storage zone name, `key` its password (not the read-only
 * one), `host` its region endpoint (default Falkenstein/Frankfurt). A host
 * with a scheme (http://127.0.0.1:8787) is used as is, for local testing.
 */
export function bunnyStorage(zone: string, key: string, host = "storage.bunnycdn.com"): BunnyStorage {
  const base = host.includes("://") ? host : `https://${host}`;
  const url = (path: string) => `${base}/${zone}/${path}`;
  const request = async (method: string, path: string, init: RequestInit = {}) => {
    const res = await fetch(url(path), {
      ...init,
      method,
      headers: { AccessKey: key, ...init.headers },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Bunny Storage ${method} ${path}: HTTP ${res.status}`);
    return res;
  };

  return {
    async put(path, body, contentType = "application/octet-stream") {
      await request("PUT", path, { body, headers: { "Content-Type": contentType } });
    },
    async get(path) {
      return new Uint8Array(await (await request("GET", path)).arrayBuffer());
    },
    async list(dir) {
      const entries = (await (await request("GET", dir.endsWith("/") ? dir : `${dir}/`, {
        headers: { Accept: "application/json" },
      })).json()) as { ObjectName: string; Length: number; IsDirectory: boolean }[];
      return entries.filter((e) => !e.IsDirectory).map((e) => ({ name: e.ObjectName, size: e.Length }));
    },
    async remove(path) {
      await request("DELETE", path);
    },
  };
}
