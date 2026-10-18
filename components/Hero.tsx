import Image from "next/image";
import heroImage from "@/public/images/hero.jpg";
import { siteConfig } from "@/content/site";
import BackgroundVideo from "./BackgroundVideo";

// Desktop frame is 1728x1117. Title block top at 240px (21.5%),
// arrow from 736px to 808px (66-72%).
export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative h-svh min-h-[560px] overflow-hidden">
      <Image
        src={heroImage}
        alt="Pink bougainvillea against a pale blue sky, framed by a dark window"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        // Higher than the default 75 so the film grain survives compression
        quality={90}
        className="object-cover object-[50%_30%]"
      />
      {siteConfig.heroVideo && (
        <BackgroundVideo mp4={siteConfig.heroVideo.mp4} webm={siteConfig.heroVideo.webm} poster={heroImage.src} />
      )}
      <div aria-hidden className="absolute inset-0 bg-black opacity-overlay" />

      <div className="absolute inset-x-0 top-[21.5%] flex flex-col items-center gap-2 px-gutter-sm text-center">
        <h1 id="hero-title">
          <span className="block font-label text-[32px] leading-none md:text-kicker md:leading-[58px]">Directed by</span>
          <span className="mt-2 block font-script text-hero-sm text-accent md:text-hero">Doug</span>
        </h1>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        className="absolute left-1/2 top-[calc(66%-8px)] -translate-x-1/2 p-2 text-accent transition-transform hover:translate-y-1"
      >
        <svg width="34" height="72" viewBox="0 0 34 72" fill="none" aria-hidden>
          <path d="M17 0v68" stroke="currentColor" strokeWidth="2" />
          <path d="M1 54l16 16 16-16" stroke="currentColor" strokeWidth="2" />
        </svg>
      </a>
    </section>
  );
}
