import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServicesShowcase from "@/components/ServicesShowcase";
import InteractiveProcessExplorer from "@/components/InteractiveProcessExplorer";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description:
    "Explore AWSAVYA services across native mobile apps, performance web platforms, custom internal software, applied AI, and automated workflows.",
};

export default function ServicesPage() {
  return (
    <>
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
              From a single focused MVP to an integrated operations platform, we combine senior design,
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

      {/* Comparison: Why AWSAVYA */}
      <section className="section section-comparison">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="AN ALTERNATIVE TO AGENCY BLOAT"
                title="A direct partner,"
                accent="not a bureaucratic machine."
              >
                <span>
                  Big agencies charge excessive overhead for junior staff. Freelancers can leave you stranded.
                  We provide a focused studio model with senior direct engagement.
                </span>
              </SectionHeading>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="comparison-table-wrap">
              <div className="comparison-grid">
                <div className="comparison-col comparison-traditional">
                  <span className="comparison-col-header">TRADITIONAL AGENCIES</span>
                  <ul className="comparison-list">
                    <li>Bloated account management layers</li>
                    <li>Opaque pricing and unexpected change orders</li>
                    <li>Code handed off to juniors after kickoff</li>
                    <li>Months of discovery before seeing working code</li>
                    <li>Proprietary lock-in and vendor dependency</li>
                  </ul>
                </div>

                <div className="comparison-col comparison-highlight">
                  <div className="highlight-tag">
                    <Sparkles size={12} /> THE AWSAVYA MODEL
                  </div>
                  <span className="comparison-col-header text-blue">DIRECT STUDIO ENGAGEMENT</span>
                  <ul className="comparison-list">
                    <li><Check size={14} className="text-blue" /> Direct access to senior designers and engineers</li>
                    <li><Check size={14} className="text-blue" /> Transparent, milestone-based sprint pricing</li>
                    <li><Check size={14} className="text-blue" /> Testable interactive prototypes in week one</li>
                    <li><Check size={14} className="text-blue" /> Type-safe, production-ready codebase</li>
                    <li><Check size={14} className="text-blue" /> 100% intellectual property and code ownership</li>
                  </ul>
                </div>

                <div className="comparison-col comparison-freelance">
                  <span className="comparison-col-header">DISCONNECTED FREELANCERS</span>
                  <ul className="comparison-list">
                    <li>Fragmented communication and context switching</li>
                    <li>Inconsistent documentation and codebase styling</li>
                    <li>Designers who don&apos;t understand engineering constraints</li>
                    <li>Unpredictable availability for ongoing support</li>
                    <li>Risk of abandoned projects mid-flight</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Flexible Sprint Formats (No large budget figures) */}
      <section className="section section-engagement-formats">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="APPROACHABLE ENGAGEMENT FORMATS"
                title="Structured sprints"
                accent="without bloated commitments."
              >
                <span>
                  We tailor our work around your exact stage—whether you need an immediate prototype,
                  an MVP release, or dedicated engineering support.
                </span>
              </SectionHeading>
            </div>
          </Reveal>

          <div className="engagement-cards-grid">
            <Reveal delay={0.05}>
              <div className="engagement-card">
                <div className="engagement-topline">
                  <span className="engagement-badge">PHASE 01</span>
                  <span className="engagement-time"><Clock size={13} /> 1–2 WEEKS</span>
                </div>
                <h3>Architecture &amp; Prototype Sprint</h3>
                <p>
                  Validate an idea quickly. We audit technical feasibility, design an interactive prototype,
                  and deliver a clear roadmap before you commit to full development.
                </p>
                <div className="engagement-deliverables">
                  <span><Check size={12} className="text-blue" /> Interactive Figma prototype</span>
                  <span><Check size={12} className="text-blue" /> System architecture &amp; schema design</span>
                  <span><Check size={12} className="text-blue" /> Fixed execution roadmap</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="engagement-card featured-engagement">
                <div className="engagement-topline">
                  <span className="engagement-badge">PHASE 02</span>
                  <span className="engagement-time"><Clock size={13} /> 3–6 WEEKS</span>
                </div>
                <h3>Focused MVP Build</h3>
                <p>
                  Build and deploy a launch-ready digital product. Perfect for launching mobile apps,
                  high-converting web platforms, or bespoke operational backends.
                </p>
                <div className="engagement-deliverables">
                  <span><Check size={12} className="text-blue" /> Production-ready, type-safe codebase</span>
                  <span><Check size={12} className="text-blue" /> Automated CI/CD &amp; hosting setup</span>
                  <span><Check size={12} className="text-blue" /> Post-launch monitoring &amp; handover</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="engagement-card">
                <div className="engagement-topline">
                  <span className="engagement-badge">PHASE 03</span>
                  <span className="engagement-time"><Clock size={13} /> ONGOING SPRINTS</span>
                </div>
                <h3>Dedicated Feature Sprints</h3>
                <p>
                  Continuous feature evolution, AI enhancements, database optimizations,
                  or API integrations for existing platforms seeking senior support.
                </p>
                <div className="engagement-deliverables">
                  <span><Check size={12} className="text-blue" /> Weekly shipping cadence</span>
                  <span><Check size={12} className="text-blue" /> Dedicated communication channel</span>
                  <span><Check size={12} className="text-blue" /> Pause or adjust anytime</span>
                </div>
              </div>
            </Reveal>
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
              That&apos;s a perfectly normal place to start. Tell us about what you&apos;re trying to achieve,
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
