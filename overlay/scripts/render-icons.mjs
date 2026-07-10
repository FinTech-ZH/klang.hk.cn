#!/usr/bin/env node
/**
 * 从 mark.svg 生成 favicon.png / icon.png
 * 用法: node overlay/scripts/render-icons.mjs
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const assetsDir = path.resolve(__dirname, "../theme/klang/assets");
const svgPath = path.join(assetsDir, "mark.svg");

const outputs = [
  { file: "favicon.png", size: 128 },
  { file: "icon.png", size: 512 },
];

function loadSharp() {
  const webRoot = path.join(ROOT, "apps/web");
  const req = createRequire(path.join(webRoot, "package.json"));
  return req("sharp");
}

async function main() {
  if (!fs.existsSync(svgPath)) {
    console.error("mark.svg 不存在:", svgPath);
    process.exit(1);
  }

  const sharp = loadSharp();
  const svg = fs.readFileSync(svgPath);

  for (const { file, size } of outputs) {
    const dest = path.join(assetsDir, file);
    await sharp(svg, { density: Math.max(144, Math.ceil((size / 512) * 288)) })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(dest);
    console.log(`  write ${file} (${size}×${size})`);
  }
}

await main();
