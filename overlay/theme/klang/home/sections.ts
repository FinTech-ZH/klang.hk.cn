/** 首页各区块标题与筛选项 */
export const sections = {
  books: {
    title: "课程笔记",
    description: "按课程整理的课堂笔记、章节摘要与参考阅读",
    filterOptions: ["全部课程", "投资学", "公司金融", "计量经济", "衍生品", "最新更新"],
    emptyText: "暂无笔记，可在创作中心开始记录",
    moreLabel: "查看全部笔记",
    moreHref: "/books",
  },
  blogs: {
    title: "学习随笔",
    description: "读书摘要、案例思考与学期阶段性总结",
    filterOptions: ["最新发布", "读书摘要", "案例讨论", "复习整理", "学期总结"],
    emptyText: "暂无随笔",
    moreLabel: "查看全部随笔",
    moreHref: "/blogs",
  },
  topics: {
    title: "专题学习",
    description: "围绕金融科学核心课程与主题的学习整理",
    items: [
      {
        title: "投资学与资产定价",
        description:
          "涵盖现代投资组合理论、CAPM、因子模型与证券分析，整理课堂要点与习题思路",
        href: "/topics",
        icon: "gauge" as const,
        color: "blue" as const,
        items: [
          "均值—方差分析与有效前沿",
          "资本资产定价模型（CAPM）",
          "多因子模型与实证阅读",
        ],
        linkLabel: "查看专题",
      },
      {
        title: "公司金融与估值",
        description:
          "从财务报表分析到资本结构、股利政策与企业估值，记录案例与模型应用",
        href: "/topics",
        icon: "cog" as const,
        color: "purple" as const,
        items: [
          "DCF 与相对估值方法",
          "资本成本与融资决策",
          "并购与公司治理案例",
        ],
        linkLabel: "查看专题",
      },
      {
        title: "计量经济学与数据分析",
        description:
          "回归分析、时间序列与金融数据实证的基础方法，配合课程作业与软件练习笔记",
        href: "/topics",
        icon: "gauge" as const,
        color: "green" as const,
        items: [
          "OLS 回归与假设检验",
          "时间序列与波动率建模",
          "实证论文阅读笔记",
        ],
        linkLabel: "查看专题",
      },
    ],
  },
  resources: {
    title: "学习资料",
    description: "课件整理、参考书目与复习材料归档",
    cards: [
      {
        title: "课程课件与大纲",
        description: "按学期归档的 lecture notes 与 syllabus",
        icon: "file" as const,
        color: "blue" as const,
        items: ["投资学课程大纲", "公司金融 week-by-week 要点", "计量经济公式速查"],
        buttonLabel: "查看归档",
      },
      {
        title: "参考书目与阅读清单",
        description: "教材、补充读物与论文选读",
        icon: "file" as const,
        color: "purple" as const,
        items: ["Bodie, Kane & Marcus《投资学》", "Brealey《公司金融》", "学期推荐阅读"],
        buttonLabel: "浏览书单",
      },
    ],
  },
} as const;
