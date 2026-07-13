import { BookOpen, FileText } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { home } from "@/theme";

const { sections } = home;
const resourcesConfig = sections.resources;

const icons = [BookOpen, FileText] as const;

export default function ResourcesSection() {
  return (
    <section id="resources" className="border-t border-slate-200 py-14">
      <PageContainer>
        <div className="mb-8 border-b border-slate-200 pb-6 text-center">
          <p className="section-tag">Resources</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{resourcesConfig.title}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">{resourcesConfig.description}</p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {resourcesConfig.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <div key={card.title} className="card p-5">
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-brand-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{card.description}</p>
                  </div>
                </div>
                <ul className="space-y-1.5 border-t border-slate-100 pt-3 text-sm text-slate-600">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
