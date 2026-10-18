import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/contact", ...projects.map((p) => `/work/${p.slug}`)];
  return pages.map((path) => ({ url: `${siteConfig.url}${path}` }));
}
