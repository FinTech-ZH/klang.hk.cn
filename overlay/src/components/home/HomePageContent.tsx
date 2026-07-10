import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import BookCard from "./BookCard";
import BlogCard from "./BlogCard";
import TopicsSection from "./TopicsSection";
import ResourcesSection from "./ResourcesSection";
import StudyOverview from "./StudyOverview";
import CityUMark from "@/components/ui/CityUMark";
import PageContainer from "@/components/layout/PageContainer";
import type { HomePageData } from "@/lib/esclient/server";
import { bookGrid, blogGrid } from "@/lib/layout";
import { home } from "@/theme";

interface HomePageContentProps {
  data: HomePageData;
}

const { hero, sections } = home;

const courseColors = [
  "from-violet-500 to-purple-600",
  "from-fuchsia-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-amber-400 to-orange-500",
];

function FilterSelect({ options }: { options: readonly string[] }) {
  return (
    <select className="rounded-full border border-violet-200 bg-white py-2 pl-4 pr-9 text-sm text-violet-800 shadow-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  );
}

export default function HomePageContent({ data }: HomePageContentProps) {
  const { books, blogs, usersProfile, browseLogs, backendError } = data;

  return (
    <main className="flex w-full flex-col overflow-x-hidden bg-surface pt-16 font-sans text-slate-800 antialiased">
      {backendError && (
        <div className="border-b border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm text-rose-800">
          {backendError}
        </div>
      )}

      {/* Hero — 渐变 + 光斑 */}
      <section id="home" className="gradient-hero relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-cyan-300/20 blur-2xl" />

        <PageContainer className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-amber-300" />
                {hero.badge}
              </div>

              <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
                {hero.title.before}
                <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-white bg-clip-text text-transparent">
                  {hero.title.highlight}
                </span>
                {hero.title.after}
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-violet-100">
                {hero.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={hero.cta.primary.href} className="btn-primary">
                  {hero.cta.primary.label}
                </Link>
                <Link href={hero.cta.secondary.href} className="btn-outline">
                  {hero.cta.secondary.label}
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {["投资学", "公司金融", "计量经济", "衍生品"].map((tag, i) => (
                  <span
                    key={tag}
                    className={`rounded-full bg-gradient-to-r ${courseColors[i % courseColors.length]} px-3 py-1 text-xs font-semibold text-white shadow-md`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <StudyOverview />
          </div>
        </PageContainer>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="h-12 w-full md:h-16" aria-hidden>
            <path d="M0,40 Q300,80 600,40 T1200,40 L1200,80 L0,80 Z" fill="var(--color-surface)" />
          </svg>
        </div>
      </section>

      <section id="books" className="py-16">
        <PageContainer>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-tag">Notes</span>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">{sections.books.title}</h2>
              <p className="mt-2 max-w-xl text-slate-600">{sections.books.description}</p>
            </div>
            <FilterSelect options={sections.books.filterOptions} />
          </div>
          {books.length > 0 ? (
            <div className={bookGrid}>
              {books.map((book) => (
                <BookCard key={book.id} book={book} viewCount={browseLogs[book.id] ?? 0} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 py-20 text-center">
              <CityUMark className="mx-auto mb-4 h-12 w-12 opacity-80" />
              <p className="text-violet-600">{sections.books.emptyText}</p>
            </div>
          )}
          <div className="mt-10 text-center">
            <Link href={sections.books.moreHref} className="btn-secondary">
              {sections.books.moreLabel}
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </Link>
          </div>
        </PageContainer>
      </section>

      <TopicsSection />

      <section id="blogs" className="bg-gradient-to-b from-white to-violet-50/50 py-16">
        <PageContainer>
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-tag">Journal</span>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">{sections.blogs.title}</h2>
              <p className="mt-2 max-w-xl text-slate-600">{sections.blogs.description}</p>
            </div>
            <FilterSelect options={sections.blogs.filterOptions} />
          </div>
          {blogs.length > 0 ? (
            <div className={blogGrid}>
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  viewCount={browseLogs[blog.id] ?? 0}
                  author={usersProfile[blog.user]}
                  variant="home"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-fuchsia-200 bg-fuchsia-50/50 py-20 text-center">
              <p className="text-fuchsia-600">{sections.blogs.emptyText}</p>
            </div>
          )}
          <div className="mt-10 text-center">
            <Link href={sections.blogs.moreHref} className="btn-secondary">
              {sections.blogs.moreLabel}
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </Link>
          </div>
        </PageContainer>
      </section>

      <ResourcesSection />
    </main>
  );
}
