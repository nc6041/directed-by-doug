import Link from "next/link";
import { siteConfig } from "@/content/site";

// Not in the Figma design (it only has footer links). Added so the site is
// navigable on every page, especially on phones.
export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="flex items-center justify-between px-gutter-sm py-5 md:px-gutter md:py-8">
        <Link href="/" className="font-label text-nav uppercase tracking-wide">
          {siteConfig.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex gap-5 md:gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-label text-nav uppercase tracking-wide transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
