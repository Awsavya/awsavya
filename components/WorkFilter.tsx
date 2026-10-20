"use client";

import { useState } from "react";
import ProjectVisual from "@/components/ProjectVisual";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { projects } from "@/lib/site";

type Project = (typeof projects)[number];

interface WorkFilterProps {
  projects: Project[];
}

export default function WorkFilter({ projects }: WorkFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All studies", count: projects.length },
    { id: "lumen", label: "Fintech & Data", count: 1 },
    { id: "relay", label: "Applied AI", count: 1 },
    { id: "flowline", label: "Operations & Ops", count: 1 },
  ];

  const filteredProjects = selectedFilter === "all"
    ? projects
    : projects.filter((p) => p.visual === selectedFilter);

  return (
    <div className="work-interactive-section">
      {/* Category Filter Pills */}
      <div className="work-filter-bar" role="tablist" aria-label="Filter concept studies">
        {categories.map((cat) => {
          const isActive = selectedFilter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`work-filter-pill ${isActive ? "is-active" : ""}`}
              onClick={() => setSelectedFilter(cat.id)}
            >
              <span>{cat.label}</span>
              <small className="pill-count">{cat.count}</small>
            </button>
          );
        })}
      </div>

      <div className="work-list">
        {filteredProjects.map((project) => (
          <article className="work-detail" id={project.slug} key={project.slug}>
            <div className={`work-detail-visual project-preview-${project.visual}`}>
              <ProjectVisual variant={project.visual} />
              <div className="interactive-canvas-hint">
                <Sparkles size={12} /> Live interactive mockup — Click options above to test
              </div>
            </div>
            <div className="work-detail-copy">
              <div className="work-detail-topline">
                <span className="project-type">{project.type}</span>
                <span className="work-index">{project.number} / 03</span>
              </div>
              <span className="project-category">{project.category}</span>
              <h2>{project.name}<span>.</span></h2>
              <p className="work-detail-lead">{project.description}</p>
              <p>{project.outcome}</p>
              <div className="work-tags">
                {project.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <Link href={`/contact?service=${encodeURIComponent(project.name)}`} className="text-link">
                Build something like this <ArrowUpRight size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
