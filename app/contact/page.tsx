import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}, director based in Los Angeles.`,
};

export default function ContactPage() {
  return (
    <div className="mx-gutter-sm pt-28 md:mx-gutter md:pt-40">
      <h1>
        <span className="block font-label text-[32px] leading-none md:text-kicker">Contact</span>
        <span className="script-words mt-2 block font-script text-[36px] leading-[1.6] text-accent md:text-[72px]">
          Let&apos;s make something
        </span>
      </h1>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-grid-x">
        <div>
          <p className="font-label text-nav uppercase text-white/60">Email</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 inline-block break-all text-2xl underline decoration-white/25 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent md:text-4xl"
          >
            {siteConfig.email}
          </a>
        </div>
        <div>
          <p className="font-label text-nav uppercase text-white/60">Based in</p>
          <p className="mt-2 text-2xl md:text-4xl">{siteConfig.location}</p>
        </div>
        {siteConfig.socials.length > 0 && (
          <div>
            <p className="font-label text-nav uppercase text-white/60">Elsewhere</p>
            <ul className="mt-2 space-y-2 text-2xl">
              {siteConfig.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
