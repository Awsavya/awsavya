import type { Metadata } from "next";
import { ArrowDownRight, Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import InteractiveFaq from "@/components/InteractiveFaq";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with AWSAVYA about your mobile app, website, custom software, applied AI, or automation project.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — AWSAVYA",
    description: "Start a conversation with AWSAVYA about your mobile app, website, custom software, applied AI, or automation project.",
    url: `${siteConfig.canonicalUrl}/contact`,
    siteName: "AWSAVYA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contact — AWSAVYA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — AWSAVYA",
    description: "Start a conversation with AWSAVYA about your mobile app, website, custom software, applied AI, or automation project.",
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
      name: "Contact",
      item: `${siteConfig.canonicalUrl}/contact`,
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${siteConfig.canonicalUrl}/contact#webpage`,
  url: `${siteConfig.canonicalUrl}/contact`,
  name: "Contact AWSAVYA",
  description: "Direct collaboration channel to discuss apps, web, custom software, AI, or automation projects.",
  mainEntity: {
    "@id": `${siteConfig.canonicalUrl}#organization`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is your typical project timeline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our indicative timelines typically follow three sprint formats: approximately 1–2 weeks for an architecture & prototype sprint, approximately 3–6 weeks for a focused MVP release, and approximately 8–12 weeks or longer for larger product suites. Final schedule depends on scope, integrations, and feedback cadence.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle scope and milestones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We agree on defined sprint deliverables before development begins. You receive regular checkpoint updates with access to live staging environments, ensuring complete transparency.",
      },
    },
    {
      "@type": "Question",
      name: "Can you collaborate with our existing team or codebase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We frequently augment existing product teams, modernize frontend architectures (migrating to Next.js or React), or build dedicated AI and automation pipelines connected to existing APIs and databases.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the code and intellectual property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project-specific ownership and handover are governed by the client agreement. Upon project completion, all custom source code, documentation, and design assets developed for your project are transferred to your team.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="contact-hero">
        <div className="container contact-hero-inner">
          <Reveal>
            <span className="eyebrow"><span className="eyebrow-dot" /> LET&apos;S TALK ABOUT WHAT&apos;S NEXT</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>Tell us what<br />you&apos;re <span>thinking.</span></h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p>It can be a clear brief, a rough idea or a frustrating process that needs a better way. We&apos;ll meet you where you are.</p>
          </Reveal>
          <div className="contact-hero-note">
            <ArrowDownRight size={15} /> A few details are enough to start.
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container contact-layout">
          <Reveal>
            <aside className="contact-aside">
              <span className="eyebrow"><span className="eyebrow-dot" /> DIRECT COLLABORATION</span>
              <h2>Good work starts with a good conversation.</h2>
              <p>Share a little context and we&apos;ll follow up to understand the goal, the constraints and what a useful next step might look like.</p>

              <div className="contact-aside-points">
                <div>
                  <span><MessageCircle size={17} /></span>
                  <div>
                    <b>Tell us the context</b>
                    <small>What you&apos;re trying to change, build or automate.</small>
                  </div>
                </div>
                <div>
                  <span><Clock3 size={17} /></span>
                  <div>
                    <b>We get specific</b>
                    <small>Scope, architecture, milestones and timelines.</small>
                  </div>
                </div>
                <div>
                  <span><ShieldCheck size={17} /></span>
                  <div>
                    <b>No pressure to have it all figured out</b>
                    <small>It&apos;s okay to start with raw questions.</small>
                  </div>
                </div>
              </div>

              <div className="contact-aside-smallprint">
                Please don&apos;t include passwords, private API keys or sensitive personal credentials in your initial message.
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="contact-form-column">
              <ContactForm />
            </div>
          </Reveal>
        </div>

        {/* Interactive FAQ Section */}
        <div className="container contact-faq-container">
          <Reveal delay={0.15}>
            <InteractiveFaq />
          </Reveal>
        </div>
      </section>
    </>
  );
}
