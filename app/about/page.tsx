import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Compass, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import InteractiveAnatomy from "@/components/InteractiveAnatomy";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about AWSAVYA's engineering approach: bringing Apps, Web, Software, AI, and Automation together with clarity and intention.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — AWSAVYA",
    description: "Learn about AWSAVYA's engineering approach: bringing Apps, Web, Software, AI, and Automation together with clarity and intention.",
    url: `${siteConfig.canonicalUrl}/about`,
    siteName: "AWSAVYA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "About — AWSAVYA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — AWSAVYA",
    description: "Learn about AWSAVYA's engineering approach: bringing Apps, Web, Software, AI, and Automation together with clarity and intention.",
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
      name: "About",
      item: `${siteConfig.canonicalUrl}/about`,
    },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteConfig.canonicalUrl}/about#webpage`,
  url: `${siteConfig.canonicalUrl}/about`,
  name: "About AWSAVYA",
  description: "AWSAVYA brings together our focus areas: Apps, Web, Software, AI, and Automation, founded with a clear focus on useful technology.",
  mainEntity: {
    "@id": `${siteConfig.canonicalUrl}#organization`,
  },
};

const principles = [
  {
    icon: Compass,
    title: "Start with the why",
    body: "A tool is only useful when it solves the right problem. We make space for the questions before jumping into the build.",
    highlight: "Define the problem space first",
  },
  {
    icon: Lightbulb,
    title: "Clarity over complexity",
    body: "The best solution is not always the most complicated one. We prefer clear experiences, sensible technology and deliberate choices.",
    highlight: "Sensible architecture, zero bloat",
  },
  {
    icon: ShieldCheck,
    title: "Build with care",
    body: "Performance, accessibility, privacy and maintainability belong in the plan from the beginning, not as last-minute fixes.",
    highlight: "Accessible & production-grade",
  },
  {
    icon: Sparkles,
    title: "Keep improving",
    body: "A launch is a milestone, not the finish line. We look for practical ways to learn, refine and make the product more useful.",
    highlight: "Iterative telemetry & refinement",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="page-hero page-hero-about">
        <div className="container page-hero-inner">
          <Reveal>
            <span className="eyebrow"><span className="eyebrow-dot" /> A LITTLE ABOUT AWSAVYA</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>Technology should<br />make things <span>better.</span></h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p>We bring apps, web, software, AI and automation together around one simple idea: technology should make meaningful work easier to do.</p>
          </Reveal>
          <Reveal delay={0.22}>
            <Link href="/contact" className="button button-dark">
              Meet us through a project <ArrowUpRight size={16} />
            </Link>
          </Reveal>
          <div className="page-hero-scroll">
            <span>OUR PRINCIPLES & VALUES</span>
            <span>BUILT WITH INTENTION</span>
          </div>
        </div>
      </section>

      {/* Interactive Name & Anatomy Section */}
      <section className="section about-story-section">
        <div className="container about-story-grid">
          <Reveal>
            <div className="about-story-label">
              <span className="eyebrow"><span className="eyebrow-dot" /> THE ANATOMY</span>
              <div className="about-name-lockup">AWSAVYA<span>.</span></div>
              <p>Seven letters. One connected ambition.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="about-story-copy">
              <h2>A name built from the things we want to make possible.</h2>
              <p>
                AWSAVYA brings together our focus areas: <strong>A</strong>pps, <strong>W</strong>eb, <strong>S</strong>oftware, <strong>A</strong>I and <strong>A</strong>utomation, with <strong>V</strong> and <strong>Y</strong> representing the founders Vivek &amp; Yash.
              </p>
              <p>
                Digital work rarely lives in a single box. A thoughtful website may connect to custom software. An app may be made more useful by AI. Automation may give a team hours back. The pieces should work together seamlessly.
              </p>
              
              {/* Interactive letter breakdown component */}
              <div className="anatomy-container-mount">
                <InteractiveAnatomy />
              </div>

              <div className="about-pill-row">
                <span><Check size={13} className="text-blue" /> Product-minded</span>
                <span><Check size={13} className="text-blue" /> Detail-led</span>
                <span><Check size={13} className="text-blue" /> Practical by design</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles Section */}
      <section className="section about-principles-section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="WHAT GUIDES US"
              title="Thoughtful by design."
              accent="Useful by nature."
            >
              <span>These principles shape the choices we make, from the first conversation to the details of the final experience.</span>
            </SectionHeading>
          </Reveal>
          <div className="principles-grid">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Reveal key={principle.title} delay={index * 0.06}>
                  <article className="principle-card">
                    <span className="principle-icon">
                      <Icon size={22} strokeWidth={1.7} />
                    </span>
                    <span className="principle-number">0{index + 1}</span>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                    <span className="principle-highlight">
                      <Sparkles size={11} className="text-blue" /> {principle.highlight}
                    </span>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* End Callout */}
      <section className="about-end-section">
        <div className="container about-end-card">
          <div className="about-end-mark">A<span>.</span></div>
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" /> THE WORK AHEAD</span>
            <h2>Let&apos;s build something that earns its place.</h2>
            <p>Tell us what you want to improve, create or rethink. We&apos;ll start with the problem and work toward a useful next step.</p>
            <Link href="/contact" className="button button-dark">
              Start a conversation <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
