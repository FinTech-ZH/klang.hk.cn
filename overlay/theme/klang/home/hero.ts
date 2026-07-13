/** 首页 Hero 区域文案 */
export const hero = {
  badge: "CityUHK · 金融科技 · 商学院",
  title: {
    before: "金融与科技",
    highlight: "学习笔记",
    after: "",
  },
  description:
    "记录课程要点、阅读摘要与案例分析。以学术整理为主，聚焦金融科技领域的知识积累与思考。",
  cta: {
    primary: { href: "#books", label: "课程笔记" },
    secondary: { href: "#blogs", label: "学习随笔" },
  },
  domains: [
    { label: "金融", desc: "投资 · 公司金融 · 衍生品" },
    { label: "科技", desc: "数据 · 编程 · 系统" },
  ],
} as const;
