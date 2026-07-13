import Link from "next/link";
import CityUMark from "@/components/ui/CityUMark";
import { footer, site } from "@/theme";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-brand-700 pt-14 pb-8 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <CityUMark className="h-9 w-9" />
              <span className="text-lg font-semibold">
                {site.logo.footer.prefix}
                <span className="text-accent-400"> {site.logo.footer.highlight}</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-300">{footer.description}</p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {footer.nav.title}
            </h4>
            <ul className="space-y-2">
              {footer.nav.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {footer.techAreas.title}
            </h4>
            <ul className="space-y-2">
              {footer.techAreas.items.map((item) => (
                <li key={item} className="text-sm text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {footer.contact.title}
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {footer.contact.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li className="text-accent-400">{site.domain}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-600 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-sm text-slate-400">
              © 2025 – {year} {site.copyright}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
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
