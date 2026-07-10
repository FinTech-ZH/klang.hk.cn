# klang.hk.cn

基于 [eventstoreUI2](https://github.com/asmcos/eventstoreUI2) 的站点，通过 **overlay + 脚本** 定制主题与配置，方便跟踪上游升级。

## 目录结构

```
klang.hk.cn/
├── apps/web/                  # submodule → eventstoreUI2（不要直接改）
├── overlay/                   # ★ 所有定制放这里
│   ├── .env.local.example     # 环境变量模板
│   ├── .env.local             # 本地配置（gitignore，从 example 复制）
│   ├── theme/klang/           # 自定义主题（站点名、配色、导航、首页文案）
│   └── src/lib/config.ts      # WebSocket / 上传地址等
├── scripts/
│   ├── apply-overlay.mjs      # 将 overlay 应用到 apps/web
│   ├── reset-web.mjs          # 还原 apps/web + 重新 apply
│   └── upgrade-web.mjs        # 升级 submodule + 重新 apply
└── package.json
```

## 快速开始

```bash
# 克隆（含 submodule）
git clone --recurse-submodules https://github.com/FinTech-ZH/klang.hk.cn.git
cd klang.hk.cn

# 配置环境变量
cp overlay/.env.local.example overlay/.env.local

# 应用定制并启动
npm run dev
```

## 如何定制

### 1. 主题（推荐改 overlay/theme/klang/）

| 文件 | 作用 |
|------|------|
| `site.ts` | 站点名称、SEO、Logo、域名 |
| `navigation.ts` | 顶栏导航、搜索文案 |
| `footer.ts` | 页脚 |
| `colors.css` | 品牌色 |
| `home/hero.ts` | 首页 Hero |
| `home/sections.ts` | 首页各区块 |
| `pages.ts` | 各页 SEO 标题 |
| `assets/` | favicon、icon（同步到 public/theme/） |

改完后执行：

```bash
npm run overlay
```

### 2. 连接配置（overlay/src/lib/config.ts + .env.local）

`src/lib/config.ts` 中的 WebSocket、上传地址优先读环境变量。生产环境建议在 `overlay/.env.local` 中配置：

```env
NEXT_PUBLIC_THEME=klang
NEXT_PUBLIC_SITE_URL=https://klang.hk.cn
EVENTSTORE_DB_NAME=klanghkcn
EVENTSTORE_WS_URL=ws://your-server:8080/?dbName=klanghkcn
```

### 3. 应用 overlay

每次修改 overlay 后，或 clone/升级 submodule 后：

```bash
npm run overlay          # 仅 apply
npm run dev              # apply + 启动开发服务器
```

脚本会：
- 将 `overlay/theme/klang/` 复制到 `apps/web/theme/klang/`
- 生成 `theme/_active.ts` 和 `theme/_active.css`
- 同步 `assets/` → `apps/web/public/theme/`
- 复制 `.env.local` 和 `config.ts`

### 4. 重置 apps/web（出问题时用）

若 `apps/web` 被改乱、或 overlay 应用异常，可一键删除并重建：

```bash
npm run reset    # rm -rf apps/web + 重新 clone submodule + apply + npm install
```

`reset` 会执行：
1. `rm -rf apps/web/`
2. `git submodule update --init`（重新 clone eventstoreUI2）
3. `npm run overlay`
4. `npm install`

## 升级 eventstoreUI2

```bash
# 查看 upstream 是否有新 commit
npm run upgrade:check

# 拉取最新 + npm install + 重新 apply overlay
npm run upgrade
```

**原则：不要直接改 `apps/web/` 里的文件**（除了 submodule 指针更新）。所有 klang.hk.cn 定制保持在 `overlay/`，升级后重新 `npm run overlay` 即可。

## 首次 clone 团队成员

```bash
git clone --recurse-submodules <repo>
cp overlay/.env.local.example overlay/.env.local
npm run dev
```

若已 clone 但未初始化 submodule：

```bash
git submodule update --init --recursive
npm run overlay
```
