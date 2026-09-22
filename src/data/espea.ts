import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export interface EspeaData {
  revenue: number;
  europeanShare: number;
  jobs: string;
  metaShare: number;
  updatedAt: string | null;
}

const FALLBACK: EspeaData = {
  revenue: 85,
  europeanShare: 5,
  jobs: "1M+",
  metaShare: 55,
  updatedAt: null,
};

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzMGj17FSefqDLu0Qa3Sq282kmQb3QQ6cMXV5UDdlLuamYeR_ZkuxyAvZfWfxgyhxYk/exec";

const MEMORY_TTL = 10 * 60 * 1000;
let memCache: { data: EspeaData; ts: number } | null = null;
let pendingRefresh: Promise<EspeaData> | null = null;

function getCachePath(): string {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return join(__dirname, "../../.cache/espea.json");
}

function readFileCache(): EspeaData | null {
  try {
    const cachePath = getCachePath();
    if (existsSync(cachePath)) {
      return JSON.parse(readFileSync(cachePath, "utf-8"));
    }
  } catch {
    // cache unreadable
  }
  return null;
}

async function fetchFromEndpoint(): Promise<EspeaData> {
  const res = await fetch(ENDPOINT, { redirect: "follow" });
  if (!res.ok) throw new Error(`ESPEA fetch failed: ${res.status}`);

  const json = await res.json();
  const data: EspeaData = {
    revenue: json.revenue,
    europeanShare: json.europeanShare,
    jobs: String(json.jobs).trim(),
    metaShare: json.metaShare,
    updatedAt: new Date().toISOString(),
  };

  const cachePath = getCachePath();
  mkdirSync(dirname(cachePath), { recursive: true });
  writeFileSync(cachePath, JSON.stringify(data, null, 2));
  memCache = { data, ts: Date.now() };
  return data;
}

function refreshInBackground() {
  if (pendingRefresh) return;
  pendingRefresh = fetchFromEndpoint()
    .catch((err) => {
      console.warn("Background ESPEA refresh failed:", err.message);
      return memCache?.data ?? FALLBACK;
    })
    .finally(() => {
      pendingRefresh = null;
    });
}

export async function getEspeaData(): Promise<EspeaData> {
  if (memCache && Date.now() - memCache.ts < MEMORY_TTL) {
    return memCache.data;
  }

  const fileCached = readFileCache();
  if (fileCached) {
    memCache = { data: fileCached, ts: Date.now() };
    refreshInBackground();
    return fileCached;
  }

  if (pendingRefresh) return pendingRefresh;

  try {
    pendingRefresh = fetchFromEndpoint();
    return await pendingRefresh;
  } catch (err) {
    console.warn(
      `ESPEA fetch error: ${err instanceof Error ? err.message : err}`,
    );
    memCache = { data: FALLBACK, ts: Date.now() };
    return FALLBACK;
  } finally {
    pendingRefresh = null;
  }
}
