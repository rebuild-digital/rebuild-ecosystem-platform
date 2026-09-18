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

const PHOTO_QUALITY = 82;
const PNG_QUALITY = 90;

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

function pct(before, after) {
  return `${Math.round((1 - after / before) * 100)}% smaller`;
}

// ---------------------------------------------------------------------------

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
    const srcFiles = walk(SRC_DIR).filter((f) =>
      /\.(tsx?|css|json|md)$/.test(f)
    );

    let fileChanges = 0;

    for (const file of srcFiles) {
      let content = readFileSync(file, "utf8");
      let changed = false;

      for (const { publicFrom, publicTo } of renames) {
        // Only update refs where the .webp counterpart was actually created
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
