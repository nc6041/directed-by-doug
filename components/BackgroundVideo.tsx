"use client";

import { useEffect, useRef, useState } from "react";

// Short muted loop for hero/background use. Keep clips under ~5MB and host
// them on a CDN (see README). Visitors who prefer reduced motion get the
// poster image only.
export default function BackgroundVideo({ mp4, webm, poster }: { mp4: string; webm?: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduced) return null;

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
