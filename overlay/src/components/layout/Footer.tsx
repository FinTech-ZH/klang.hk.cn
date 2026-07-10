import Link from "next/link";
import CityUMark from "@/components/ui/CityUMark";
import { footer, site } from "@/theme";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950 pt-16 pb-8 text-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <CityUMark className="h-10 w-10" />
              <span className="text-xl font-bold">
                {site.logo.footer.prefix}
                <span className="bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent">
                  {" "}
                  {site.logo.footer.highlight}
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-violet-200">{footer.description}</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-violet-300">
              {footer.nav.title}
            </h4>
            <ul className="space-y-2">
              {footer.nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-violet-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-violet-300">
              {footer.techAreas.title}
            </h4>
            <ul className="space-y-2">
              {footer.techAreas.items.map((item) => (
                <li key={item} className="text-sm text-violet-200">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-violet-300">
              {footer.contact.title}
            </h4>
            <ul className="space-y-2 text-sm text-violet-200">
              {footer.contact.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li className="text-amber-300">{site.domain}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-violet-300">
              © 2025 – {year} {site.copyright}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-violet-400">
              {footer.legal.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
