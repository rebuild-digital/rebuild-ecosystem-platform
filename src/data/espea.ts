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

function getCachePath(): string {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return join(__dirname, "../../.cache/espea.json");
}

export async function getEspeaData(): Promise<EspeaData> {
  const cachePath = getCachePath();

  try {
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

    mkdirSync(dirname(cachePath), { recursive: true });
    writeFileSync(cachePath, JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    console.warn(
      `ESPEA fetch error: ${err instanceof Error ? err.message : err}`,
    );

    if (existsSync(cachePath)) {
      return JSON.parse(readFileSync(cachePath, "utf-8"));
    }

    return FALLBACK;
  }
}
