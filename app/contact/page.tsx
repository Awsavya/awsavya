import type { Metadata } from "next";
import { ArrowDownRight, Clock3, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import InteractiveFaq from "@/components/InteractiveFaq";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell AWSAVYA about your app, website, software, AI or automation project.",
};

export default function ContactPage() {
  return (
    <>
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
