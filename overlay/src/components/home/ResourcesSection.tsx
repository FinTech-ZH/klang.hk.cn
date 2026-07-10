import { BookOpen, Download, FileText } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import { home } from "@/theme";

const { sections } = home;
const resourcesConfig = sections.resources;

const cardStyles = [
  {
    icon: BookOpen,
    gradient: "from-violet-500 to-indigo-500",
    bg: "hover:border-violet-300 hover:shadow-violet-500/10",
  },
  {
    icon: FileText,
    gradient: "from-fuchsia-500 to-rose-500",
    bg: "hover:border-fuchsia-300 hover:shadow-fuchsia-500/10",
  },
];

export default function ResourcesSection() {
  return (
    <section id="resources" className="py-16">
      <PageContainer>
        <div className="mb-10 text-center">
          <span className="section-tag">Resources</span>
          <SectionHeader
            title={resourcesConfig.title}
            description={resourcesConfig.description}
            centered
          />
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {resourcesConfig.cards.map((card, i) => {
            const style = cardStyles[i % cardStyles.length];
            const Icon = style.icon;
            return (
              <div
                key={card.title}
                className={`card group p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg ${style.bg}`}
              >
                <div className="mb-5 flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-md ${style.gradient} text-white`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{card.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{card.description}</p>
                  </div>
                </div>
                <ul className="mb-5 space-y-2 border-t border-violet-100 pt-4">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="h-1 w-1 rounded-full bg-violet-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`inline-flex items-center rounded-full bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-md ${style.gradient}`}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {card.buttonLabel}
                </button>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
