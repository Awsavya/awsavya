"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import ProjectVisual from "@/components/ProjectVisual";
import { projects } from "@/lib/site";

interface StudyDetail {
  architecturePattern: string;
  interfaceParadigm: string;
  problemHypothesis: string;
  architecturalDecisions: string[];
  techStack: string[];
  takeaway: string;
}

const studyDetails: Record<string, StudyDetail> = {
  "lumen-finance": {
    architecturePattern: "Client-Side Reactive Telemetry & Timeframe Bucketing",
    interfaceParadigm: "High-density data visualization with low visual noise",
    problemHypothesis:
      "Most financial dashboards overwhelm users with excessive tabular data and chaotic color coding. This concept explores how progressive disclosure and calm typographic hierarchy reduce cognitive fatigue.",
    architecturalDecisions: [
      "Optimistic client state caching for snappy timeframe switching without layout thrashing",
      "Accessible SVG-based data curves calibrated for high contrast and legible data density",
      "Hierarchical spending category aggregation computed on lightweight client workers",
    ],
    techStack: ["Next.js App Router", "TypeScript", "SVG Data Graphs", "Tailored CSS", "Motion"],
    takeaway:
      "Financial clarity comes from intentional data distillation, not more graphs.",
  },
  "relay-ai": {
    architecturePattern: "Context-Aware Vector Ingestion & Citation Provenance",
    interfaceParadigm: "Streaming conversational assistant with source-first grounding",
    problemHypothesis:
      "Enterprise AI tools often act as black boxes where users cannot verify answers. Relay AI demonstrates how strict source attribution and cited document snippets build immediate institutional trust.",
    architecturalDecisions: [
      "Bi-directional citation links pairing generated answers with source document references",
      "Streamed token chunking and optimistic UI state for responsive real-time feedback",
      "Scoped contextual filters allowing users to restrict retrieval to verified department docs",
    ],
    techStack: ["React 19", "Vector Embeddings", "Streaming Tokens", "TypeScript", "FastAPI"],
    takeaway:
      "AI adoption hinges on verifiability. Every generated answer must link to its source.",
  },
  "flowline-ops": {
    architecturePattern: "Idempotent Event Dispatch & Multi-Node Pipeline Sync",
    interfaceParadigm: "Real-time operations status board with active exception alarms",
    problemHypothesis:
      "Operations teams lose hours hunting for task statuses across isolated tools. Flowline centralizes event triggers, syncs data between platforms, and alerts operators only when an intervention is needed.",
    architecturalDecisions: [
      "Event-driven webhook queue architecture with automated retries and dead-letter monitoring",
      "Visual pipeline status nodes updating via real-time WebSocket state synchronizer",
      "Strict data sanitization and audit logging for every cross-platform handoff",
    ],
    techStack: ["Node.js Microservices", "WebSockets", "Event Queues", "TypeScript", "PostgreSQL"],
    takeaway:
      "Great operations software runs quietly until an exception demands human attention.",
  },
};

export default function WorkShowcase() {
  const [activeSlug, setActiveSlug] = useState<string>("lumen-finance");

  const activeProject = projects.find((p) => p.slug === activeSlug) || projects[0];
  const activeDetail = studyDetails[activeSlug] || studyDetails["lumen-finance"];

  return (
    <div className="work-showcase-container">
      {/* Concept Switcher Tabs */}
      <div className="work-concept-tabs" role="tablist" aria-label="Select concept study">
        {projects.map((proj) => {
          const isSelected = proj.slug === activeSlug;
          return (
            <button
              key={proj.slug}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`work-concept-tab ${isSelected ? "is-active" : ""}`}
              onClick={() => setActiveSlug(proj.slug)}
            >
              <div className="tab-lead-meta">
                <span className="tab-study-badge">CONCEPT STUDY</span>
                <span className="tab-study-num">{proj.number} / 03</span>
              </div>
              <strong className="tab-study-name">{proj.name}</strong>
              <span className="tab-study-cat">{proj.category}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="work-stage-card" role="tabpanel" id={activeProject.slug}>
        <div className="work-stage-grid">
          {/* Left Column: Interactive Visual & Architecture Spec */}
          <div className="work-stage-preview-column">
            <div className="work-preview-wrap">
              <div className="preview-top-status">
                <span className="preview-status-pill">
                  <span className="pulse-dot-mini" /> INTERACTIVE CONCEPT PROTOTYPE
                </span>
                <span className="preview-indicator-meta">SAMPLE DATA</span>
              </div>

              {/* Renders Interactive Visual Mockup */}
              <div className={`preview-inner-canvas project-preview-${activeProject.visual}`}>
                <ProjectVisual variant={activeProject.visual} />
              </div>

              <div className="preview-hint-bar">
                <Sparkles size={13} className="text-blue" />
                <span>Interact with sample controls, toggles, and filters above</span>
              </div>
            </div>

            {/* Architecture Spec Box */}
            <div className="work-spec-box">
              <div className="spec-item">
                <span className="spec-label">
                  <Layers size={13} className="text-blue" /> ARCHITECTURE PATTERN
                </span>
                <p className="spec-value">{activeDetail.architecturePattern}</p>
              </div>

              <div className="spec-item">
                <span className="spec-label">
                  <Code2 size={13} className="text-blue" /> RECOMMENDED TECH STACK
                </span>
                <div className="spec-tech-pills">
                  {activeDetail.techStack.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="spec-item">
                <span className="spec-label">
                  <ShieldCheck size={13} className="text-blue" /> ACCESSIBILITY &amp; STANDARDS
                </span>
                <p className="spec-value-small">
                  Accessible high-contrast typography, stable layout structures, and full keyboard navigation support.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Case Deep Dive */}
          <div className="work-stage-copy-column">
            <div className="stage-copy-header">
              <div className="stage-topline-pills">
                <span className="stage-badge">CONCEPT STUDY {activeProject.number}</span>
                <span className="stage-category-label">{activeProject.category}</span>
              </div>
              <h2 className="stage-main-title">
                {activeProject.name}
                <span>.</span>
              </h2>
              <p className="stage-lead-desc">{activeProject.description}</p>
            </div>

            <div className="stage-narrative-block">
              <span className="narrative-label">THE PROBLEM WE EXPLORED</span>
              <p className="narrative-body">{activeDetail.problemHypothesis}</p>
            </div>

            <div className="stage-narrative-block">
              <span className="narrative-label">ARCHITECTURAL DECISIONS</span>
              <ul className="stage-decisions-list">
                {activeDetail.architecturalDecisions.map((decision) => (
                  <li key={decision}>
                    <CheckCircle2 size={15} className="text-blue" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="stage-takeaway-card">
              <span className="takeaway-badge">KEY TAKEAWAY</span>
              <p>{activeDetail.takeaway}</p>
            </div>

            <div className="stage-actions-row">
              <Link
                href={`/contact?service=${encodeURIComponent(activeProject.name)}`}
                className="button button-dark"
              >
                Discuss a project like this <ArrowUpRight size={15} />
              </Link>
              <Link href="/services" className="button button-ghost">
                View all capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Pillars / Quality Benchmark */}
      <div className="work-pillars-section">
        <div className="pillars-header">
          <span className="eyebrow"><span className="eyebrow-dot" /> HOW WE EVALUATE EVERY BUILD</span>
          <h3>Engineered with architectural discipline.</h3>
          <p>Whether building an MVP or a mission-critical platform, we hold our code to four consistent standards.</p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Zap size={20} className="text-blue" />
            </div>
            <h4>Performance-Minded Builds</h4>
            <p>
              Lean bundle sizes, responsive image delivery, server-rendered components, and snappy client interactions.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Code2 size={20} className="text-blue" />
            </div>
            <h4>End-to-End Type Safety</h4>
            <p>
              Strict TypeScript from database schemas to client components, catching regressions at compile time.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <ShieldCheck size={20} className="text-blue" />
            </div>
            <h4>Ergonomics &amp; Accessibility</h4>
            <p>
              Targeting WCAG 2.2 AA standards, touch-friendly 44px+ hit targets, clear keyboard focus indicators, and reduced-motion care.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <Cpu size={20} className="text-blue" />
            </div>
            <h4>Full Code Handover</h4>
            <p>
              Clean repository structure, comprehensive documentation, and complete ownership of custom project deliverables governed by the client agreement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
