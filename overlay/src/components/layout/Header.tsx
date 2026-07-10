"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, Sparkles, X } from "lucide-react";
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
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-violet-100 bg-white/90 shadow-md shadow-violet-500/5 backdrop-blur-lg"
            : "border-b border-transparent bg-white/80 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="logo-title group">
            <CityUMark className="h-9 w-9 transition-transform group-hover:scale-105" />
            <span className="gradient-text hidden sm:inline">{site.logo.text}</span>
            <span className="gradient-text sm:hidden">CityUHK</span>
          </Link>

          <nav className="hidden space-x-1 md:flex">
            {navigation.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-violet-50 hover:text-violet-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href={navigation.creator.href} className="hidden creator-btn md:inline-flex">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              {navigation.creator.label}
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2.5 text-violet-600 transition-colors hover:bg-violet-50"
              aria-label="搜索"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full p-2.5 text-violet-600 hover:bg-violet-50 md:hidden"
              aria-label="菜单"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-violet-100 bg-white/95 backdrop-blur-lg md:hidden">
            <div className="space-y-1 px-3 py-3">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={navigation.creator.href}
                className="creator-btn mt-2 flex justify-center"
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
          className="fixed inset-0 z-50 flex items-start justify-center bg-violet-950/40 p-4 pt-24 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-violet-100 bg-white p-6 shadow-2xl shadow-violet-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-violet-900">{navigation.search.title}</h3>
              <button type="button" onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-violet-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-400" />
              <input
                type="search"
                placeholder={navigation.search.placeholder}
                className="w-full rounded-xl border border-violet-200 bg-violet-50/50 py-3 pl-11 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
              />
            </div>
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-violet-600">热门搜索</p>
              <div className="flex flex-wrap gap-2">
                {navigation.search.hotTags.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-pointer rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 px-3 py-1 text-xs font-medium text-violet-700 hover:from-violet-200 hover:to-fuchsia-200"
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
