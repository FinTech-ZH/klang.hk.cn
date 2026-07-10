#!/usr/bin/env node
/**
 * 升级 eventstoreUI2 submodule 并重新应用 overlay。
 *
 * 用法: node scripts/upgrade-web.mjs [--check]
 *   --check  只显示 upstream 是否有新 commit，不实际更新
 */
import { execSync } from "node:child_process";
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
  const checkOnly = process.argv.includes("--check");

  if (checkOnly) {
    run("git fetch origin", WEB);
    run("git log --oneline HEAD..origin/main", WEB);
    return;
  }

  console.log("=== 1/3 更新 submodule ===");
  run("git submodule update --init --recursive");
  run("git fetch origin", WEB);
  run("git checkout main", WEB);
  run("git pull origin main", WEB);

  console.log("\n=== 2/3 安装依赖 ===");
  run("npm install", WEB);

  console.log("\n=== 3/3 重新应用 overlay ===");
  run("node scripts/apply-overlay.mjs", ROOT);

  console.log("\n升级完成。请在 apps/web 下运行 npm run dev 验证。");
}

main();
