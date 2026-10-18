"use client";

import Image from "next/image";
import { useState } from "react";
import { embedUrl, thumbnailFor, type VideoSource } from "@/lib/video";

// Shows the poster until the visitor presses play, so YouTube/Vimeo
// scripts don't load (or slow the page) until they're wanted.
export default function VideoEmbed({
  video,
  title,
  poster,
}: {
  video: VideoSource;
  title: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative mx-auto aspect-video w-full max-w-[calc((100svh-140px)*16/9)] overflow-hidden bg-black">
      {playing ? (
        <iframe
          src={embedUrl(video, true)}
          title={`${title} (video)`}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play ${title}`}
        >
          <Image
            src={thumbnailFor(video, poster)}
            alt=""
            fill
            priority
            sizes="(min-width: 1728px) 1638px, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/10" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent text-accent transition-transform group-hover:scale-110 md:h-24 md:w-24">
            <svg width="28" height="32" viewBox="0 0 28 32" aria-hidden>
              <path d="M2 2l24 14L2 30z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
