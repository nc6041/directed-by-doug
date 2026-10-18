import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-gutter-sm mt-[120px] flex flex-col gap-4 pb-12 md:mx-gutter md:mt-[151px] md:pb-[79px]">
      <p className="font-label text-nav leading-[48px]">Directed by</p>
      <p className="font-script text-[28px] leading-[48px] text-accent md:text-name md:leading-[48px]">
        {siteConfig.name}
      </p>
      <p className="max-w-[1185px] text-sm leading-[22px] text-white/80">{siteConfig.footerBlurb}</p>

      <hr className="border-0 border-t border-white/25" />

      <div className="flex flex-col gap-6 md:grid md:min-h-8 md:grid-cols-3 md:items-center">
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
