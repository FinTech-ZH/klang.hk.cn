#!/usr/bin/env node
/**
 * 删除 apps/web 并重新 clone submodule，然后 apply overlay。
 *
 * 用法: node scripts/reset-web.mjs
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WEB = path.join(ROOT, "apps/web");

function run(cmd, cwd = ROOT) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

function main() {
  console.log("=== 1/4 删除 apps/web ===");
  if (fs.existsSync(WEB)) {
    fs.rmSync(WEB, { recursive: true, force: true });
    console.log("  removed apps/web/");
  }

  console.log("\n=== 2/4 重新 clone submodule ===");
  run("git submodule update --init --recursive");

  if (!fs.existsSync(path.join(WEB, ".git"))) {
    console.error("错误: submodule 初始化失败");
    process.exit(1);
  }

  console.log("\n=== 3/4 重新 apply overlay ===");
  run("node scripts/apply-overlay.mjs", ROOT);

  console.log("\n=== 4/4 安装依赖 ===");
  run("npm install", WEB);

  console.log("\n重置完成。运行: npm run dev");
}

main();
