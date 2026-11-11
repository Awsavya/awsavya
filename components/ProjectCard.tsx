import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { projects } from "@/lib/site";
import ProjectVisual from "@/components/ProjectVisual";

type Project = (typeof projects)[number];

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <Link
        href={`/work#${project.slug}`}
        className={`project-preview project-preview-${project.visual}`}
        aria-label={`View ${project.name} project`}
      >
        <ProjectVisual variant={project.visual} compact />
        <span className="project-preview-open">
          <ArrowUpRight size={17} />
        </span>
        <span className="project-interactive-badge">
          <Sparkles size={11} /> Interactive preview
        </span>
      </Link>
      <div className="project-info">
        <div className="project-info-main">
          <span className="project-category">{project.category}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
        <span className="project-type">{project.type}</span>
      </div>
    </article>
  );
}
