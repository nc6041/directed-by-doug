import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import VideoEmbed from "@/components/VideoEmbed";
import { getProject, projects } from "@/content/projects";
import { parseVideoUrl, thumbnailFor } from "@/lib/video";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const description =
    project.logline ?? `${project.title} (${project.year}), ${project.role.toLowerCase()} Doug Truong.`;
  const image = thumbnailFor(parseVideoUrl(project.videoUrl), project.thumbnail);
  return {
    title: project.title,
    description,
    openGraph: { title: project.title, description, images: [image] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const video = parseVideoUrl(project.videoUrl);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Year", value: String(project.year) },
    { label: "Role", value: project.role },
    project.client && { label: "Client", value: project.client },
    project.runtime && { label: "Runtime", value: project.runtime },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article className="mx-gutter-sm pt-28 md:mx-gutter md:pt-40">
      <Link href="/work" className="font-label text-nav uppercase text-white/70 transition-colors hover:text-accent">
        ← All work
      </Link>
      <h1 className="script-words mt-6 font-script text-[36px] leading-[1.6] text-accent md:text-[64px]">
        {project.title}
      </h1>

      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="font-label text-nav uppercase text-white/60">{m.label}</dt>
            <dd className="mt-1 text-base">{m.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        {video ? (
          <VideoEmbed video={video} title={project.title} poster={project.thumbnail} />
        ) : (
          <p className="text-white/80">Video coming soon.</p>
        )}
      </div>

      {project.description && (
        <div className="mt-12 max-w-3xl space-y-5 text-lg leading-relaxed text-white/80">
          {project.description.split(/\n\s*\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {project.stills && project.stills.length > 0 && (
        <section aria-labelledby="stills-heading" className="mt-16">
          <h2 id="stills-heading" className="font-label text-kicker leading-none">
            Stills
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-grid-x md:grid-cols-2">
            {project.stills.map((still) => (
              <li key={still.src} className="relative aspect-video overflow-hidden bg-neutral-900">
                <Image src={still.src} alt={still.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {next !== project && (
        <nav aria-label="Next project" className="mt-24 border-t border-white/25 pt-8">
          <p className="font-label text-nav uppercase text-white/60">Next project</p>
          <Link
            href={`/work/${next.slug}`}
            className="script-words mt-2 inline-block font-script text-[28px] leading-[1.8] text-accent transition-opacity hover:opacity-80 md:text-name"
          >
            {next.title} →
          </Link>
        </nav>
      )}
    </article>
  );
}
