#!/usr/bin/env node
/**
 * eventstoreUI2 的 theme:sync 替代实现（上游尚未提交此文件）。
 * 由 apply-overlay.mjs 复制到 apps/web/scripts/theme-sync.mjs。
 *
 * 在 apps/web 目录下运行，根据 NEXT_PUBLIC_THEME 生成 _active.ts / _active.css，
 * 并将 theme/<name>/assets/ 同步到 public/theme/。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(__dirname, "..");

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const env = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

function readThemeName() {
  const env = {
    ...readEnvFile(path.join(WEB, ".env")),
    ...readEnvFile(path.join(WEB, ".env.local")),
    ...process.env,
  };
  if (env.NEXT_PUBLIC_THEME) return env.NEXT_PUBLIC_THEME;

  const configPath = path.join(WEB, "theme/config.ts");
  if (fs.existsSync(configPath)) {
    const match = fs
      .readFileSync(configPath, "utf8")
      .match(/defaultThemeName\s*=\s*["']([^"']+)["']/);
    if (match) return match[1];
  }
  return "default";
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeActiveTheme(themeName) {
  const themeDir = path.join(WEB, "theme", themeName);
  if (!fs.existsSync(themeDir)) {
    console.error(`theme-sync: 主题目录不存在: theme/${themeName}`);
    process.exit(1);
  }

  fs.writeFileSync(
    path.join(WEB, "theme/_active.ts"),
    `/** 由 scripts/theme-sync.mjs 自动生成，请勿手动编辑 */\nexport {\n  site,\n  navigation,\n  footer,\n  pages,\n  home,\n  siteConfig,\n} from "./${themeName}";\n`
  );

  fs.writeFileSync(
    path.join(WEB, "theme/_active.css"),
    `@import "./${themeName}/colors.css";\n@import "./${themeName}/components.css";\n`
  );
}

function syncThemeAssets(themeName) {
  const assetsDir = path.join(WEB, "theme", themeName, "assets");
  const publicTheme = path.join(WEB, "public/theme");
  if (!fs.existsSync(assetsDir)) return;
  ensureDir(publicTheme);
  for (const file of fs.readdirSync(assetsDir)) {
    fs.copyFileSync(path.join(assetsDir, file), path.join(publicTheme, file));
  }
}

const themeName = readThemeName();
writeActiveTheme(themeName);
syncThemeAssets(themeName);
console.log(`theme-sync: active theme → ${themeName}`);
