import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import WorkShowcase from "@/components/WorkShowcase";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work & Concepts",
  description:
    "Explore interactive concept studies from AWSAVYA across product design, high-density data, applied AI, and operations.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work & Concepts — AWSAVYA",
    description:
      "Explore interactive concept studies from AWSAVYA across product design, high-density data, applied AI, and operations.",
    url: `${siteConfig.canonicalUrl}/work`,
    siteName: "AWSAVYA",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work & Concepts — AWSAVYA",
    description:
      "Explore interactive concept studies from AWSAVYA across product design, high-density data, applied AI, and operations.",
  },
};

export default function WorkPage() {
  return (
    <>
      <section className="page-hero page-hero-work">
        <div className="container page-hero-inner">
          <Reveal>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> PROOF OF CRAFT &amp; ARCHITECTURAL DISCIPLINE
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>
              Digital products designed with<br />
              <span>intention and clarity.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              A series of functional engineering studies demonstrating how we architect offline-first mobile apps,
              grounded AI pipelines, industrial ERPs, and multi-vendor platforms.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="page-hero-meta-row">
              <span className="hero-status-pill">
                <span className="pulse-dot-mini" /> ALL FOUR STUDIES TESTABLE LIVE
              </span>
              <span className="hero-pill-note">
                Labelled as Concept study • Zero fictional client claims
              </span>
            </div>
          </Reveal>
          <div className="page-hero-scroll">
            <span>
              <ArrowDownRight size={14} /> Test interactive prototypes below
            </span>
            <span>01 — 04 SELECTED STUDIES</span>
          </div>
        </div>
      </section>

      {/* Main Work Showcase Section */}
      <section className="section work-showcase-section">
        <div className="container">
          <Reveal>
            <WorkShowcase />
          </Reveal>
        </div>
      </section>

      {/* Conversion Section with grounded sprint wording */}
      <section className="simple-cta-section">
        <div className="container simple-cta-inner">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" /> FLEXIBLE, SPRINT-BASED ENGAGEMENT
            </span>
            <h2>Have an idea you want to make real?</h2>
            <p>
              From an initial architecture sprint to a focused MVP launch, we tailor our process around your specific timeline and scope with clear milestones and direct collaboration.
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
