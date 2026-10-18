import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-gutter-sm flex min-h-[70svh] flex-col items-center justify-center pt-28 text-center md:mx-gutter">
      <p className="font-label text-kicker leading-none">404</p>
      <h1 className="mt-4 font-script text-[28px] leading-[1.8] text-accent md:text-name">Lost the shot</h1>
      <p className="mt-4 text-white/80">That page doesn&apos;t exist.</p>
      <Link href="/" className="mt-8 font-label text-nav uppercase underline-offset-4 hover:text-accent hover:underline">
        Back home
      </Link>
    </div>
  );
}
