#!/usr/bin/env node
/**
 * 从 mark.svg 生成 favicon.png / icon.png
 *
 * 用法: node overlay/scripts/render-icons.mjs
 * 环境: 优先使用项目根目录的 sharp；未安装时若 PNG 已存在则跳过
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findRoot() {
  const candidates = [
    process.env.KLANG_ROOT,
    path.resolve(__dirname, "../.."),
    path.resolve(__dirname, "../../.."),
  ].filter(Boolean);

  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "apps/web"))) return dir;
    if (fs.existsSync(path.join(dir, "www/apps/web"))) return path.join(dir, "www");
  }
  return path.resolve(__dirname, "../..");
}

const ROOT = findRoot();
const assetsDir = path.resolve(__dirname, "../theme/klang/assets");
const svgPath = path.join(assetsDir, "mark.svg");

const outputs = [
  { file: "favicon.png", size: 128 },
  { file: "icon.png", size: 512 },
];

function loadSharp() {
  const searchRoots = [
    ROOT,
    path.join(ROOT, "apps/web"),
  ];

  for (const base of searchRoots) {
    const pkg = path.join(base, "package.json");
    if (!fs.existsSync(pkg)) continue;
    try {
      const req = createRequire(pkg);
      return req("sharp");
    } catch {
      // try next
    }
  }
  return null;
}

function pngsExist() {
  return outputs.every(({ file }) => fs.existsSync(path.join(assetsDir, file)));
}

async function main() {
  if (!fs.existsSync(svgPath)) {
    console.error("mark.svg 不存在:", svgPath);
    process.exit(1);
  }

  const sharp = loadSharp();
  if (!sharp) {
    if (pngsExist()) {
      console.log("  skip  icon render（未安装 sharp，沿用已有 favicon.png / icon.png）");
      console.log("        如需重新生成: npm install && npm run icons");
      return;
    }
    console.error(
      "错误: 未找到 sharp，且 favicon.png / icon.png 不存在。\n" +
        "请先执行: npm install\n" +
        "或在 apps/web 目录: npm install"
    );
    process.exit(1);
  }

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
