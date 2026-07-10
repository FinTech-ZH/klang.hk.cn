/** 首页右侧「本学期概览」— 替代 carousel */
export const overview = {
  semester: "2026-09 第一学期",
  school: "City University of Hong Kong",
  program: "金融科技 · 商学院",
  courses: [
    { name: "投资学", code: "FIN3001", note: "有效前沿 · CAPM" },
    { name: "公司金融", code: "FIN2003", note: "DCF 估值案例" },
    { name: "计量经济学", code: "ECO3002", note: "OLS 与假设检验" },
    { name: "金融衍生品", code: "FIN4001", note: "期权定价入门" },
  ],
  recent: [
    { date: "03-12", text: "投资学 — 完成第 5 章笔记" },
    { date: "03-08", text: "公司金融 — 整理期中复习要点" },
    { date: "03-03", text: "借阅 Bodie《投资学》第 10 版" },
  ],
} as const;
