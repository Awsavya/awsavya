import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import CapabilitiesCarousel from "@/components/CapabilitiesCarousel";
import InteractiveProcessExplorer from "@/components/InteractiveProcessExplorer";
import InteractiveScopeBuilder from "@/components/InteractiveScopeBuilder";
import { projects, services } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Reveal y={12}>
              <span className="eyebrow">
                <span className="eyebrow-dot pulse-dot" /> A DIGITAL PRODUCT STUDIO
              </span>
            </Reveal>
            <Reveal delay={0.08} y={18}>
              <h1>
                Technology for<br />
                your <span className="headline-accent">next move.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16} y={18}>
              <p className="hero-description">
                We design and build thoughtful apps, websites, custom software and AI-powered systems that make ambitious ideas useful.
              </p>
            </Reveal>
            <Reveal delay={0.24} y={14}>
              <div className="hero-actions">
                <Link href="/contact" className="button button-dark">
                  Let&apos;s build something <ArrowUpRight size={16} />
                </Link>
                <Link href="/services" className="text-link">
                  Explore capabilities <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.32} y={10}>
              <div className="hero-proofline">
                <span className="proof-avatars"><i>A</i><i>W</i><i>S</i></span>
                <span>From first sketch to real-world product</span>
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

      {/* Capabilities Carousel Section */}
      <section className="capabilities-carousel-section" aria-label="AWSAVYA Capabilities Carousel">
        <div className="container">
          <CapabilitiesCarousel />
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-services">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="WHAT WE DO"
                title="Technology, without"
                accent="the unnecessary."
              >
                <span>One connected team for the digital work that helps your business move forward.</span>
              </SectionHeading>
              <Link href="/services" className="text-link desktop-only">
                All capabilities <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal key={service.number} delay={index * 0.055}>
                <ServiceCard service={service} featured={index === 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="section section-work">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="SELECTED EXPLORATIONS"
                title="Good ideas deserve"
                accent="good execution."
              >
                <span>A look at the kinds of digital experiences we like to shape. These are concept studies, not client case studies.</span>
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

      {/* Interactive Process Section */}
      <section className="section section-approach">
        <div className="container">
          <Reveal>
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="HOW WE WORK"
                title="Less noise."
                accent="More progress."
              >
                <span>Good technology starts with understanding the problem. We keep the process clear, the collaboration close and the solution grounded in what people actually need.</span>
              </SectionHeading>
              <Link href="/about" className="text-link desktop-only">
                A little about us <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <InteractiveProcessExplorer />
          </Reveal>
        </div>
      </section>

      {/* Interactive Scope Configurator Section */}
      <section className="section section-scope-builder">
        <div className="container">
          <Reveal>
            <InteractiveScopeBuilder />
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
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
                <p>Bring us the idea, the friction, or the thing that could work better. We&apos;ll help you find the next step.</p>
                <Link href="/contact" className="button button-dark">
                  Tell us about it <ArrowUpRight size={16} />
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
