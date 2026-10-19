"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles, Layers, Clock, Cpu } from "lucide-react";

interface CategoryOption {
  id: string;
  label: string;
  desc: string;
  stack: string[];
  deliverables: string;
}

const categories: CategoryOption[] = [
  {
    id: "app",
    label: "Apps & Mobile",
    desc: "Cross-platform iOS, Android or responsive web apps with tactile interfaces.",
    stack: ["React Native", "Next.js", "TypeScript", "Tailwind CSS"],
    deliverables: "Design system, responsive frontend, auth & API integration",
  },
  {
    id: "web",
    label: "Web Experiences",
    desc: "High-performance marketing platforms, editorial pages, and digital flagship sites.",
    stack: ["Next.js 16", "React 19", "Vanilla CSS", "Motion", "Vercel"],
    deliverables: "Interactive pages, SEO hierarchy, sub-second load times",
  },
  {
    id: "software",
    label: "Custom Software",
    desc: "Internal dashboards, enterprise portals, database tools and business systems.",
    stack: ["Node.js", "PostgreSQL", "Prisma", "REST / GraphQL", "Docker"],
    deliverables: "Role-based access, data visualization, robust backend logic",
  },
  {
    id: "ai",
    label: "Applied AI",
    desc: "Domain assistants, document intelligence, semantic knowledge search and LLM agents.",
    stack: ["LangChain", "OpenAI / Claude API", "Vector Embeddings", "Python / Next"],
    deliverables: "Prompt engineering, citation-backed answers, fallback safety",
  },
  {
    id: "automation",
    label: "Automation & Ops",
    desc: "Automated handoffs, cross-platform data syncs and workflow pipeline elimination.",
    stack: ["Webhooks", "Node Microservices", "Zapier / Make", "Airflow"],
    deliverables: "Error-monitored pipelines, webhook listeners, zero-touch sync",
  },
];

const timelineOptions = [
  { id: "mvp", label: "Focused MVP", duration: "3 – 5 weeks", note: "Targeted release of core features" },
  { id: "full", label: "Full Product", duration: "8 – 12 weeks", note: "End-to-end architecture & polish" },
  { id: "partner", label: "Continuous Sprints", duration: "Flexible", note: "Ongoing engineering partnership" },
];

export default function InteractiveScopeBuilder() {
  const [selectedCatId, setSelectedCatId] = useState("app");
  const [selectedTimelineId, setSelectedTimelineId] = useState("mvp");

  const currentCat = categories.find((c) => c.id === selectedCatId) || categories[0];
  const currentTimeline = timelineOptions.find((t) => t.id === selectedTimelineId) || timelineOptions[0];

  const contactUrl = `/contact?service=${encodeURIComponent(currentCat.label)}&note=${encodeURIComponent(
    `${currentCat.label} · ${currentTimeline.duration}`
  )}`;

  return (
    <div className="scope-builder-card">
      <div className="scope-builder-header">
        <div>
          <span className="eyebrow"><span className="eyebrow-dot" /> INTERACTIVE SCOPE ESTIMATOR</span>
          <h3>Plan your next move.</h3>
          <p>Select your product category and desired pace to see an architectural blueprint.</p>
        </div>
      </div>

      <div className="scope-builder-grid">
        {/* Left: Interactive choices */}
        <div className="scope-choices-column">
          <div className="scope-choice-group">
            <span className="choice-group-label"><Layers size={13} /> 1. CHOOSE CAPABILITY</span>
            <div className="choice-pills-row" role="radiogroup" aria-label="Capability selection">
              {categories.map((cat) => {
                const isSelected = cat.id === selectedCatId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`scope-pill-btn ${isSelected ? "is-active" : ""}`}
                    onClick={() => setSelectedCatId(cat.id)}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="scope-choice-group">
            <span className="choice-group-label"><Clock size={13} /> 2. TARGET TIMELINE</span>
            <div className="timeline-cards-row">
              {timelineOptions.map((tl) => {
                const isSelected = tl.id === selectedTimelineId;
                return (
                  <button
                    key={tl.id}
                    type="button"
                    className={`timeline-choice-card ${isSelected ? "is-active" : ""}`}
                    onClick={() => setSelectedTimelineId(tl.id)}
                  >
                    <span className="tl-title">{tl.label}</span>
                    <strong className="tl-duration">{tl.duration}</strong>
                    <small className="tl-note">{tl.note}</small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Dynamic Blueprint Preview */}
        <div className="scope-blueprint-column">
          <div className="blueprint-box">
            <div className="blueprint-top">
              <span className="blueprint-badge"><Sparkles size={11} /> ESTIMATED BLUEPRINT</span>
              <span className="blueprint-tag">{currentTimeline.duration}</span>
            </div>

            <h4 className="blueprint-title">{currentCat.label}</h4>
            <p className="blueprint-desc">{currentCat.desc}</p>

            <div className="blueprint-meta-item">
              <span className="blueprint-label">CORE DELIVERABLES</span>
              <p className="blueprint-deliverables">{currentCat.deliverables}</p>
            </div>

            <div className="blueprint-meta-item">
              <span className="blueprint-label"><Cpu size={12} /> RECOMMENDED STACK</span>
              <div className="blueprint-tech-stack">
                {currentCat.stack.map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>

            <div className="blueprint-action">
              <Link href={contactUrl} className="button button-dark full-width">
                Discuss this blueprint <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
