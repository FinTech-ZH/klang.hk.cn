import { CalendarDays, LineChart } from "lucide-react";
import { home } from "@/theme";

const { overview } = home;

export default function StudyOverview() {
  return (
    <div className="card">
      <div className="gradient-brand px-5 py-4 text-white">
        <p className="text-[11px] font-medium uppercase tracking-widest text-slate-300">
          {overview.school}
        </p>
        <h2 className="mt-1 text-lg font-semibold">{overview.semester}</h2>
        <p className="mt-0.5 text-sm text-slate-300">{overview.program}</p>
      </div>

      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <LineChart className="h-3.5 w-3.5 text-accent-600" />
          本学期课程
        </div>
        <ul className="mt-3 space-y-2">
          {overview.courses.map((course) => (
            <li
              key={course.code}
              className="flex items-baseline justify-between gap-3 border-b border-slate-50 py-2 last:border-0"
            >
              <div className="min-w-0">
                <span className="text-sm font-medium text-slate-800">{course.name}</span>
                <span className="ml-2 font-mono text-xs text-slate-400">{course.code}</span>
              </div>
              <span className="shrink-0 text-xs text-slate-500">{course.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-50 px-5 py-4">
        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <CalendarDays className="h-3.5 w-3.5" />
          最近更新
        </h3>
        <ul className="space-y-2">
          {overview.recent.map((item) => (
            <li key={item.date + item.text} className="flex gap-3 text-sm">
              <time className="shrink-0 font-mono text-xs text-slate-400">{item.date}</time>
              <span className="text-slate-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
