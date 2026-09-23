#!/usr/bin/env node
/**
 * Converts all JPG/JPEG/PNG images under public/assets/images/ to WebP.
 *
 * Usage:
 *   node scripts/compress-images.mjs            # dry run — shows what would be converted
 *   node scripts/compress-images.mjs --convert  # create .webp files alongside originals
 *   node scripts/compress-images.mjs --convert --update-refs  # also rewrite source paths
 *   node scripts/compress-images.mjs --convert --update-refs --remove-originals  # clean up
 *
 * Web-sized variants (--resize): for every image referenced from src/ whose
 * long edge exceeds 2400 px or whose file exceeds 500 KB, writes foo-2400.webp
 * (long edge ≤ 2400) and foo-1200.webp (long edge ≤ 1200) next to foo.webp, and
 * regenerates src/data/imageWidths.ts (used for srcset, see src/lib/images.ts).
 * To add an image: drop the full-size original in, run the full pipeline.
 *
 *   node scripts/compress-images.mjs --resize                            # dry run
 *   node scripts/compress-images.mjs --resize --convert                  # write variants
 *   node scripts/compress-images.mjs --resize --convert --update-refs    # point src/ at -2400
 *   node scripts/compress-images.mjs --resize --convert --update-refs --remove-originals
 *
 * Requires: cwebp (brew install webp)
 */

import { execSync, spawnSync } from "child_process";
import {
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
  existsSync,
} from "fs";
import { join, extname, basename, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const IMAGES_DIR = join(ROOT, "public", "assets", "images");
const SRC_DIR = join(ROOT, "src");

const CONVERT = process.argv.includes("--convert");
const UPDATE_REFS = process.argv.includes("--update-refs");
const REMOVE_ORIGINALS = process.argv.includes("--remove-originals");
const RESIZE = process.argv.includes("--resize");

const PHOTO_QUALITY = 82;
const PNG_QUALITY = 90;

const RESIZE_QUALITY = 80;
// Grainy photos that stay heavy at RESIZE_QUALITY (paths relative to IMAGES_DIR)
const RESIZE_QUALITY_OVERRIDES = {
  "margrethe.webp": 60,
  "paris.webp": 60,
};
const VARIANT_EDGES = [2400, 1200]; // first entry is the one src/ refs point at
const RESIZE_MIN_BYTES = 500_000; // re-encode below 2400 px too if heavier than this
const VARIANT_RE = new RegExp(`-(${VARIANT_EDGES.join("|")})\\.webp$`);
const WIDTHS_FILE = join(SRC_DIR, "data", "imageWidths.ts");

// ---------------------------------------------------------------------------

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function humanSize(bytes) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`;
  return `${bytes} B`;
}

function publicPath(file) {
  return "/" + relative(join(ROOT, "public"), file).replace(/\\/g, "/");
}

function pct(before, after) {
  return `${Math.round((1 - after / before) * 100)}% smaller`;
}

// ---------------------------------------------------------------------------

if (RESIZE) {
  resizeImages();
  process.exit(0);
}

const convertible = walk(IMAGES_DIR).filter((f) =>
  /\.(jpg|jpeg|png)$/i.test(f)
);

if (convertible.length === 0) {
  console.log("No convertible images found.");
  process.exit(0);
}

// Check cwebp is available
if (spawnSync("cwebp", ["-version"]).status !== 0) {
  console.error("cwebp not found. Install with: brew install webp");
  process.exit(1);
}

console.log(
  `\nFound ${convertible.length} images${CONVERT ? " — converting" : " (dry run, pass --convert to proceed)"}:\n`
);

let totalBefore = 0;
let totalAfter = 0;
const renames = []; // { from: '/assets/images/foo.jpg', to: '/assets/images/foo.webp' }

for (const src of convertible) {
  const ext = extname(src).toLowerCase();
  const dest = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const beforeSize = statSync(src).size;
  const isPng = ext === ".png";
  const quality = isPng ? PNG_QUALITY : PHOTO_QUALITY;

  totalBefore += beforeSize;

  if (CONVERT) {
    const result = spawnSync("cwebp", [
      "-q", String(quality),
      ...(isPng ? ["-alpha_q", "90"] : []),
      "-mt",
      src, "-o", dest,
    ]);

    if (result.status !== 0) {
      console.error(`  FAILED: ${relative(ROOT, src)}`);
      console.error(result.stderr?.toString());
      continue;
    }

    const afterSize = statSync(dest).size;
    totalAfter += afterSize;

    if (afterSize >= beforeSize) {
      // WebP is larger — remove it, keep the original
      unlinkSync(dest);
      console.log(
        `  ✗ ${relative(ROOT, src).padEnd(60)} ${humanSize(beforeSize).padStart(8)}   (skipped — WebP would be larger)`
      );
      continue;
    }

    console.log(
      `  ✓ ${relative(ROOT, src).padEnd(60)} ${humanSize(beforeSize).padStart(8)} → ${humanSize(afterSize).padStart(8)}  (${pct(beforeSize, afterSize)})`
    );
  } else {
    // Dry run: estimate output size from a tiny sample to get rough ratio
    console.log(`  • ${relative(ROOT, src).padEnd(60)} ${humanSize(beforeSize).padStart(8)}`);
    totalAfter += Math.round(beforeSize * 0.25); // rough WebP estimate
  }

  // Record the public-path rename for ref updating
  const publicFrom =
    "/" + relative(join(ROOT, "public"), src).replace(/\\/g, "/");
  const publicTo =
    "/" + relative(join(ROOT, "public"), dest).replace(/\\/g, "/");
  renames.push({ src, dest, publicFrom, publicTo });
}

console.log(
  `\nTotal: ${humanSize(totalBefore)} → ${humanSize(totalAfter)} (${pct(totalBefore, totalAfter)}${CONVERT ? "" : ", estimated"})\n`
);

// ---------------------------------------------------------------------------
// Update source references

if (UPDATE_REFS) {
  if (!CONVERT) {
    console.log(
      "Skipping ref update (--convert not passed, no .webp files created yet)."
    );
  } else {
    updateRefs(renames);
  }
}

// ---------------------------------------------------------------------------
// Remove originals

if (REMOVE_ORIGINALS) {
  if (!CONVERT) {
    console.log("Skipping removal (--convert not passed).");
  } else {
    console.log("\nRemoving originals:");
    for (const { src, dest } of renames) {
      if (existsSync(dest)) {
        unlinkSync(src);
        console.log(`  removed ${relative(ROOT, src)}`);
      }
    }
  }
}

if (!CONVERT) {
  console.log(
    "Dry run complete. Run with --convert to create .webp files.\n" +
    "Full pipeline: node scripts/compress-images.mjs --convert --update-refs --remove-originals\n"
  );
}

// ---------------------------------------------------------------------------
// Shared helpers

function updateRefs(renames) {
  const srcFiles = walk(SRC_DIR).filter((f) =>
    /\.(tsx?|css|json|md)$/.test(f)
  );

  let fileChanges = 0;

  for (const file of srcFiles) {
    let content = readFileSync(file, "utf8");
    let changed = false;

    for (const { publicFrom, publicTo } of renames) {
      // Only update refs where the new file was actually created
      if (!existsSync(join(ROOT, "public", publicTo.slice(1)))) continue;
      if (content.includes(publicFrom)) {
        content = content.replaceAll(publicFrom, publicTo);
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(file, content);
      console.log(`  updated refs: ${relative(ROOT, file)}`);
      fileChanges++;
    }
  }

  if (fileChanges === 0) {
    console.log("  No source references needed updating.");
  } else {
    console.log(`\n  Updated ${fileChanges} file(s).`);
  }
}

/** Reads pixel dimensions from a PNG, JPEG or WebP header. */
function imageSize(file) {
  const b = readFileSync(file);
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
    const chunk = b.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
    }
    if (chunk === "VP8L") {
      const bits = b.readUInt32LE(21);
      return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
    }
    if (chunk === "VP8 ") {
      return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
    }
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff || b[i + 1] === 0xff) { i++; continue; }
      const marker = b[i + 1];
      // SOF0–SOF15, excluding DHT (C4), JPG (C8) and DAC (CC)
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// --resize: web-sized variants

function resizeImages() {
  if (CONVERT && spawnSync("cwebp", ["-version"]).status !== 0) {
    console.error("cwebp not found. Install with: brew install webp");
    process.exit(1);
  }

  // Only images something in src/ points at — no point shipping variants of unused files
  const srcText = walk(SRC_DIR)
    .filter((f) => /\.(tsx?|css|json|md)$/.test(f))
    .map((f) => readFileSync(f, "utf8"))
    .join("\n");
  const isReferenced = (f) =>
    srcText.includes(publicPath(f)) ||
    srcText.includes(publicPath(`${f.slice(0, -extname(f).length)}-${VARIANT_EDGES[0]}.webp`));

  const candidates = walk(IMAGES_DIR)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f) && !VARIANT_RE.test(f) && isReferenced(f))
    .map((src) => ({ src, size: imageSize(src), bytes: statSync(src).size }))
    .filter(({ size, bytes }) =>
      size && (Math.max(size.width, size.height) > VARIANT_EDGES[0] || bytes > RESIZE_MIN_BYTES)
    );

  console.log(
    `\nFound ${candidates.length} oversized images${CONVERT ? " — writing variants" : " (dry run, pass --convert to proceed)"}:\n`
  );

  let totalBefore = 0;
  let totalAfter = 0;
  const renames = [];

  for (const { src, size, bytes } of candidates) {
    const longEdge = Math.max(size.width, size.height);
    const isPng = extname(src).toLowerCase() === ".png";
    const stem = src.slice(0, -extname(src).length);
    const label = `${relative(ROOT, src)} (${size.width}x${size.height})`;

    if (!CONVERT) {
      console.log(`  • ${label.padEnd(72)} ${humanSize(bytes).padStart(8)}`);
      continue;
    }

    const written = [];
    for (const edge of VARIANT_EDGES) {
      // Smaller variants only make sense when they actually downscale
      if (edge !== VARIANT_EDGES[0] && longEdge <= edge) continue;
      const dest = `${stem}-${edge}.webp`;
      if (!existsSync(dest) || statSync(dest).mtimeMs < statSync(src).mtimeMs) {
        const resize = longEdge <= edge ? [] : size.width >= size.height ? ["-resize", String(edge), "0"] : ["-resize", "0", String(edge)];
        const result = spawnSync("cwebp", [
          "-q", String(isPng ? PNG_QUALITY : RESIZE_QUALITY_OVERRIDES[relative(IMAGES_DIR, src)] ?? RESIZE_QUALITY),
          ...(isPng ? ["-alpha_q", "90"] : []),
          ...resize,
          "-m", "6",
          "-mt",
          src, "-o", dest,
        ]);
        if (result.status !== 0) {
          console.error(`  FAILED: ${relative(ROOT, dest)}`);
          console.error(result.stderr?.toString());
          continue;
        }
      }
      written.push({ edge, dest, bytes: statSync(dest).size });
    }

    const main = written.find((w) => w.edge === VARIANT_EDGES[0]);
    if (!main) continue;
    if (main.bytes >= bytes) {
      // Re-encoding didn't help — drop the variants and keep pointing at the original
      for (const w of written) unlinkSync(w.dest);
      console.log(`  ✗ ${label.padEnd(72)} ${humanSize(bytes).padStart(8)}   (skipped — variant would be larger)`);
      continue;
    }

    totalBefore += bytes;
    totalAfter += main.bytes;
    console.log(
      `  ✓ ${label.padEnd(72)} ${humanSize(bytes).padStart(8)} → ${written.map((w) => `${w.edge}: ${humanSize(w.bytes)}`).join(", ")}  (${pct(bytes, main.bytes)})`
    );
    renames.push({ src, publicFrom: publicPath(src), publicTo: publicPath(main.dest) });
  }

  if (!CONVERT) {
    console.log(
      "\nDry run complete. Full pipeline: node scripts/compress-images.mjs --resize --convert --update-refs\n"
    );
    return;
  }

  console.log(
    `\nTotal (${VARIANT_EDGES[0]} variants vs originals): ${humanSize(totalBefore)} → ${humanSize(totalAfter)} (${pct(totalBefore, totalAfter)})\n`
  );

  writeWidthManifest();

  if (UPDATE_REFS) updateRefs(renames);

  if (REMOVE_ORIGINALS) {
    // Re-read src/ so an original that something still points at is never removed
    const refs = walk(SRC_DIR)
      .filter((f) => /\.(tsx?|css|json|md)$/.test(f))
      .map((f) => readFileSync(f, "utf8"))
      .join("\n");
    console.log("\nRemoving originals:");
    for (const { src, publicFrom } of renames) {
      if (refs.includes(publicFrom)) {
        console.log(`  kept ${relative(ROOT, src)} (still referenced — pass --update-refs)`);
        continue;
      }
      unlinkSync(src);
      console.log(`  removed ${relative(ROOT, src)}`);
    }
  }
}

function writeWidthManifest() {
  const entries = walk(IMAGES_DIR)
    .filter((f) => VARIANT_RE.test(f))
    .map((f) => [publicPath(f), imageSize(f).width])
    .sort(([a], [b]) => a.localeCompare(b));

  const body = entries.map(([p, w]) => `  ${JSON.stringify(p)}: ${w},`).join("\n");
  writeFileSync(
    WIDTHS_FILE,
    `// Generated by scripts/compress-images.mjs --resize --convert. Do not edit.\n` +
      `// Intrinsic width (px) of each web-sized image variant, used to build srcset.\n` +
      `export const imageWidths: Record<string, number> = {\n${body}\n};\n`
  );
  console.log(`  wrote ${relative(ROOT, WIDTHS_FILE)} (${entries.length} variants)`);
}
