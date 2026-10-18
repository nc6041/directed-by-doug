// All project data lives here. Add a new object to `projects` to add a film;
// its page is generated at /work/<slug>. Order here = order on the site.

export type Project = {
  /** URL segment: lowercase, hyphens, unique. */
  slug: string;
  title: string;
  year: number;
  role: string;
  client?: string;
  /** One line shown under the title in the grid. Falls back to year and role. */
  logline?: string;
  /** Longer text for the project page. Separate paragraphs with a blank line. */
  description?: string;
  runtime?: string;
  /** YouTube or Vimeo link. Any normal watch/share URL works. */
  videoUrl: string;
  /**
   * Grid thumbnail. Optional for YouTube (the video's own thumbnail is used),
   * required for Vimeo. Use a path in /public (e.g. "/images/my-film.jpg") or a URL.
   */
  thumbnail?: string;
  /** Second the hover preview starts at (YouTube/Vimeo). Default 20. */
  previewStart?: number;
  /**
   * Optional self-hosted hover preview (short, muted, ~5-10s, under ~3MB).
   * Smoother than the YouTube preview. Host it on a CDN, not in this repo.
   */
  previewClip?: { mp4: string; webm?: string };
  /** Production stills shown on the project page. */
  stills?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "what-about-next-spring",
    title: "What About Next Spring",
    year: 2025,
    role: "Director",
    runtime: "3:40",
    videoUrl: "https://www.youtube.com/watch?v=HoK85DDgvWI",
  },
  {
    slug: "coffee-break",
    title: "Coffee Break!",
    year: 2026,
    role: "Director",
    runtime: "2:16",
    videoUrl: "https://youtu.be/Z5pxJ-N8keM",
  },
  {
    slug: "an-unexpected-gift",
    title: "An Unexpected Gift",
    year: 2026,
    role: "Director",
    client: "LMU School of Film and Television",
    runtime: "2:22",
    videoUrl: "https://youtu.be/KE1e7i5mEH4",
  },
  {
    slug: "mount-rainier-2026",
    title: "Mount Rainier 2026",
    year: 2026,
    role: "Director",
    runtime: "2:38",
    videoUrl: "https://youtu.be/VOuQttoqhYg",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
