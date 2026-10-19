"use client";

import { useState } from "react";
import { Check, CircleDot, MoveUpRight, Sparkles, Workflow, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProcessDetail {
  number: string;
  title: string;
  tagline: string;
  body: string;
  deliverables: string[];
  cadence: string;
}

const processDetails: ProcessDetail[] = [
  {
    number: "01",
    title: "Understand",
    tagline: "Clarity before code.",
    body: "We get clear on the people, the core friction, constraints and measurable business goals before proposing architecture or timelines.",
    deliverables: ["Problem & constraint brief", "User flow mapping", "Technical feasibility check"],
    cadence: "1-2 collaborative discovery sessions",
  },
  {
    number: "02",
    title: "Shape",
    tagline: "Precision in structure.",
    body: "We design the end-to-end experience, prioritize the essential release criteria and architect the data schema so decisions are visible and validated early.",
    deliverables: ["Clickable interactive wireframes", "Design system tokens", "API & data model schema"],
    cadence: "Bi-weekly visual checkpoints",
  },
  {
    number: "03",
    title: "Build",
    tagline: "Craft with engineering discipline.",
    body: "We translate specifications into clean, production-grade Next.js, TypeScript, native apps or AI integrations. Accessible, fast, and structured for longevity.",
    deliverables: ["Live staging environments", "Type-safe codebases", "Continuous deployment pipelines"],
    cadence: "Weekly progress demos & async updates",
  },
  {
    number: "04",
    title: "Improve",
    tagline: "Measured real-world impact.",
    body: "A launch is a milestone, not the finish. We inspect real user telemetry, stress-test edge cases, and prioritize high-value enhancements.",
    deliverables: ["Performance & audit report", "Telemetry & error logs", "Iteration backlog"],
    cadence: "Post-launch warranty & evolution plan",
  },
];

export default function InteractiveProcessExplorer() {
  const [activeStep, setActiveStep] = useState(0);
  const current = processDetails[activeStep];

  return (
    <div className="interactive-process-wrap">
      {/* Step selector tabs */}
      <div className="process-nav-tabs" role="tablist" aria-label="Process phases">
        {processDetails.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={step.number}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`process-tab-btn ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveStep(idx)}
            >
              <span className="tab-number">{step.number}</span>
              <span className="tab-title">{step.title}</span>
              {isActive && <span className="tab-indicator-bar" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {/* Active step display card */}
      <div className="process-card-detail" role="tabpanel">
        <div className="process-detail-main">
          <div className="process-detail-top">
            <span className="process-detail-badge">PHASE {current.number} / 04</span>
            <span className="process-detail-tagline">{current.tagline}</span>
          </div>

          <h3 className="process-detail-title">{current.title}</h3>
          <p className="process-detail-body">{current.body}</p>

          <div className="process-cadence-box">
            <span className="cadence-label">COLLABORATION CADENCE</span>
            <span className="cadence-value">{current.cadence}</span>
          </div>
        </div>

        <div className="process-detail-deliverables">
          <span className="deliverables-heading">TYPICAL DELIVERABLES</span>
          <ul className="deliverables-list">
            {current.deliverables.map((item) => (
              <li key={item}>
                <span className="deliverable-check"><Check size={13} /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="process-card-footer">
            <Link href="/contact" className="text-link">
              Start at Phase 01 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
