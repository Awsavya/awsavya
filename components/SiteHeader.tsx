"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site";

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 34 34" fill="none">
        <path d="M7 26.5 15.1 6.8c.6-1.4 2.6-1.4 3.2 0l8.7 20.1" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
        <path d="M11 20.3h13" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
        <path d="M22.5 6.5h5v5" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-header">
      {/* Real-time reading/scroll progress bar */}
      <div
        className="header-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="AWSAVYA home" onClick={() => setMenuOpen(false)}>
          <BrandMark />
          <span className="brand-word">AWSAVYA<span className="brand-period">.</span></span>
        </Link>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                {active && <span className="nav-active-dot" aria-hidden="true" />}
              </Link>
            );
          })}
          <Link href="/contact" className="button button-dark nav-cta" onClick={() => setMenuOpen(false)}>
            Start a project <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
