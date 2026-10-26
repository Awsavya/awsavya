import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ServicesShowcase from "@/components/ServicesShowcase";
import InteractiveProcessExplorer from "@/components/InteractiveProcessExplorer";
import InteractiveScopeBuilder from "@/components/InteractiveScopeBuilder";
import { projects, siteConfig, studioDifferentiators } from "@/lib/site";

export const metadata: Metadata = {
  title: "AWSAVYA — Apps, Web, Software, AI & Automation",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AWSAVYA — Technology built around your next move",
    description: siteConfig.description,
    url: `${siteConfig.canonicalUrl}/`,
    siteName: "AWSAVYA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWSAVYA — Apps, Web, Software, AI & Automation",
    description: siteConfig.description,
  },
};

// WebSite JSON-LD entity to establish definitive brand and site name identity in Google Search
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.canonicalUrl}/#website`,
  name: "AWSAVYA",
  alternateName: "awsavya.in",
  url: `${siteConfig.canonicalUrl}/`,
  publisher: {
    "@id": `${siteConfig.canonicalUrl}/#organization`,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Reveal y={12}>
              <span className="eyebrow">
                <span className="eyebrow-dot pulse-dot" /> AWSAVYA · DIGITAL PRODUCT STUDIO
              </span>
            </Reveal>
            <Reveal delay={0.08} y={18}>
              <h1>
                <span className="hero-brand-title">AWSAVYA<span className="brand-period">.</span></span>
                Technology for<br />
                your <span className="headline-accent">next move.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16} y={18}>
              <p className="hero-description">
                AWSAVYA builds apps, websites, custom software, AI solutions, and automations that help businesses solve real problems.
              </p>
            </Reveal>
            <Reveal delay={0.24} y={14}>
              <div className="hero-actions">
                <Link href="/contact" className="button button-dark">
                  Start a project <ArrowUpRight size={16} />
                </Link>
                <Link href="#services" className="text-link">
                  Explore capabilities <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.32} y={10}>
              <div className="hero-proofline">
                <span className="proof-avatars"><i>A</i><i>W</i><i>S</i></span>
                <span>From initial scoping to launch-ready software</span>
              </div>
            </Reveal>
          </div>
          <div className="hero-art-wrap">
            <HeroVisual />
          </div>
        </div>
        <div className="container hero-bottom-line">
          <span><ArrowDownRight size={15} /> Scroll to explore</span>
          <span>IDEAS MADE REAL, WITH INTENTION.</span>
        </div>
      </section>

      {/* 2. One Comprehensive Interactive Services Section */}
      <section className="section section-services" id="services">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="WHAT WE DO"
                title="Interactive capabilities,"
                accent="built around your goals."
              >
                <span>One connected studio for the digital disciplines that help your business move forward. Select a discipline below to inspect architecture highlights and sprint deliverables.</span>
              </SectionHeading>
              <Link href="/services" className="text-link desktop-only">
                All service details <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ServicesShowcase />
          </Reveal>
        </div>
      </section>

      {/* 3. Selected Work & Concept Studies */}
      <section className="section section-work">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="SELECTED EXPLORATIONS"
                title="Good ideas deserve"
                accent="good execution."
              >
                <span>A look at the kinds of digital experiences we like to shape. These are concept studies demonstrating high-density data, applied AI, and operations pipelines.</span>
              </SectionHeading>
              <Link href="/work" className="text-link desktop-only">
                View all work <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process / Working-Method Section */}
      <section className="section section-approach">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="HOW WE WORK"
                title="Less noise."
                accent="More progress."
              >
                <span>Good technology starts with understanding the problem. We keep the process clear, the collaboration close, and the solution grounded in what people actually need.</span>
              </SectionHeading>
              <Link href="/about" className="text-link desktop-only">
                About our team <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <InteractiveProcessExplorer />
          </Reveal>
        </div>
      </section>

      {/* 5. Differentiating Section: Why Clients Work With AWSAVYA */}
      <section className="section section-differentiators">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="WHY PARTNER WITH US"
                title="Direct studio engagement,"
                accent="built on clarity."
              >
                <span>We combine senior design, clean architecture, and transparent communication so you always know where your project stands.</span>
              </SectionHeading>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
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

      {/* 6. Indicative Scope Estimator Section */}
      <section className="section section-scope-builder">
        <div className="container">
          <Reveal>
            <InteractiveScopeBuilder />
          </Reveal>
        </div>
      </section>

      {/* 7. Clear Final Project-Enquiry Call to Action */}
      <section className="final-cta-section">
        <div className="container">
          <Reveal>
            <div className="final-cta-card">
              <div className="cta-orb cta-orb-one" />
              <div className="cta-orb cta-orb-two" />
              <div className="cta-content">
                <span className="eyebrow">
                  <span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE
                </span>
                <h2>Have a problem<br />worth <span>solving?</span></h2>
                <p>Bring us the idea, the friction, or the process that could work better. We&apos;ll help you find the next step.</p>
                <Link href="/contact" className="button button-dark">
                  Start a project <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="cta-art" aria-hidden="true">
                <div className="cta-art-ring ring-a" />
                <div className="cta-art-ring ring-b" />
                <div className="cta-art-core">A<span>.</span></div>
                <span className="cta-art-node node-a" />
                <span className="cta-art-node node-b" />
                <span className="cta-art-node node-c" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
