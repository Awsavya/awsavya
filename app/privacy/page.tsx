import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Lock, Shield, Eye, Database, Trash2, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn about AWSAVYA's data practices, minimal contact data collection, and commitment to transparency.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Reveal>
            <span className="eyebrow"><span className="eyebrow-dot" /> TRANSPARENT &amp; MINIMAL</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>Privacy notice.<br /><span>Clear and straightforward.</span></h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              We practice intentional data minimization. We only collect the information necessary to understand your project and respond to your enquiry.
            </p>
          </Reveal>
          <div className="page-hero-scroll">
            <span>LAST UPDATED: OCTOBER 2026</span>
            <span>TRANSPARENT PRACTICES</span>
          </div>
        </div>
      </section>

      <section className="section privacy-content-section">
        <div className="container privacy-layout">
          <aside className="privacy-toc">
            <span className="privacy-toc-heading">TABLE OF CONTENTS</span>
            <nav className="privacy-toc-links" aria-label="Privacy sections">
              <a href="#summary">1. Overview</a>
              <a href="#collection">2. Information We Collect</a>
              <a href="#usage">3. How Information Is Used</a>
              <a href="#tracking">4. Cookies &amp; Analytics</a>
              <a href="#delivery">5. Email Delivery &amp; Security</a>
              <a href="#retention">6. Retention &amp; Your Choices</a>
              <a href="#contact">7. Privacy Contact</a>
            </nav>
            <div className="privacy-aside-badge">
              <Shield size={16} className="text-blue" />
              <span>We never sell or broker your contact details.</span>
            </div>
          </aside>

          <article className="privacy-body">
            <Reveal>
              <div id="summary" className="privacy-block">
                <span className="privacy-block-num">01</span>
                <h2>Overview</h2>
                <p>
                  AWSAVYA operates this website as an architectural showcase and project enquiry channel. Our approach is grounded in simplicity:
                </p>
                <div className="privacy-pill-highlights">
                  <div><Check size={14} className="text-blue" /><span>No advertising trackers or cross-site behavioral pixels</span></div>
                  <div><Check size={14} className="text-blue" /><span>No data brokering, renting, or automated user profiling</span></div>
                  <div><Check size={14} className="text-blue" /><span>Strict purpose limitation: responding to your project enquiry</span></div>
                  <div><Check size={14} className="text-blue" /><span>Right to request correction or removal of your details anytime</span></div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div id="collection" className="privacy-block">
                <span className="privacy-block-num">02</span>
                <h2>Information We Collect</h2>
                <p>
                  We only receive personal details that you voluntarily submit through our contact form or send directly by email:
                </p>
                <ul>
                  <li><strong>Your name:</strong> To address you in direct conversation.</li>
                  <li><strong>Work email address:</strong> To reply to your project enquiry.</li>
                  <li><strong>Company or organization name (optional):</strong> To understand your business context.</li>
                  <li><strong>Project details and requirements:</strong> To evaluate scope, technical architecture, and timelines.</li>
                </ul>
                <p className="privacy-note">
                  We do not collect sensitive categories of data such as payment card details, government identification, or precise location coordinates.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div id="usage" className="privacy-block">
                <span className="privacy-block-num">03</span>
                <h2>How Information Is Used</h2>
                <p>
                  Your details are used solely for genuine communication regarding the enquiry or project you initiated:
                </p>
                <ul>
                  <li>To review technical requirements and provide indicative architecture, milestones, or estimates.</li>
                  <li>To send follow-up correspondence directly related to your project conversation.</li>
                  <li>We do not add your contact information to unprompted marketing newsletters without explicit consent.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div id="tracking" className="privacy-block">
                <span className="privacy-block-num">04</span>
                <h2>Cookies &amp; Technical Logging</h2>
                <p>
                  This website does not embed third-party advertising cookies, cross-site analytics trackers, or social tracking pixels.
                </p>
                <p>
                  Like most web services, our hosting provider may generate standard technical access logs (including request method, timestamp, user agent, and IP address) for basic operational security, DDoS mitigation, and diagnostic rate-limiting.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div id="delivery" className="privacy-block">
                <span className="privacy-block-num">05</span>
                <h2>Email Delivery &amp; Encryption</h2>
                <p>
                  Form submissions are transmitted to our server endpoints over encrypted connections (HTTPS).
                </p>
                <p>
                  When email delivery is active, messages are routed server-side through our email infrastructure provider (Resend) directly to our studio inbox. Server-side secrets and API keys are never exposed in client bundles.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div id="retention" className="privacy-block">
                <span className="privacy-block-num">06</span>
                <h2>Data Retention &amp; Your Choices</h2>
                <p>
                  We keep enquiry correspondence only as long as needed to discuss your project or maintain an active business relationship. If an enquiry does not lead to an engagement, correspondence is periodically archived or deleted.
                </p>
                <div className="rights-grid">
                  <div className="right-card">
                    <Eye size={18} className="text-blue" />
                    <h4>Access</h4>
                    <p>You may request a copy of the communication records associated with your email address.</p>
                  </div>
                  <div className="right-card">
                    <Database size={18} className="text-blue" />
                    <h4>Correction</h4>
                    <p>You may request updates or corrections to any outdated or inaccurate details.</p>
                  </div>
                  <div className="right-card">
                    <Trash2 size={18} className="text-blue" />
                    <h4>Deletion</h4>
                    <p>You may request that your contact details and message history be permanently deleted.</p>
                  </div>
                  <div className="right-card">
                    <Lock size={18} className="text-blue" />
                    <h4>Communication Pause</h4>
                    <p>You may ask us to discontinue project correspondence at any time.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div id="contact" className="privacy-block">
                <span className="privacy-block-num">07</span>
                <h2>Privacy Contact</h2>
                <p>
                  If you have questions about our data practices or wish to request the deletion of your contact records, please reach out to us:
                </p>
                <div className="privacy-contact-box">
                  <Mail size={18} className="text-blue" />
                  <div>
                    <strong>AWSAVYA Contact</strong>
                    <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-link">{siteConfig.email}</a></p>
                  </div>
                </div>
                <div className="privacy-back-link">
                  <Link href="/" className="button button-dark">
                    <ArrowLeft size={15} /> Return to homepage
                  </Link>
                </div>
              </div>
            </Reveal>
          </article>
        </div>
      </section>
    </>
  );
}
