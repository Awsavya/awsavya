"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/lib/site";

interface ServiceDetailConfig {
  icon: "app" | "web" | "software" | "ai" | "automation";
  subtitle: string;
  problemSolved: string;
  architectureHighlights: string[];
  deliverables: string[];
  techStack: string[];
  prototypeTitle: string;
}

const serviceConfigs: Record<string, ServiceDetailConfig> = {
  app: {
    icon: "app",
    subtitle: "Touch-First Cross-Platform Apps & Installable PWAs",
    problemSolved:
      "Many applications suffer from unresponsive interfaces, poor battery ergonomics, and brittle offline handling. We design and build cross-platform mobile apps using React Native, and installable progressive web apps when a web-first approach fits the product goal.",
    architectureHighlights: [
      "Cross-platform mobile apps built with React Native for native device capabilities",
      "Installable progressive web apps (PWAs) when lightweight web distribution is the right fit",
      "Offline-aware local caching, safe-area geometry, and touch-optimised ergonomics",
    ],
    deliverables: [
      "Figma design system & interactive component library",
      "Type-safe mobile client or PWA codebase",
      "Store deployment preparation & release guidance",
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Next.js", "Tailored CSS"],
    prototypeTitle: "Touch Ergonomics & Native Gestures",
  },
  web: {
    icon: "web",
    subtitle: "Performance-Focused Websites & Web Platforms",
    problemSolved:
      "Cluttered layouts and bloated client scripts increase bounce rates and damage credibility. We combine clear typography, accessible contrast, and server-rendered Next.js architecture to keep pages fast and readable.",
    architectureHighlights: [
      "Next.js App Router with server-side rendering and static pre-rendering",
      "Accessible typography targeting WCAG 2.2 AA contrast standards",
      "Semantic HTML5 hierarchy and structured metadata for search engines",
    ],
    deliverables: [
      "Custom responsive design system and typographic tokens",
      "Production-ready Next.js web application",
      "Structured SEO metadata, sitemap, and Open Graph cards",
    ],
    techStack: ["Next.js 16", "React 19", "Motion", "Vanilla CSS", "Vercel"],
    prototypeTitle: "Accessible Typography & Lean Layouts",
  },
  software: {
    icon: "software",
    subtitle: "Custom Portals, Operations Backends & Internal Tools",
    problemSolved:
      "Off-the-shelf software rarely fits how a specialized business actually operates, forcing teams into manual workarounds. We build custom software shaped specifically around your team's real operational workflows.",
    architectureHighlights: [
      "Role-based access control (RBAC) and audited session management",
      "High-density data tables with sorting, filtering, and export capabilities",
      "Resilient database schemas with automated migrations",
    ],
    deliverables: [
      "Database schema & API architecture documentation",
      "Administrative dashboard & team operations portal",
      "Staging environment and automated deployment configuration",
    ],
    techStack: ["Node.js", "PostgreSQL", "Prisma ORM", "REST / GraphQL", "Docker"],
    prototypeTitle: "High-Density Data Architecture & Auth",
  },
  ai: {
    icon: "ai",
    subtitle: "Applied AI, Domain Assistants & Document Intelligence",
    problemSolved:
      "Generic AI chatbots often hallucinate and lack organizational context. We connect language models to your documents and structured data to surface source-grounded answers with fallback guardrails.",
    architectureHighlights: [
      "Retrieval-Augmented Generation (RAG) referencing proprietary document collections",
      "Source citation tracking and fallback guardrails when certainty is low",
      "Streamed token responses and optimistic client UI updates",
    ],
    deliverables: [
      "Document ingestion pipeline & semantic search index",
      "Conversational interface and tailored prompt templates",
      "Monitoring telemetry for usage, latency, and failure states",
    ],
    techStack: ["OpenAI & Anthropic APIs", "Vector Indexes", "Python / FastAPI", "TypeScript"],
    prototypeTitle: "Citation-Backed Semantic Search & RAG",
  },
  automation: {
    icon: "automation",
    subtitle: "Connected Workflow Pipelines & Event Integration",
    problemSolved:
      "Teams lose valuable hours manually copying data between disparate tools and tracking handoffs. We build automated event pipelines that run reliably in the background with error logging.",
    architectureHighlights: [
      "Webhook listeners with automated retry policies and error queues",
      "Multi-service data synchronization with idempotency safeguards",
      "Automated notifications via email, team chat, or SMS",
    ],
    deliverables: [
      "Visual workflow map & integration specification",
      "Production webhook handlers and synchronization routines",
      "Automated alerting to catch edge cases and API errors",
    ],
    techStack: ["Node.js Microservices", "Webhook Handlers", "Zapier / Make", "Event Queues"],
    prototypeTitle: "Resilient Event Pipelines & Sync",
  },
};

export default function ServicesShowcase() {
  const [selectedIcon, setSelectedIcon] = useState<string>("app");

  useEffect(() => {
    const selectLinkedService = () => {
      const icon = window.location.hash.slice(1);
      if (services.some((service) => service.icon === icon)) {
        setSelectedIcon(icon);
      }
    };

    selectLinkedService();
    window.addEventListener("hashchange", selectLinkedService);
    return () => window.removeEventListener("hashchange", selectLinkedService);
  }, []);

  const activeService = services.find((s) => s.icon === selectedIcon) || services[0];
  const activeConfig = serviceConfigs[selectedIcon] || serviceConfigs.app;

  return (
    <div className="services-showcase-container">
      {/* Capability Tab Switcher Bar */}
      <div className="services-nav-matrix" role="tablist" aria-label="Services selector">
        {services.map((service) => {
          const isSelected = service.icon === selectedIcon;
          return (
            <button
              key={service.icon}
              type="button"
              role="tab"
              id={service.icon}
              aria-controls="service-panel"
              aria-selected={isSelected}
              className={`service-matrix-tab ${isSelected ? "is-selected" : ""}`}
              onClick={() => {
                setSelectedIcon(service.icon);
                window.history.replaceState(null, "", `#${service.icon}`);
              }}
            >
              <span className="tab-icon-wrap">
                <ServiceIcon name={service.icon} size={18} />
              </span>
              <div className="tab-copy-wrap">
                <span className="tab-number">{service.number}</span>
                <span className="tab-title">{service.title}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Service Showcase Hero Card */}
      <div className="service-stage-card" role="tabpanel" id="service-panel" aria-labelledby={selectedIcon}>
        <div className="service-stage-grid">
          {/* Left Column: Architectural Breakdown */}
          <div className="service-stage-content">
            <div className="stage-topline">
              <span className="stage-badge">CAPABILITY {activeService.number} / 05</span>
              <span className="stage-subtitle">{activeConfig.subtitle}</span>
            </div>

            <h2 className="stage-title">{activeService.title}<span>.</span></h2>
            <p className="stage-lead">{activeService.short}</p>

            <div className="stage-section">
              <span className="stage-section-label">THE PROBLEM WE SOLVE</span>
              <p className="stage-body-text">{activeConfig.problemSolved}</p>
            </div>

            <div className="stage-section">
              <span className="stage-section-label">ENGINEERING HIGHLIGHTS</span>
              <ul className="stage-bullets-list">
                {activeConfig.architectureHighlights.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={15} className="text-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="stage-section">
              <span className="stage-section-label"><Cpu size={12} /> RECOMMENDED TECH STACK</span>
              <div className="stage-tech-tags">
                {activeConfig.techStack.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>

            <div className="stage-actions">
              <Link
                href={`/contact?service=${encodeURIComponent(activeService.title)}`}
                className="button button-dark"
              >
                Discuss {activeService.title.toLowerCase()} <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Stage & Deliverables Panel */}
          <div className="service-stage-visual-panel">
            <div className="panel-inner-card">
              <div className="panel-header">
                <span className="panel-status-pill">
                  <span className="pulse-dot-mini" /> CAPABILITY STANDARD
                </span>
                <span className="panel-service-code">SVC_{activeService.number}</span>
              </div>

              <div className="panel-hero-metric">
                <ServiceIcon name={activeService.icon} size={36} />
                <div>
                  <strong>{activeConfig.prototypeTitle}</strong>
                  <span>Engineered with care</span>
                </div>
              </div>

              <div className="panel-deliverables-box">
                <span className="deliverables-box-title">INDICATIVE SPRINT DELIVERABLES</span>
                <ul className="deliverables-box-list">
                  {activeConfig.deliverables.map((d) => (
                    <li key={d}>
                      <span className="deliverable-bullet"><Check size={12} /></span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel-tag-cloud">
                {activeService.tags.map((tag) => (
                  <span key={tag} className="service-tag-pill">
                    <Check size={11} className="text-blue" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
