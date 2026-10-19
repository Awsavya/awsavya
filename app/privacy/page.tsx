import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check, Lock, Shield, Eye, Database, Trash2, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how AWSAVYA protects your privacy with strict data minimization and zero tracking.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <Reveal>
            <span className="eyebrow"><span className="eyebrow-dot" /> TRANSPARENT & MINIMAL</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>Privacy by design.<br /><span>Not an afterthought.</span></h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              We believe great digital products earn trust through radical transparency. We collect only what is strictly necessary to communicate with you about your project.
            </p>
          </Reveal>
          <div className="page-hero-scroll">
            <span>LAST UPDATED: OCTOBER 2026</span>
            <span>GDPR &amp; CCPA COMPLIANT</span>
          </div>
        </div>
      </section>

      <section className="section privacy-content-section">
        <div className="container privacy-layout">
          <aside className="privacy-toc">
            <span className="privacy-toc-heading">TABLE OF CONTENTS</span>
            <nav className="privacy-toc-links" aria-label="Privacy sections">
              <a href="#summary">1. Executive Summary</a>
              <a href="#collection">2. Data We Collect</a>
              <a href="#usage">3. How We Use Data</a>
              <a href="#tracking">4. Zero Tracking Guarantee</a>
              <a href="#retention">5. Retention &amp; Security</a>
              <a href="#rights">6. Your Data Rights</a>
              <a href="#contact">7. Privacy Contact</a>
            </nav>
            <div className="privacy-aside-badge">
              <Shield size={16} className="text-blue" />
              <span>We never sell or broker your personal data. Ever.</span>
            </div>
          </aside>

          <article className="privacy-body">
            <Reveal>
              <div id="summary" className="privacy-block">
                <span className="privacy-block-num">01</span>
                <h2>Executive Summary</h2>
                <p>
                  AWSAVYA operates this website as an architectural showcase and project contact portal. We practice <strong>Privacy by Design (GDPR Article 25)</strong>:
                </p>
                <div className="privacy-pill-highlights">
                  <div><Check size={14} className="text-blue" /><span>No third-party tracking or advertising cookies</span></div>
                  <div><Check size={14} className="text-blue" /><span>No data selling, renting, or algorithmic profiling</span></div>
                  <div><Check size={14} className="text-blue" /><span>Strict purpose limitation: contact inquiries only</span></div>
                  <div><Check size={14} className="text-blue" /><span>Full user rights: access, modify, or erase anytime</span></div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div id="collection" className="privacy-block">
                <span className="privacy-block-num">02</span>
                <h2>Data We Collect</h2>
                <p>
                  We only receive personal information that you intentionally provide to us through our direct contact form or email correspondence:
                </p>
                <ul>
                  <li><strong>Your name:</strong> Used to address you in direct conversation.</li>
                  <li><strong>Work email address:</strong> Used to reply to your project inquiry.</li>
                  <li><strong>Company or organization name (optional):</strong> Used to understand your business domain.</li>
                  <li><strong>Project focus and message:</strong> Used to assess project scope, technical requirements, and timeline.</li>
                </ul>
                <p className="privacy-note">
                  We do not collect government IDs, financial payment details, precise geolocation coordinates, or biometric information.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div id="usage" className="privacy-block">
                <span className="privacy-block-num">03</span>
                <h2>How We Use Your Data</h2>
                <p>
                  Your information is used solely for genuine business communication regarding the project or inquiry you initiated:
                </p>
                <ul>
                  <li>To review your requirements and provide architectural feedback or scheduling options.</li>
                  <li>To send follow-up correspondence relevant to your specific inquiry.</li>
                  <li>We never add your email address to unprompted marketing newsletters without explicit, affirmative consent.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div id="tracking" className="privacy-block">
                <span className="privacy-block-num">04</span>
                <h2>Zero Tracking &amp; Analytics Guarantee</h2>
                <p>
                  We do not embed invasive cross-site advertising pixels, behavioral re-targeting scripts, or third-party trackers.
                </p>
                <p>
                  Our server logs are retained only temporarily for critical security monitoring, DDoS mitigation, and error diagnosis, with IP addresses anonymized.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div id="retention" className="privacy-block">
                <span className="privacy-block-num">05</span>
                <h2>Data Retention &amp; Security</h2>
                <p>
                  All data submitted through our contact portal is encrypted in transit using modern <strong>TLS 1.3 / HTTPS encryption</strong>.
                </p>
                <p>
                  Inquiries are retained only as long as active communication or a client agreement is in progress. If an inquiry does not result in an active partnership, contact correspondence is periodically purged from our systems.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div id="rights" className="privacy-block">
                <span className="privacy-block-num">06</span>
                <h2>Your Rights Under GDPR &amp; CCPA</h2>
                <p>Regardless of your geographical location, we honor complete privacy autonomy:</p>
                <div className="rights-grid">
                  <div className="right-card">
                    <Eye size={18} className="text-blue" />
                    <h4>Right of Access</h4>
                    <p>You can request a complete copy of any data we hold associated with your email.</p>
                  </div>
                  <div className="right-card">
                    <Database size={18} className="text-blue" />
                    <h4>Right of Rectification</h4>
                    <p>You can request updates or corrections to any outdated or inaccurate information.</p>
                  </div>
                  <div className="right-card">
                    <Trash2 size={18} className="text-blue" />
                    <h4>Right of Erasure</h4>
                    <p>You can request that your contact data and correspondence be permanently deleted.</p>
                  </div>
                  <div className="right-card">
                    <Lock size={18} className="text-blue" />
                    <h4>Right to Restrict</h4>
                    <p>You can withdraw consent for any ongoing communication at any time.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div id="contact" className="privacy-block">
                <span className="privacy-block-num">07</span>
                <h2>Contact Our Privacy Team</h2>
                <p>
                  If you have questions about this policy or wish to exercise your data rights, reach out directly:
                </p>
                <div className="privacy-contact-box">
                  <Mail size={18} className="text-blue" />
                  <div>
                    <strong>AWSAVYA Privacy &amp; Data Governance</strong>
                    <p>Email: <a href="mailto:privacy@awsavya.in" className="text-link">privacy@awsavya.in</a></p>
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
