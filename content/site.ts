// Site-wide settings. Swap `url` for the real domain once it's connected.
export const siteConfig = {
  url: "https://example.com",
  name: "Doug Truong",
  title: "Doug Truong | Director",
  description:
    "Doug Truong is a Los Angeles-based director and MFA Film & Television Production student at Loyola Marymount University.",
  location: "Los Angeles, CA",
  // TODO: replace with Doug's real email
  email: "hello@example.com",
  // Add social profiles here, e.g. { label: "Instagram", href: "https://instagram.com/..." }.
  // Nothing is shown while this list is empty.
  socials: [] as { label: string; href: string }[],
  // Optional looping hero clip (muted, ~5-15s, H.264 MP4 + WebM, under ~5MB).
  // Host the files on a CDN and paste the URLs here; the hero photo stays as the poster.
  heroVideo: null as { mp4: string; webm?: string } | null,
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerBlurb:
    "Director based in Los Angeles, currently in the MFA Film & Television Production program at LMU.",
};
