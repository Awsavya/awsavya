"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers, Clock, Cpu } from "lucide-react";
import { deliveryTimelines, timelineDisclaimer } from "@/lib/site";

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
    desc: "Cross-platform React Native apps or installable PWAs with tactile interfaces.",
    stack: ["React Native", "Expo", "TypeScript", "Next.js"],
    deliverables: "Design system, responsive frontend, auth & API integration",
  },
  {
    id: "web",
    label: "Web Experiences",
    desc: "Performance-focused websites, editorial pages, and digital product flagships.",
    stack: ["Next.js 16", "React 19", "Vanilla CSS", "Motion", "Vercel"],
    deliverables: "Interactive pages, SEO hierarchy, accessible contrast",
  },
  {
    id: "software",
    label: "Custom Software",
    desc: "Internal dashboards, enterprise portals, database tools and operations systems.",
    stack: ["Node.js", "PostgreSQL", "Prisma ORM", "REST / GraphQL", "Docker"],
    deliverables: "Role-based access, data visualization, robust backend logic",
  },
  {
    id: "ai",
    label: "Applied AI",
    desc: "Domain assistants, document intelligence, semantic knowledge search and RAG prototypes.",
    stack: ["LangChain", "OpenAI / Claude API", "Vector Embeddings", "Python / Next"],
    deliverables: "Prompt engineering, citation-backed answers, fallback guardrails",
  },
  {
    id: "automation",
    label: "Automation & Ops",
    desc: "Automated event handoffs, cross-platform data syncs and workflow pipelines.",
    stack: ["Webhooks", "Node Microservices", "Zapier / Make", "Event Queues"],
    deliverables: "Error-monitored pipelines, webhook listeners, automated alerts",
  },
];

export default function InteractiveScopeBuilder() {
  const [selectedCatId, setSelectedCatId] = useState("app");
  const [selectedTimelineId, setSelectedTimelineId] = useState("mvp");

  const currentCat = categories.find((c) => c.id === selectedCatId) || categories[0];
  const currentTimeline = deliveryTimelines.find((t) => t.id === selectedTimelineId) || deliveryTimelines[1];

  const contactUrl = `/contact?service=${encodeURIComponent(currentCat.label)}&note=${encodeURIComponent(
    `${currentCat.label} · ${currentTimeline.label} (${currentTimeline.durationShort})`
  )}`;

  return (
    <div className="scope-builder-card">
      <div className="scope-builder-header">
        <div>
          <span className="eyebrow"><span className="eyebrow-dot" /> INDICATIVE SCOPE ESTIMATOR</span>
          <h3>Plan your next move.</h3>
          <p>Select a capability discipline and indicative sprint format to preview an architectural blueprint.</p>
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
            <span className="choice-group-label"><Clock size={13} /> 2. INDICATIVE TIMELINE</span>
            <div className="timeline-cards-row">
              {deliveryTimelines.map((tl) => {
                const isSelected = tl.id === selectedTimelineId;
                return (
                  <button
                    key={tl.id}
                    type="button"
                    className={`timeline-choice-card ${isSelected ? "is-active" : ""}`}
                    onClick={() => setSelectedTimelineId(tl.id)}
                  >
                    <span className="tl-title">{tl.label}</span>
                    <strong className="tl-duration">{tl.durationShort}</strong>
                    <small className="tl-note">{tl.summary}</small>
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
              <span className="blueprint-badge"><Sparkles size={11} /> INDICATIVE BLUEPRINT</span>
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

      <div className="scope-builder-footnote">
        <small>{timelineDisclaimer}</small>
      </div>
    </div>
  );
}
