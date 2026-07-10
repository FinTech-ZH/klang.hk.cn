/** 页脚内容与链接 */
export const footer = {
  description:
    "香港城市大学金融科技专修学生的个人学习记录，整理课程笔记、阅读摘要与阶段性思考。",
  nav: {
    title: "内容导航",
    links: [
      { href: "/books", label: "课程笔记" },
      { href: "/blogs", label: "学习随笔" },
      { href: "/topics", label: "讨论与思考" },
      { href: "/#resources", label: "学习资料" },
    ],
  },
  techAreas: {
    title: "主要方向",
    items: [
      "投资学与资产定价",
      "公司金融与估值",
      "金融衍生品",
      "计量经济学",
      "风险管理",
    ],
  },
  contact: {
    title: "关于本站",
    items: [
      "City University of Hong Kong",
      "College of Business · Department of Economics and Finance",
    ],
  },
  legal: ["仅供个人学习交流", "笔记版权归作者所有"],
} as const;
