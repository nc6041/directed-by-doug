import { projects } from "@/content/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ priorityCount = 0 }: { priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-grid-x md:gap-y-grid-y">
      {projects.map((project, i) => (
        <li key={project.slug}>
          <ProjectCard project={project} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
