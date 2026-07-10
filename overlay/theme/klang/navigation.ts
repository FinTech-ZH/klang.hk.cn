/** 顶栏导航与搜索 */
export const navigation = {
  links: [
    { href: "/", label: "首页" },
    { href: "/books", label: "课程笔记" },
    { href: "/blogs", label: "学习随笔" },
    { href: "/topics", label: "讨论与思考" },
  ],
  creator: {
    href: "/creator",
    label: "写笔记",
  },
  search: {
    title: "搜索学习笔记",
    placeholder: "搜索课程、章节、概念或关键词...",
    hotTags: [
      "投资学",
      "公司金融",
      "计量经济学",
      "衍生品",
      "风险管理",
    ],
  },
} as const;
