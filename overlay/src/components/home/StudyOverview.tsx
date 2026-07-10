import { CalendarDays, Sparkles } from "lucide-react";
import CityUMark from "@/components/ui/CityUMark";
import { home } from "@/theme";

const { overview } = home;

const courseColors = [
  "bg-violet-100 text-violet-700 ring-violet-200",
  "bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200",
  "bg-cyan-100 text-cyan-700 ring-cyan-200",
  "bg-amber-100 text-amber-700 ring-amber-200",
];

export default function StudyOverview() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="relative bg-gradient-to-r from-violet-600/90 to-fuchsia-600/90 px-6 py-5 text-white">
        <div className="absolute right-4 top-4 opacity-20">
          <CityUMark className="h-16 w-16" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-200">
          {overview.school}
        </p>
        <h2 className="mt-1 text-xl font-bold">{overview.semester}</h2>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-violet-100">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          {overview.program}
        </p>
      </div>

      <div className="px-6 py-5">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-violet-500">
          本学期课程
        </h3>
        <ul className="space-y-3">
          {overview.courses.map((course, i) => (
            <li
              key={course.code}
              className="flex items-center justify-between gap-3 rounded-xl bg-slate-50/80 px-4 py-3 ring-1 ring-slate-100"
            >
              <div className="min-w-0">
                <span className="font-semibold text-slate-800">{course.name}</span>
                <span
                  className={`ml-2 inline-block rounded-md px-1.5 py-0.5 text-[10px] font-bold ring-1 ${courseColors[i % courseColors.length]}`}
                >
                  {course.code}
                </span>
              </div>
              <span className="shrink-0 text-xs text-slate-500">{course.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-violet-100 bg-gradient-to-b from-violet-50/50 to-white px-6 py-5">
        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-500">
          <CalendarDays className="h-3.5 w-3.5" />
          最近更新
        </h3>
        <ul className="space-y-2.5">
          {overview.recent.map((item) => (
            <li key={item.date + item.text} className="flex gap-3 text-sm">
              <time className="shrink-0 rounded-md bg-violet-100 px-2 py-0.5 font-mono text-xs font-semibold text-violet-700">
                {item.date}
              </time>
              <span className="text-slate-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
