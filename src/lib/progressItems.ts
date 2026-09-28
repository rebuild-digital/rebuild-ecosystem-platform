export const PROGRESS_STATUSES = ["done", "in-progress", "planned"] as const;

export type ProgressStatus = (typeof PROGRESS_STATUSES)[number];

/** Brand hues; a tile without an image uses the hue's light stop. */
export const PROGRESS_COLORS = ["red", "blue", "green", "blush", "blonde", "orange"] as const;

export type ProgressColor = (typeof PROGRESS_COLORS)[number];

export interface ProgressItem {
  title: string;
  status: ProgressStatus;
  /** Short free text for items that aren't done, e.g. "Draft in review". */
  note?: string;
  /** Internal path ("/…") or https URL. The whole tile becomes the link. */
  href?: string;
  image?: string;
  /** Leave out for decorative images; the tile title already names the item. */
  imageAlt?: string;
  /** Background behind the number when there's no image. Defaults to blue. */
  color?: ProgressColor;
}

const OPTIONAL_KEYS = ["note", "href", "image", "imageAlt"] as const;
const KNOWN_KEYS = new Set<string>(["title", "status", "color", ...OPTIONAL_KEYS]);

const isUrl = (value: string) =>
  value.startsWith("/") || value.startsWith("https://");

/**
 * Validates hand-edited progress content (e.g. `src/data/shipping.json`).
 * Throws on unknown keys, so a typo like "stauts" or an unsupported field
 * fails loudly instead of rendering the wrong thing.
 */
export function parseProgressItems(raw: unknown): ProgressItem[] {
  if (!Array.isArray(raw)) {
    throw new Error("Progress items must be an array");
  }

  return raw.map((entry, index) => {
    const where = `Progress item ${index + 1}`;
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      throw new Error(`${where} must be an object`);
    }
    const record = entry as Record<string, unknown>;

    for (const key of Object.keys(record)) {
      if (!KNOWN_KEYS.has(key)) {
        throw new Error(`${where} has an unknown field "${key}"`);
      }
    }

    const { title, status } = record;
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error(`${where} needs a title`);
    }
    if (!PROGRESS_STATUSES.includes(status as ProgressStatus)) {
      throw new Error(
        `${where} ("${title}") has status "${String(status)}"; use one of ${PROGRESS_STATUSES.join(", ")}`,
      );
    }

    const item: ProgressItem = { title, status: status as ProgressStatus };
    if (record.color !== undefined) {
      if (!PROGRESS_COLORS.includes(record.color as ProgressColor)) {
        throw new Error(
          `${where} ("${title}") has color "${String(record.color)}"; use one of ${PROGRESS_COLORS.join(", ")}`,
        );
      }
      item.color = record.color as ProgressColor;
    }
    for (const key of OPTIONAL_KEYS) {
      const value = record[key];
      if (value === undefined) continue;
      if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`${where} ("${title}") has an empty or non-text "${key}"`);
      }
      if ((key === "href" || key === "image") && !isUrl(value)) {
        throw new Error(
          `${where} ("${title}") has "${key}" "${value}"; use a path starting with "/" or an https URL`,
        );
      }
      item[key] = value;
    }
    return item;
  });
}
