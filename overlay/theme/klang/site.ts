/** 站点基础信息 — CityUHK 标识配色 */
export const site = {
  name: "CityUHK 学习笔记",
  title: "金融科技学习笔记",
  titleSuffix: "CityUHK · 金融科技",
  description:
    "香港城市大学企业金融与金融科技（CFFT）课程的学习笔记与阅读记录，探索、记录、分享每一学期的成长。",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://klang.hk.cn",
  beian: "",
  contact: "contact@klang.hk.cn",
  keywords: [
    "CityUHK",
    "香港城市大学",
    "金融科技",
    "学习笔记",
    "城大",
  ],
  assets: {
    favicon: "/theme/favicon.png",
    icon: "/theme/icon.png",
    ogDefault: "/theme/og-default.png",
  },
  logo: {
    text: "CityUHK 学习笔记",
    mark: "C",
    footer: {
      prefix: "CityUHK",
      highlight: "金融科技",
    },
  },
  copyright: "klang.hk.cn · 个人学习空间",
} as const;
