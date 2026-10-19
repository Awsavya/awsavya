"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Check,
  CheckCircle2,
  Code2,
  Cog,
  Cpu,
  Globe2,
  Layers,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
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
    subtitle: "Touch-First Native & Responsive Web Applications",
    problemSolved: "Most apps are bloated, slow to respond, and frustrating on mobile screens. We build fluid, touch-optimized experiences that respect mobile battery and offline states.",
    architectureHighlights: [
      "Offline-first local caching & optimistic UI updates",
      "Native iOS & Android performance via React Native or PWA",
      "Adaptive gestures with haptic feedback and safe-area geometry",
    ],
    deliverables: [
      "Figma design system & interactive component library",
      "Type-safe mobile / web client codebase",
      "App Store & Google Play deployment preparation",
    ],
    techStack: ["React Native", "Next.js", "TypeScript", "Tailwind CSS", "Expo"],
    prototypeTitle: "Touch Ergonomics & Fluid Gestures",
  },
  web: {
    icon: "web",
    subtitle: "High-Performance Flagships & Web Platforms",
    problemSolved: "Slow websites lose visitors and drop conversion. We combine clean editorial typography with sub-second page loads, accessible contrast, and high-converting flow.",
    architectureHighlights: [
      "Sub-second Largest Contentful Paint (LCP < 0.8s)",
      "Zero Cumulative Layout Shift (CLS < 0.05)",
      "Semantic HTML5 & WCAG 2.2 AA accessibility standards",
    ],
    deliverables: [
      "Custom responsive design system & typography tokens",
      "Next.js App Router static/dynamic hybrid setup",
      "Automated SEO metadata, sitemap & OpenGraph generator",
    ],
    techStack: ["Next.js 16", "React 19", "Motion", "Vanilla CSS", "Vercel"],
    prototypeTitle: "Sub-Second LCP & Accessible Typography",
  },
  software: {
    icon: "software",
    subtitle: "Bespoke Portals, Internal Tools & Ops Backends",
    problemSolved: "Generic SaaS tools rarely match your team's real operational workflows. We design custom software that eliminates disconnected spreadsheets and repetitive manual handoffs.",
    architectureHighlights: [
      "Strict role-based access control (RBAC) & session audits",
      "High-density data tables with sorting, filtering & CSV export",
      "Resilient database schemas with automated migrations",
    ],
    deliverables: [
      "Database schema & API architecture documentation",
      "Administrative dashboard & employee portal",
      "Staging environment & automated CI/CD deployment",
    ],
    techStack: ["Node.js", "PostgreSQL", "Prisma ORM", "REST / GraphQL", "Docker"],
    prototypeTitle: "High-Density Data Architecture & Auth",
  },
  ai: {
    icon: "ai",
    subtitle: "Applied AI, Domain Assistants & Document Intelligence",
    problemSolved: "AI without context generates generic hallucinations. We connect language models to your proprietary documents and databases to surface verified, source-linked answers.",
    architectureHighlights: [
      "Retrieval-Augmented Generation (RAG) with vector embeddings",
      "Strict fallback guardrails & source citation tracking",
      "Streaming token responses with low input latency (< 50ms)",
    ],
    deliverables: [
      "Context ingestion pipeline & vector database index",
      "Custom conversational UI & prompt engineering suite",
      "Telemetry dashboard tracking token costs and latency",
    ],
    techStack: ["OpenAI & Anthropic APIs", "LangChain", "Vector Embeddings", "FastAPI / Next"],
    prototypeTitle: "Citation-Backed Semantic Search & RAG",
  },
  automation: {
    icon: "automation",
    subtitle: "Connected Workflow Pipelines & Event Integration",
    problemSolved: "Teams spend hours copying data between tools and sending manual notification updates. We build automated pipelines that run silently and reliably in the background.",
    architectureHighlights: [
      "Webhook listeners with automated retries & error queues",
      "Multi-service data synchronization with idempotency keys",
      "Instant notification dispatch via email, Slack, or SMS",
    ],
    deliverables: [
      "Visual workflow diagram & integration matrix",
      "Production webhook handlers & sync microservices",
      "Telemetry alerts alerting on failures before clients notice",
    ],
    techStack: ["Node.js Microservices", "Webhook Handlers", "Zapier / Make", "Event Queues"],
    prototypeTitle: "Zero-Data-Loss Event Pipelines & Sync",
  },
};

export default function ServicesShowcase() {
  const [selectedIcon, setSelectedIcon] = useState<string>("app");
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
              aria-selected={isSelected}
              className={`service-matrix-tab ${isSelected ? "is-selected" : ""}`}
              onClick={() => setSelectedIcon(service.icon)}
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
      <div className="service-stage-card" role="tabpanel">
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
                  <span className="pulse-dot-mini" /> PRODUCTION STANDARD
                </span>
                <span className="panel-service-code">SVC_{activeService.number}</span>
              </div>

              <div className="panel-hero-metric">
                <ServiceIcon name={activeService.icon} size={36} />
                <div>
                  <strong>{activeConfig.prototypeTitle}</strong>
                  <span>Engineered with precision</span>
                </div>
              </div>

              <div className="panel-deliverables-box">
                <span className="deliverables-box-title">KEY SPRINT DELIVERABLES</span>
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
