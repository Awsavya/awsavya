"use client";

import { useState } from "react";
import { Check, Smartphone, Globe2, Code2, Bot, Users, Cog } from "lucide-react";

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
    description:
      "Cross-platform mobile apps built with React Native and installable progressive web apps designed with fluid gestures and offline tolerance.",
    skills: ["React Native", "iOS & Android", "Installable PWAs", "Touch Ergonomics"],
  },
  {
    char: "W",
    name: "Web",
    role: "Performant Web Experiences",
    icon: Globe2,
    description:
      "Fast, thoughtfully designed websites and web platforms that combine editorial typography with clean Next.js architecture and accessible contrast.",
    skills: ["Next.js App Router", "Performance Optimization", "Accessible Contrast", "Structured SEO"],
  },
  {
    char: "S",
    name: "Software",
    role: "Custom Internal Systems",
    icon: Code2,
    description:
      "Bespoke portals, administrative dashboards, and operations backends built specifically around your team's real operational workflows.",
    skills: ["PostgreSQL & Prisma", "Secure Role Auth", "High-Density UI", "Data Pipelines"],
  },
  {
    char: "A",
    name: "AI",
    role: "Applied Intelligence & Search",
    icon: Bot,
    description:
      "Practical language model integrations, semantic document search, and workflow-specific assistants that surface verified source citations.",
    skills: ["LLM Orchestration", "Vector RAG", "Fallback Guardrails", "Embeddings Search"],
  },
  {
    char: "V & Y",
    name: "Founders",
    role: "Direct Principal Engagement",
    icon: Users,
    description:
      "Vivek and Yash. You work directly with the builders and decision-makers who design and ship the software—no middle management overhead.",
    skills: ["Product Vision", "Direct Communication", "Full Accountability", "Hands-on Code"],
  },
  {
    char: "A",
    name: "Automation",
    role: "Connected Operations",
    icon: Cog,
    description:
      "Connecting databases, third-party services, APIs, and communication channels so repeatable handoffs run reliably in the background.",
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
          <span className="anatomy-skills-label">DISCIPLINES &amp; PRACTICES</span>
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
