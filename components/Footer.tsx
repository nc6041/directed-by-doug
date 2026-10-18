import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-gutter-sm mt-[151px] pb-[79px] md:mx-gutter">
      <p className="font-label text-nav leading-[56px]">Directed by</p>
      <p className="mt-2 font-script text-[28px] leading-[56px] text-accent md:mt-4 md:text-name">
        {siteConfig.name}
      </p>
      <p className="mt-4 max-w-[1185px] text-sm leading-[22px] text-white/80">{siteConfig.footerBlurb}</p>

      <hr className="mt-4 border-0 border-t border-white/25" />

      <div className="mt-4 flex flex-col gap-6 md:grid md:grid-cols-3 md:items-center">
        <nav aria-label="Footer">
          <ul className="flex gap-4">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-label text-nav uppercase transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm md:text-center">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        {siteConfig.socials.length > 0 && (
          <ul className="flex gap-4 md:justify-end">
            {siteConfig.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center rounded-full border border-white/25 px-4 font-label text-nav uppercase transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
