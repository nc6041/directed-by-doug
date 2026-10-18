import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: siteConfig.description,
};

// Edit the bio and facts here.
const bio = [
  "Doug Truong is a director based in Los Angeles. He is currently an MFA candidate in Film and Television Production at Loyola Marymount University's School of Film and Television.",
  "Before film school, Doug worked at Amdocs.",
];

const facts = [
  { label: "Based in", value: "Los Angeles, CA" },
  { label: "Education", value: "MFA, Film & Television Production, LMU (in progress)" },
  { label: "Previously", value: "Amdocs" },
];

export default function AboutPage() {
  return (
    <div className="mx-gutter-sm pt-28 md:mx-gutter md:pt-40">
      <div className="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-grid-x">
        <h1>
          <span className="block font-label text-[32px] leading-none md:text-kicker">About</span>
          <span className="mt-2 block font-script text-[48px] leading-[1.5] text-accent md:text-[80px]">Doug</span>
        </h1>

        <div className="max-w-3xl">
          <div className="space-y-6 text-lg leading-relaxed text-white/80 md:text-2xl md:leading-relaxed">
            {bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <dl className="mt-12 divide-y divide-white/25 border-y border-white/25">
            {facts.map((f) => (
              <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="font-label text-nav uppercase text-white/60">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 font-label text-nav uppercase">
            <Link href="/work" className="hover:text-accent">
              See the work →
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Get in touch →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
