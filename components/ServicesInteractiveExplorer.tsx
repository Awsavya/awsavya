"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Cpu } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import type { services } from "@/lib/site";

type Service = (typeof services)[number];

const serviceTechStacks: Record<string, string[]> = {
  app: ["React Native", "Next.js", "TypeScript", "Tailwind CSS", "Expo"],
  web: ["Next.js 16", "React 19", "Motion", "Vanilla CSS", "Vercel"],
  software: ["Node.js", "PostgreSQL", "Prisma ORM", "REST & GraphQL", "Docker"],
  ai: ["OpenAI & Anthropic APIs", "LangChain", "Vector RAG", "Python / FastAPI"],
  automation: ["Webhook Handlers", "Custom ETL", "Zapier / Make", "Event Queues"],
};

export default function ServicesInteractiveExplorer({ services }: { services: Service[] }) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const displayedServices = activeTab === "all"
    ? services
    : services.filter((s) => s.icon === activeTab);

  return (
    <div className="services-interactive-wrapper">
      {/* Category Filter Navigation */}
      <div className="services-jump-bar" role="tablist" aria-label="Services categories">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "all"}
          className={`service-jump-pill ${activeTab === "all" ? "is-active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          <span>All Capabilities (05)</span>
        </button>
        {services.map((s) => {
          const isActive = activeTab === s.icon;
          return (
            <button
              key={s.icon}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`service-jump-pill ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveTab(s.icon)}
            >
              <ServiceIcon name={s.icon} size={14} />
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Services List */}
      <div className="services-detail-list">
        {displayedServices.map((service, index) => {
          const techStack = serviceTechStacks[service.icon] || [];

          return (
            <article
              id={service.icon}
              key={service.number}
              className={`service-detail ${index % 2 === 1 ? "service-detail-reverse" : ""}`}
            >
              <div className="service-detail-main">
                <div className="service-detail-titleline">
                  <span className="service-icon">
                    <ServiceIcon name={service.icon} size={25} />
                  </span>
                  <span className="service-number">{service.number} / 05</span>
                </div>
                <h2>{service.title}<span>.</span></h2>
                <p className="service-detail-lead">{service.short}</p>
                <p className="service-detail-body">{service.description}</p>

                {/* Tech stack badge row */}
                <div className="service-tech-row">
                  <span className="tech-row-label"><Cpu size={12} /> Tech stack:</span>
                  <div className="tech-badges-list">
                    {techStack.map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="button button-dark"
                >
                  Discuss {service.title.toLowerCase()} <ArrowUpRight size={15} />
                </Link>
              </div>

              <div className={`service-detail-panel service-panel-${service.icon}`}>
                <div className="service-panel-header">
                  <span>CAPABILITIES</span>
                  <span>{service.number}</span>
                </div>
                <div className="service-panel-copy">
                  <ServiceIcon name={service.icon} size={32} />
                  <span>
                    Built around<br />
                    <b>your goals.</b>
                  </span>
                </div>
                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>
                      <Check size={13} className="text-blue" /> {tag}
                    </span>
                  ))}
                </div>
                <div className="service-panel-orbit" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
