import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Clock,
  Sparkles,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServicesShowcase from "@/components/ServicesShowcase";
import InteractiveProcessExplorer from "@/components/InteractiveProcessExplorer";
import { deliveryTimelines, services, siteConfig, studioDifferentiators, timelineDisclaimer } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Explore AWSAVYA services: cross-platform mobile apps, performant Next.js web platforms, custom operations software, applied AI, and automated pipelines.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services & Capabilities — AWSAVYA",
    description:
      "Explore AWSAVYA services: cross-platform mobile apps, performant Next.js web platforms, custom operations software, applied AI, and automated pipelines.",
    url: `${siteConfig.canonicalUrl}/services`,
    siteName: "AWSAVYA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Services & Capabilities — AWSAVYA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Capabilities — AWSAVYA",
    description:
      "Explore AWSAVYA services: cross-platform mobile apps with React Native, high-performance Next.js websites, custom operations software, applied AI, and automated pipelines.",
    images: ["/opengraph-image"],
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.canonicalUrl}/services#catalog`,
  name: "AWSAVYA Digital Engineering Services",
  description:
    "Professional engineering services covering cross-platform mobile applications, performant web platforms, custom internal operations software, applied AI systems, and automated pipelines.",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: { "@id": `${siteConfig.canonicalUrl}#organization` },
      url: `${siteConfig.canonicalUrl}/services#${service.icon}`,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.canonicalUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${siteConfig.canonicalUrl}/services`,
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> COMPREHENSIVE DIGITAL CAPABILITIES
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>
              Full-cycle engineering.<br />
              <span>Designed for clarity.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              From a focused MVP to an integrated operations platform, we combine senior design,
              clean architecture, and purposeful motion to solve real business challenges.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="page-hero-meta-row">
              <span className="hero-status-pill">
                <span className="pulse-dot-mini" /> 5 CORE DISCIPLINES
              </span>
              <span className="hero-pill-note">
                Select any capability below to view architecture and deliverables
              </span>
            </div>
          </Reveal>
          <div className="page-hero-scroll">
            <span>
              <ArrowDownRight size={14} /> Explore the interactive matrix below
            </span>
            <span>01 — 05 DISCIPLINES</span>
          </div>
        </div>
      </section>

      {/* Interactive Services Showcase Stage */}
      <section className="section services-showcase-section">
        <div className="container">
          <Reveal>
            <ServicesShowcase />
          </Reveal>
        </div>
      </section>

      <section className="section content-index" aria-labelledby="services-index-title">
        <div className="container">
          <div className="content-index-heading">
            <span className="eyebrow"><span className="eyebrow-dot" /> WHAT AWSAVYA BUILDS</span>
            <h2 id="services-index-title">Capabilities at a glance.</h2>
            <p>Choose a discipline to read its architecture, scope, and indicative deliverables above.</p>
          </div>
          <div className="content-index-grid">
            {services.map((service) => (
              <article className="content-index-card" key={service.icon}>
                <span className="content-index-number">{service.number} / 05 · AWSAVYA SERVICE</span>
                <h3><Link href={`/services#${service.icon}`}>{service.title}</Link></h3>
                <p>{service.description}</p>
                <span className="content-index-category">{service.tags.join(" · ")}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why AWSAVYA: Neutral, grounded differentiators */}
      <section className="section section-comparison">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="WHY PARTNER WITH US"
                title="A direct studio partner,"
                accent="focused on execution."
              >
                <span>
                  We believe technology engagements work best when communication is direct, scope is transparent, and engineering decisions are fully visible.
                </span>
              </SectionHeading>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="differentiators-grid">
              {studioDifferentiators.map((diff, index) => (
                <div key={diff.title} className="differentiator-card">
                  <span className="differentiator-num">0{index + 1}</span>
                  <h3>{diff.title}</h3>
                  <p>{diff.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Structured Sprint Formats with Single Source of Truth */}
      <section className="section section-engagement-formats">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="INDICATIVE SPRINT TIMELINES"
                title="Structured sprints"
                accent="tailored to scope."
              >
                <span>
                  We tailor our sprints around your stage—from early validation and prototype sprints to complete product releases.
                </span>
              </SectionHeading>
            </div>
          </Reveal>

          <div className="engagement-cards-grid">
            {deliveryTimelines.map((format, index) => (
              <Reveal key={format.id} delay={index * 0.06}>
                <div className={`engagement-card ${format.id === "mvp" ? "featured-engagement" : ""}`}>
                  <div className="engagement-topline">
                    <span className="engagement-badge">{format.phase.toUpperCase()}</span>
                    <span className="engagement-time"><Clock size={13} /> {format.durationShort.toUpperCase()}</span>
                  </div>
                  <h3>{format.label}</h3>
                  <p>{format.summary}</p>
                  <div className="engagement-deliverables">
                    {format.deliverables.map((item) => (
                      <span key={item}>
                        <Check size={12} className="text-blue" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="timeline-disclaimer-box">
            <Sparkles size={14} className="text-blue" />
            <p>{timelineDisclaimer}</p>
          </div>
        </div>
      </section>

      {/* Interactive Process Section */}
      <section className="section section-process-brief">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="A CLEAR WAY FORWARD"
                title="A process that"
                accent="keeps you in the loop."
              >
                <span>There are no mystery handoffs. You know what we&apos;re solving, what comes next, and why it matters.</span>
              </SectionHeading>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <InteractiveProcessExplorer />
          </Reveal>
        </div>
      </section>

      {/* Approachable CTA */}
      <section className="simple-cta-section">
        <div className="container simple-cta-inner">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" /> THE RIGHT SOLUTION STARTS WITH A QUESTION</span>
            <h2>Not sure which format fits your stage?</h2>
            <p>
              That&apos;s a normal place to start. Tell us about what you&apos;re trying to achieve,
              and we&apos;ll recommend the leanest way to get there.
            </p>
          </div>
          <Link href="/contact" className="button button-dark">
            Start a conversation <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
