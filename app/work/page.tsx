import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import WorkShowcase from "@/components/WorkShowcase";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Explore real engineering studies from AWSAVYA: TripSplit offline Android app, Build2Buzz grounded AI publisher, Har Apparels factory ERP, and QuicklyCart.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work & Case Studies — AWSAVYA",
    description:
      "Explore real engineering studies from AWSAVYA: TripSplit offline Android app, Build2Buzz grounded AI publisher, Har Apparels factory ERP, and QuicklyCart.",
    url: `${siteConfig.canonicalUrl}/work`,
    siteName: "AWSAVYA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Work & Case Studies — AWSAVYA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work & Case Studies — AWSAVYA",
    description:
      "Explore real engineering studies from AWSAVYA: TripSplit offline Android app, Build2Buzz grounded AI publisher, Har Apparels factory ERP, and QuicklyCart.",
    images: ["/opengraph-image"],
  },
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
      name: "Work & Case Studies",
      item: `${siteConfig.canonicalUrl}/work`,
    },
  ],
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteConfig.canonicalUrl}/work#portfolio`,
  name: "AWSAVYA Engineering Studies & Projects",
  description:
    "Real engineering explorations across offline-first mobile architecture, evidence-grounded AI publishing pipelines, manufacturing ERP systems, and multi-vendor commerce engines.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "SoftwareApplication",
        name: "TripSplit",
        operatingSystem: "Android",
        applicationCategory: "FinanceApplication",
        description: "Offline-first group expense sharing and optimal debt settlement engine built with Jetpack Compose, Room SQLite, and Firebase Cloud Firestore.",
        url: `${siteConfig.canonicalUrl}/work#tripsplit`,
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "SoftwareApplication",
        name: "Build2Buzz",
        operatingSystem: "Cross-platform",
        applicationCategory: "BusinessApplication",
        description: "Grounded AI content generation engine pairing repository README inspection with headless browser demo observations to eliminate AI hallucinations.",
        url: `${siteConfig.canonicalUrl}/work#build2buzz`,
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "SoftwareApplication",
        name: "Har Apparels",
        operatingSystem: "Android",
        applicationCategory: "BusinessApplication",
        description: "Shop-floor operations and batch tracking ERP tailored for denim manufacturing facilities, tracking raw fabric rolls, work orders, and shift reconciliation.",
        url: `${siteConfig.canonicalUrl}/work#har-apparels`,
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "SoftwareApplication",
        name: "QuicklyCart",
        operatingSystem: "Web",
        applicationCategory: "ShoppingApplication",
        description: "Full-stack multi-vendor local commerce engine coordinating four distinct user roles through state-safe order lifecycles and last-mile rider dispatch.",
        url: `${siteConfig.canonicalUrl}/work#quicklycart`,
      },
    },
  ],
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
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
