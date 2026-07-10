#!/usr/bin/env node
/**
 * 将 overlay/ 中的定制内容应用到 apps/web submodule。
 *
 * 原则：所有 klang.hk.cn 定制只改 overlay/，不直接改 apps/web。
 * 升级 eventstoreUI2 后重新运行此脚本即可。
 *
 * 用法: node scripts/apply-overlay.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WEB = path.join(ROOT, "apps/web");
const OVERLAY = path.join(ROOT, "overlay");

const THEME_NAME = readThemeName();

function readThemeName() {
  const envExample = path.join(OVERLAY, ".env.local.example");
  const envLocal = path.join(OVERLAY, ".env.local");
  const source = fs.existsSync(envLocal) ? envLocal : envExample;
  if (!fs.existsSync(source)) return "klang";
  const match = fs.readFileSync(source, "utf8").match(/^NEXT_PUBLIC_THEME=(.+)$/m);
  return match?.[1]?.trim() || "klang";
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rmIfExists(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

/** 递归复制目录（overlay → apps/web） */
function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function writeActiveTheme(themeName) {
  const activeTs = path.join(WEB, "theme/_active.ts");
  fs.writeFileSync(
    activeTs,
    `/** 由 scripts/apply-overlay.mjs 自动生成，请勿手动编辑 */\nexport {\n  site,\n  navigation,\n  footer,\n  pages,\n  home,\n  siteConfig,\n} from "./${themeName}";\n`
  );
  console.log(`  write theme/_active.ts → ${themeName}`);

  const activeCss = path.join(WEB, "theme/_active.css");
  fs.writeFileSync(
    activeCss,
    `@import "./${themeName}/colors.css";\n@import "./${themeName}/components.css";\n`
  );
  console.log(`  write theme/_active.css → ${themeName}`);
}

function syncThemeAssets(themeName) {
  const assetsDir = path.join(WEB, "theme", themeName, "assets");
  const publicTheme = path.join(WEB, "public/theme");
  if (!fs.existsSync(assetsDir)) return;
  ensureDir(publicTheme);
  for (const file of fs.readdirSync(assetsDir)) {
    fs.copyFileSync(path.join(assetsDir, file), path.join(publicTheme, file));
  }
  console.log(`  sync  public/theme/ ← theme/${themeName}/assets/`);
}

function applyEnv() {
  const src = fs.existsSync(path.join(OVERLAY, ".env.local"))
    ? path.join(OVERLAY, ".env.local")
    : path.join(OVERLAY, ".env.local.example");
  if (!fs.existsSync(src)) {
    console.warn("  skip  .env.local（overlay/.env.local 不存在）");
    return;
  }
  fs.copyFileSync(src, path.join(WEB, ".env.local"));
  console.log(`  copy  apps/web/.env.local ← ${path.relative(ROOT, src)}`);
}

function applyConfig() {
  const src = path.join(OVERLAY, "src/lib/config.ts");
  const dest = path.join(WEB, "src/lib/config.ts");
  if (!fs.existsSync(src)) return;
  fs.copyFileSync(src, dest);
  console.log(`  copy  src/lib/config.ts ← overlay/src/lib/config.ts`);
}

function applyLibOverlay() {
  const esclientDir = path.join(OVERLAY, "src/lib/esclient");
  const destDir = path.join(WEB, "src/lib/esclient");
  if (!fs.existsSync(esclientDir)) return;
  ensureDir(destDir);
  for (const entry of fs.readdirSync(esclientDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".ts")) continue;
    fs.copyFileSync(
      path.join(esclientDir, entry.name),
      path.join(destDir, entry.name)
    );
  }
  console.log(`  copy  src/lib/esclient/ ← overlay/src/lib/esclient/`);
}

function applyThemeSync() {
  const src = path.join(OVERLAY, "scripts/theme-sync.mjs");
  const dest = path.join(WEB, "scripts/theme-sync.mjs");
  if (!fs.existsSync(src)) return;
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`  copy  scripts/theme-sync.mjs ← overlay/scripts/theme-sync.mjs`);
}

function applyComponents() {
  const src = path.join(OVERLAY, "src/components");
  const dest = path.join(WEB, "src/components");
  if (!fs.existsSync(src)) return;
  copyDir(src, dest);
  console.log(`  copy  src/components/ ← overlay/src/components/`);
}

function main() {
  if (!fs.existsSync(WEB)) {
    console.error("错误: apps/web 不存在，请先 git submodule update --init");
    process.exit(1);
  }

  const themeSrc = path.join(OVERLAY, "theme", THEME_NAME);
  if (!fs.existsSync(themeSrc)) {
    console.error(`错误: overlay/theme/${THEME_NAME} 不存在`);
    process.exit(1);
  }

  console.log(`Applying overlay (theme=${THEME_NAME})...\n`);

  // 1. 主题目录：复制到 apps/web（symlink 指向项目外时 Turbopack 无法解析）
  const themeDest = path.join(WEB, "theme", THEME_NAME);
  rmIfExists(themeDest);
  copyDir(themeSrc, themeDest);
  console.log(`  copy  ${path.relative(ROOT, themeDest)} ← overlay/theme/${THEME_NAME}/`);

  // 2. 生成 _active.ts / _active.css（上游 theme-sync.mjs 尚未提交，由本脚本替代）
  writeActiveTheme(THEME_NAME);

  // 3. 静态资源 → public/theme/
  syncThemeAssets(THEME_NAME);

  // 4. 环境变量
  applyEnv();

  // 5. config.ts + lib/esclient 覆盖
  applyConfig();
  applyLibOverlay();

  // 6. theme-sync.mjs（上游 package.json 引用但尚未提交）
  applyThemeSync();

  // 7. 定制组件（首页布局、Header 等）
  applyComponents();

  const carouselPath = path.join(WEB, "src/components/home/Carousel.tsx");
  if (fs.existsSync(carouselPath)) {
    fs.rmSync(carouselPath);
    console.log("  remove src/components/home/Carousel.tsx（已弃用）");
  }

  console.log("\nDone. 运行: cd apps/web && npm install && npm run dev");
}

main();
