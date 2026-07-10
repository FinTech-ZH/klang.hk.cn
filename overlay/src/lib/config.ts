/** klang.hk.cn 服务端 / 客户端连接配置（覆盖 apps/web 默认值） */
export const eventStoreDbName =
  process.env.EVENTSTORE_DB_NAME ?? "klanghkcn";

export const esserver =
  process.env.EVENTSTORE_WS_URL ??
  `ws://127.0.0.1:8080/?dbName=${eventStoreDbName}`;

export const clientEsserver =
  process.env.NEXT_PUBLIC_EVENTSTORE_WS_URL ??
  `ws://127.0.0.1:8080/?dbName=${eventStoreDbName}`;

export const uploadpath =
  process.env.UPLOAD_BASE_URL ?? "http://127.0.0.1:8081/uploads/";

/** @deprecated 请使用 `@/theme` 中的 `site` */
export { siteConfig } from "@/theme";
