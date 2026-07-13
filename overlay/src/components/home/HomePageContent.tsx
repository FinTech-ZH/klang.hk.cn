import Link from "next/link";
import { ArrowRight, BarChart3, Cpu } from "lucide-react";
import BookCard from "./BookCard";
import BlogCard from "./BlogCard";
import TopicsSection from "./TopicsSection";
import ResourcesSection from "./ResourcesSection";
import StudyOverview from "./StudyOverview";
import PageContainer from "@/components/layout/PageContainer";
import type { HomePageData } from "@/lib/esclient/server";
import { bookGrid, blogGrid } from "@/lib/layout";
import { home } from "@/theme";

interface HomePageContentProps {
  data: HomePageData;
}

const { hero, sections } = home;

const domainIcons = [BarChart3, Cpu] as const;

function FilterSelect({ options }: { options: readonly string[] }) {
  return (
    <select className="rounded-md border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-200">
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
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
          {backendError}
        </div>
      )}

      <section id="home" className="gradient-hero hero-grid relative border-b border-slate-200 py-14 md:py-20">
        <PageContainer>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="mb-4 inline-block border-l-4 border-accent-500 pl-3 text-sm font-medium text-brand-700">
                {hero.badge}
              </p>

              <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-4xl">
                {hero.title.before}
                <span className="text-accent-600">{hero.title.highlight}</span>
                {hero.title.after}
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600">
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

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {hero.domains.map((domain, i) => {
                  const Icon = domainIcons[i];
                  return (
                    <div
                      key={domain.label}
                      className="rounded-md border border-slate-200 bg-white px-4 py-3"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-brand-700">
                        <Icon className="h-4 w-4 text-accent-600" />
                        {domain.label}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{domain.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <StudyOverview />
          </div>
        </PageContainer>
      </section>

      <section id="books" className="py-14">
        <PageContainer>
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-tag">Course Notes</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{sections.books.title}</h2>
              <p className="mt-1 max-w-xl text-sm text-slate-600">{sections.books.description}</p>
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
            <div className="rounded-lg border border-dashed border-slate-300 bg-white py-16 text-center">
              <p className="text-sm text-slate-500">{sections.books.emptyText}</p>
            </div>
          )}
          <div className="mt-8 text-center">
            <Link href={sections.books.moreHref} className="btn-secondary">
              {sections.books.moreLabel}
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </Link>
          </div>
        </PageContainer>
      </section>

      <TopicsSection />

      <section id="blogs" className="border-t border-slate-200 bg-white py-14">
        <PageContainer>
          <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-tag">Journal</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{sections.blogs.title}</h2>
              <p className="mt-1 max-w-xl text-sm text-slate-600">{sections.blogs.description}</p>
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
            <div className="rounded-lg border border-dashed border-slate-300 py-16 text-center">
              <p className="text-sm text-slate-500">{sections.blogs.emptyText}</p>
            </div>
          )}
          <div className="mt-8 text-center">
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
