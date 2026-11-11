"use client";

import { useEffect, useState } from "react";
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

interface ProjectDetail {
  architecturePattern: string;
  interfaceParadigm: string;
  problemHypothesis: string;
  architecturalDecisions: string[];
  techStack: string[];
  takeaway: string;
}

const projectDetails: Record<string, ProjectDetail> = {
  tripsplit: {
    architecturePattern: "Offline-First Room Caching & Graph-Based Debt Minimization",
    interfaceParadigm: "Ergonomic Android Jetpack Compose with Zero-Friction App Links",
    problemHypothesis:
      "Most group expense apps force participants through tedious account registration and break without cellular coverage. TripSplit uses frictionless deep-link claiming, offline Room SQLite persistence, and bidirectional Firestore sync.",
    architecturalDecisions: [
      "Dynamic Android App Links allowing instant expedition join without mandatory credentials",
      "First-claim cryptographic link burning in Firestore to prevent invite interception",
      "Graph-theoretic settlement algorithm reducing n-way debts into the absolute minimum transactions",
      "Local Room database cache ensuring 100% offline creation, calculation, and balance viewing",
    ],
    techStack: ["Kotlin 2.0", "Jetpack Compose (M3)", "Room Database (SQLite)", "Firebase Firestore", "Coroutines"],
    takeaway:
      "Consumer utility apps win on friction elimination: zero-signup joining and zero-latency offline operation.",
  },
  build2buzz: {
    architecturePattern: "Evidence-Isolated LLM Ingestion & Headless Browser Telemetry",
    interfaceParadigm: "Human-in-the-loop publisher with verifiable citation attribution",
    problemHypothesis:
      "Commercial AI marketing agents produce confident hallucinations because they rely purely on prompt assumptions. Build2Buzz isolates README documentation from live headless browser observations before synthesizing verified release announcements.",
    architecturalDecisions: [
      "SSRF-protected Playwright headless browser automation to inspect live demonstration environments",
      "Strict separation between documented facts, observed runtime behaviors, and generated claims",
      "Human-in-the-loop editor enforcing character caps, evidence references, and manual signoff",
      "Direct integration with LinkedIn's official REST API with OAuth 2.0 token management",
    ],
    techStack: ["Python 3.12", "Playwright / Chromium", "Anthropic / OpenAI API", "LinkedIn REST API", "PySide / Qt UI"],
    takeaway:
      "AI reliability requires grounding in verifiable runtime evidence, not just prompt engineering.",
  },
  "har-apparels": {
    architecturePattern: "Role-Segregated Industrial ERP & Shop-Floor Batch State Machine",
    interfaceParadigm: "High-contrast, glove-friendly mobile UI designed for factory floor workers",
    problemHypothesis:
      "Apparel and denim manufacturing facilities lose productivity through handwritten fabric consumption sheets, lost material requisitions, and disjointed shift handoffs. Har Apparels digitizes the entire floor lifecycle from raw denim roll to finished garment.",
    architecturalDecisions: [
      "Role-based access separation between factory supervisors, cutting masters, and floor line workers",
      "Denim roll consumption ledger with real-time yardage tracking and scrap-rate analytics",
      "Batch workflow state machine tracking program stages from cutting to sewing to final QC",
      "Shift-end reconciliation reporting delivering instant insight into daily production targets",
    ],
    techStack: ["Kotlin", "Android SDK", "Material Design", "Room / Local Storage", "RESTful Backend"],
    takeaway:
      "Industrial software succeeds when it respects factory physical realities: large touch targets, minimal taps, and instant feedback.",
  },
  quicklycart: {
    architecturePattern: "Four-Role State Machine & Coordinated Marketplace Dispatch",
    interfaceParadigm: "Responsive multi-portal commerce experience for shoppers, merchants, and riders",
    problemHypothesis:
      "Local multi-vendor commerce struggles with brittle order states when merchants, customers, and delivery riders operate on separate channels. QuicklyCart unifies product catalogs, checkout, vendor fulfillment, and rider dispatch into an idempotent state machine.",
    architecturalDecisions: [
      "Strict multi-role authorization architecture for Customers, Sellers, Delivery Riders, and Platform Admins",
      "Idempotent order lifecycle transitions preventing double-claims or orphaned deliveries",
      "Merchant stock management with instant availability toggles and vendor balance ledgers",
      "Rider verification workflows paired with localized route assignment and delivery confirmation",
    ],
    techStack: ["Django / Python", "PostgreSQL", "Tailored CSS & JavaScript", "REST API", "Bootstrap 5"],
    takeaway:
      "Marketplace resilience relies on deterministic order state machines and transparent operational handoffs.",
  },
};

export default function WorkShowcase() {
  const [activeSlug, setActiveSlug] = useState<string>("tripsplit");

  useEffect(() => {
    const selectLinkedProject = () => {
      const slug = window.location.hash.slice(1);
      if (projects.some((project) => project.slug === slug)) {
        setActiveSlug(slug);
      }
    };

    selectLinkedProject();
    window.addEventListener("hashchange", selectLinkedProject);
    return () => window.removeEventListener("hashchange", selectLinkedProject);
  }, []);

  const activeProject = projects.find((p) => p.slug === activeSlug) || projects[0];
  const activeDetail = projectDetails[activeSlug] || projectDetails["tripsplit"];

  return (
    <div className="work-showcase-container">
      {/* Project Switcher Tabs */}
      <div className="work-concept-tabs" role="tablist" aria-label="Select project">
        {projects.map((proj) => {
          const isSelected = proj.slug === activeSlug;
          return (
            <button
              key={proj.slug}
              type="button"
              role="tab"
              id={proj.slug}
              aria-controls="project-panel"
              aria-selected={isSelected}
              className={`work-concept-tab ${isSelected ? "is-active" : ""}`}
              onClick={() => {
                setActiveSlug(proj.slug);
                window.history.replaceState(null, "", `#${proj.slug}`);
              }}
            >
              <div className="tab-lead-meta">
                <span className="tab-study-badge">BUILT PROJECT</span>
                <span className="tab-study-num">{proj.number} / 04</span>
              </div>
              <strong className="tab-study-name">{proj.name}</strong>
              <span className="tab-study-cat">{proj.category}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="work-stage-card" role="tabpanel" id="project-panel" aria-labelledby={activeProject.slug}>
        <div className="work-stage-grid">
          {/* Left Column: Interactive Visual & Architecture Spec */}
          <div className="work-stage-preview-column">
            <div className="work-preview-wrap">
              <div className="preview-top-status">
                <span className="preview-status-pill">
                  <span className="pulse-dot-mini" /> INTERACTIVE PROJECT PREVIEW
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

          {/* Right Column: Project Deep Dive */}
          <div className="work-stage-copy-column">
            <div className="stage-copy-header">
              <div className="stage-topline-pills">
                <span className="stage-badge">BUILT PROJECT {activeProject.number}</span>
                <span className="stage-category-label">{activeProject.category}</span>
              </div>
              <h2 className="stage-main-title">
                {activeProject.name}
                <span>.</span>
              </h2>
              <p className="stage-lead-desc">{activeProject.description}</p>
            </div>

            <div className="stage-narrative-block">
              <span className="narrative-label">THE PROBLEM ADDRESSED</span>
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
