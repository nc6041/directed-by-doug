"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import type { Project } from "@/content/projects";
import { parseVideoUrl, previewUrl, thumbnailFor } from "@/lib/video";

const HOVER_DELAY_MS = 250; // avoid loading players when the cursor just passes over
const FADE_IN_DELAY_MS = 600; // let the player start before revealing it

function canPreview() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const video = parseVideoUrl(project.videoUrl);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function start() {
    if (!canPreview()) return;
    if (video?.provider === "youtube") preconnect("https://www.youtube-nocookie.com");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(true), HOVER_DELAY_MS);
  }

  function stop() {
    clearTimeout(timer.current);
    setActive(false);
    setVisible(false);
  }

  function reveal() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(true), FADE_IN_DELAY_MS);
  }

  const subline = project.logline ?? `${project.year} · ${project.role}`;

  return (
    <article>
      <Link
        href={`/work/${project.slug}`}
        className="group block"
        onPointerEnter={start}
        onPointerLeave={stop}
        onFocus={start}
        onBlur={stop}
      >
        <div className="relative aspect-card overflow-hidden bg-neutral-900">
          <Image
            src={thumbnailFor(video, project.thumbnail)}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {active && (
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              {project.previewClip ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  onPlaying={() => setVisible(true)}
                  className="h-full w-full object-cover"
                >
                  {project.previewClip.webm && <source src={project.previewClip.webm} type="video/webm" />}
                  <source src={project.previewClip.mp4} type="video/mp4" />
                </video>
              ) : (
                video && (
                  // Oversized so the 16:9 player covers the card and YouTube's
                  // title bar is cropped off the top.
                  <iframe
                    src={previewUrl(video, project.previewStart)}
                    title=""
                    tabIndex={-1}
                    allow="autoplay; encrypted-media"
                    onLoad={reveal}
                    className="absolute left-1/2 top-1/2 aspect-video w-[136%] -translate-x-1/2 -translate-y-1/2 border-0"
                  />
                )
              )}
            </div>
          )}
        </div>

        <h3 className="script-words mt-card-gap font-script text-[20px] leading-[2.15] text-accent md:text-card">
          {project.title}
        </h3>
        <p className="mt-2 text-lg leading-none md:mt-card-gap md:text-[24px] md:leading-none">{subline}</p>
      </Link>
    </article>
  );
}
