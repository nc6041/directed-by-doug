export type VideoSource =
  | { provider: "youtube"; id: string }
  | { provider: "vimeo"; id: string };

export function parseVideoUrl(url: string): VideoSource | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^(www|m)\./, "");
    if (host === "youtu.be") return { provider: "youtube", id: u.pathname.slice(1) };
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = u.searchParams.get("v");
      if (v) return { provider: "youtube", id: v };
      const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/);
      if (m) return { provider: "youtube", id: m[1] };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const m = u.pathname.match(/(\d+)/);
      if (m) return { provider: "vimeo", id: m[1] };
    }
  } catch {
    // not a valid URL
  }
  return null;
}

export function thumbnailFor(src: VideoSource | null, override?: string) {
  if (override) return override;
  if (src?.provider === "youtube") return `https://i.ytimg.com/vi/${src.id}/maxresdefault.jpg`;
  return "/images/hero.jpg";
}

/** Full player for project pages. */
export function embedUrl(src: VideoSource, autoplay = false) {
  if (src.provider === "youtube") {
    const p = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1" });
    if (autoplay) p.set("autoplay", "1");
    return `https://www.youtube-nocookie.com/embed/${src.id}?${p}`;
  }
  const p = new URLSearchParams({ dnt: "1", title: "0", byline: "0", portrait: "0" });
  if (autoplay) p.set("autoplay", "1");
  return `https://player.vimeo.com/video/${src.id}?${p}`;
}

/** Silent, chromeless, looping player for grid hover previews. */
export function previewUrl(src: VideoSource, start = 20) {
  if (src.provider === "youtube") {
    const p = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      controls: "0",
      start: String(start),
      loop: "1",
      playlist: src.id,
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
      disablekb: "1",
      iv_load_policy: "3",
      fs: "0",
    });
    return `https://www.youtube-nocookie.com/embed/${src.id}?${p}`;
  }
  const p = new URLSearchParams({ background: "1", muted: "1", autoplay: "1", loop: "1", dnt: "1" });
  return `https://player.vimeo.com/video/${src.id}?${p}#t=${start}s`;
}
