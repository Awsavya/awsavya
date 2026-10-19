"use client";

import { useState } from "react";
import { Check, Sparkles, Smartphone, Globe2, Code2, Bot, Users, Cog, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface AnatomyLetter {
  char: string;
  name: string;
  role: string;
  icon: typeof Smartphone;
  description: string;
  skills: string[];
}

const anatomyLetters: AnatomyLetter[] = [
  {
    char: "A",
    name: "Apps",
    role: "Touch-First Product Engineering",
    icon: Smartphone,
    description: "Intuitive mobile and cross-platform applications with fluid gestures, offline state tolerance, and performance tuned for everyday use.",
    skills: ["React Native", "iOS & Android", "PWA Architecture", "Fluid Animations"],
  },
  {
    char: "W",
    name: "Web",
    role: "Flagship Web Experiences",
    icon: Globe2,
    description: "Websites that load in milliseconds, respect accessibility standards, and marry editorial typography with high-conversion structure.",
    skills: ["Next.js App Router", "Sub-second LCP", "WCAG AA Compliance", "SEO Hierarchy"],
  },
  {
    char: "S",
    name: "Software",
    role: "Custom Internal Systems",
    icon: Code2,
    description: "Bespoke portals, administrative dashboards, and operations backends built specifically around your team's real operational workflows.",
    skills: ["PostgreSQL & Prisma", "Secure Role Auth", "High-Density UI", "Data Pipelines"],
  },
  {
    char: "A",
    name: "AI",
    role: "Applied Intelligence & Agents",
    icon: Bot,
    description: "Practical language models, semantic document search, and workflow-specific assistants that eliminate repetitive knowledge work.",
    skills: ["LLM Orchestration", "Vector RAG", "Fallback Guardrails", "Embeddings Search"],
  },
  {
    char: "V & Y",
    name: "Founders",
    role: "Direct Principal Engagement",
    icon: Users,
    description: "Vivek and Yash. You work directly with the builders and decision-makers who design and ship the software—no middle management overhead.",
    skills: ["Product Vision", "Direct Communication", "Full Accountability", "Hands-on Code"],
  },
  {
    char: "A",
    name: "Automation",
    role: "Connected Operations",
    icon: Cog,
    description: "Connecting databases, third-party services, APIs, and communication channels so repetitive handoffs run automatically in the background.",
    skills: ["Webhook Listeners", "Multi-Service Sync", "Error Telemetry", "Event Triggers"],
  },
];

export default function InteractiveAnatomy() {
  const [activeLetter, setActiveLetter] = useState(0);
  const current = anatomyLetters[activeLetter];
  const Icon = current.icon;

  return (
    <div className="interactive-anatomy-wrap">
      {/* Letter selector bar */}
      <div className="anatomy-letter-row" role="tablist" aria-label="AWSAVYA letter breakdown">
        {anatomyLetters.map((item, idx) => {
          const isSelected = idx === activeLetter;
          return (
            <button
              key={`${item.name}-${idx}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`anatomy-letter-btn ${isSelected ? "is-selected" : ""}`}
              onClick={() => setActiveLetter(idx)}
            >
              <span className="letter-glyph">{item.char}</span>
              <span className="letter-sublabel">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active letter detail card */}
      <div className="anatomy-detail-card" role="tabpanel">
        <div className="anatomy-detail-header">
          <span className="anatomy-icon-badge">
            <Icon size={22} />
          </span>
          <div>
            <div className="anatomy-titleline">
              <h3>{current.name}</h3>
              <span className="anatomy-role">{current.role}</span>
            </div>
            <p className="anatomy-desc">{current.description}</p>
          </div>
        </div>

        <div className="anatomy-skills-section">
          <span className="anatomy-skills-label">DISCIPLINES & PRACTICES</span>
          <div className="anatomy-skills-chips">
            {current.skills.map((skill) => (
              <span key={skill} className="anatomy-skill-pill">
                <Check size={11} className="text-blue" /> {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
