"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowUp, Sparkles, Mail } from "lucide-react";

export default function SiteFooter() {
  function scrollToTop(e: React.MouseEvent) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-message">
            <span className="eyebrow"><span className="eyebrow-dot" /> READY WHEN YOU ARE</span>
            <h2>Something good<br /><span>starts with a conversation.</span></h2>
            <Link href="/contact" className="button button-light">
              Let&apos;s talk <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="footer-side">
            <Link href="/" className="footer-brand">AWSAVYA<span>.</span></Link>
            <p>Digital products, custom software, AI and automated systems made with intention.</p>
            <a href="mailto:hello@awsavya.in" className="footer-email-link">
              <Mail size={13} /> hello@awsavya.in
            </a>
            <div className="footer-links">
              <Link href="/services">Services</Link>
              <Link href="/work">Work</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
            <a
              className="back-top"
              href="#top"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={17} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AWSAVYA. All rights reserved.</span>
          <span>Apps · Web · Software · AI · Automation</span>
          <span className="footer-location">
            <span className="status-dot" /> <Sparkles size={11} className="text-blue" /> Building what&apos;s useful
          </span>
        </div>
      </div>
    </footer>
  );
}
