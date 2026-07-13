import Link from "next/link";
import { ArrowRight, BookOpen, LineChart, TrendingUp } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { home } from "@/theme";

const { sections } = home;
const topicsConfig = sections.topics;

const iconMap = {
  gauge: TrendingUp,
  cog: LineChart,
  code: BookOpen,
} as const;

const accents = [
  "border-l-brand-600",
  "border-l-accent-500",
  "border-l-brand-400",
];

export default function TopicsSection() {
  return (
    <section id="topics" className="border-t border-slate-200 bg-slate-50 py-14">
      <PageContainer>
        <div className="mb-8 border-b border-slate-200 pb-6 text-center">
          <p className="section-tag">Research Areas</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{topicsConfig.title}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">{topicsConfig.description}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {topicsConfig.items.map((topic, i) => {
            const Icon = iconMap[topic.icon];
            return (
              <div
                key={topic.title}
                className={`card border-l-4 ${accents[i % accents.length]} p-5`}
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-brand-700">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">{topic.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">{topic.description}</p>
                <ul className="mb-4 space-y-1 border-t border-slate-100 pt-3">
                  {topic.items.map((item) => (
                    <li key={item} className="text-sm text-slate-600 before:mr-2 before:text-slate-300 before:content-['–']">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={topic.href}
                  className="inline-flex items-center text-sm font-medium text-brand-700 hover:text-brand-800"
                >
                  {topic.linkLabel} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
