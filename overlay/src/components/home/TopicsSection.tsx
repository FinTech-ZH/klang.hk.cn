import Link from "next/link";
import { ArrowRight, BookOpen, LineChart, TrendingUp } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import { home } from "@/theme";

const { sections } = home;
const topicsConfig = sections.topics;

const iconMap = {
  gauge: TrendingUp,
  cog: LineChart,
  code: BookOpen,
} as const;

const cardStyles = [
  {
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50 border-violet-100",
    icon: "bg-violet-500 text-white",
    link: "text-violet-600 hover:text-violet-800",
  },
  {
    gradient: "from-fuchsia-500 to-pink-500",
    bg: "from-fuchsia-50 to-pink-50 border-fuchsia-100",
    icon: "bg-fuchsia-500 text-white",
    link: "text-fuchsia-600 hover:text-fuchsia-800",
  },
  {
    gradient: "from-cyan-500 to-blue-500",
    bg: "from-cyan-50 to-blue-50 border-cyan-100",
    icon: "bg-cyan-500 text-white",
    link: "text-cyan-600 hover:text-cyan-800",
  },
];

export default function TopicsSection() {
  return (
    <section id="topics" className="relative overflow-hidden bg-white py-16">
      <div className="pointer-events-none absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-violet-100/50 blur-3xl" />
      <PageContainer className="relative">
        <div className="mb-10 text-center">
          <span className="section-tag">Topics</span>
          <SectionHeader
            title={topicsConfig.title}
            description={topicsConfig.description}
            centered
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {topicsConfig.items.map((topic, i) => {
            const Icon = iconMap[topic.icon];
            const style = cardStyles[i % cardStyles.length];
            return (
              <div
                key={topic.title}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${style.bg}`}
              >
                <div
                  className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl ${style.gradient}`}
                />
                <div
                  className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl shadow-md ${style.icon}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative mb-2 text-lg font-bold text-slate-800">{topic.title}</h3>
                <p className="relative mb-4 text-sm leading-relaxed text-slate-600">
                  {topic.description}
                </p>
                <ul className="relative mb-5 space-y-1.5">
                  {topic.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r ${style.gradient}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={topic.href}
                  className={`relative inline-flex items-center text-sm font-semibold ${style.link}`}
                >
                  {topic.linkLabel} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
