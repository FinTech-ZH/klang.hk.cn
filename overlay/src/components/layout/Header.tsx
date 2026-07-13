"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import CityUMark from "@/components/ui/CityUMark";
import { navigation, site } from "@/theme";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full border-b bg-white transition-shadow ${
          scrolled ? "border-slate-200 shadow-sm" : "border-slate-200/80"
        }`}
      >
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="logo-title">
            <CityUMark className="h-8 w-8" />
            <span className="hidden sm:inline">{site.logo.text}</span>
            <span className="sm:hidden">CityUHK</span>
          </Link>

          <nav className="hidden gap-1 md:flex">
            {navigation.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-slate-600 transition-colors hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link href={navigation.creator.href} className="hidden creator-btn md:inline-flex">
              {navigation.creator.label}
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              aria-label="搜索"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 md:hidden"
              aria-label="菜单"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-100 bg-white md:hidden">
            <div className="space-y-0.5 px-3 py-2">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={navigation.creator.href}
                className="creator-btn mt-2 block text-center"
                onClick={() => setMobileOpen(false)}
              >
                {navigation.creator.label}
              </Link>
            </div>
          </div>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/30 p-4 pt-20"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">{navigation.search.title}</h3>
              <button type="button" onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder={navigation.search.placeholder}
                className="w-full rounded-md border border-slate-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-200"
              />
            </div>
            <div className="mt-3">
              <p className="mb-2 text-xs text-slate-500">常用关键词</p>
              <div className="flex flex-wrap gap-2">
                {navigation.search.hotTags.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-pointer rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
