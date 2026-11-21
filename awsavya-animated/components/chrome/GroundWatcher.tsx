"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "main [data-ground], footer[data-ground]";

/**
 * Keeps the sticky header legible: writes html[data-header-ground] = the ground under a 1px line through
 * the header's middle. Nested grounds win over their parents (e.g. the hero's Ink baseline bar).
 * At the very top nothing is under that line yet, so the header takes the first section's ground.
 * Re-checks on resize, route change and the "awsavya-ground" event (runtime ground changes).
 */
export function GroundWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const inLine = new Set<Element>();
    let io: IntersectionObserver | null = null;
    let raf = 0;

    const write = () => {
      let pick: Element | null = null;
      for (const el of inLine) {
        if (!el.isConnected) { inLine.delete(el); continue; }
        if (!pick || pick.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) pick = el;
      }
      if (!pick) {
        const first = document.querySelector(SELECTOR);
        const hh = document.querySelector(".hdr")?.getBoundingClientRect().height ?? 64;
        if (first && first.getBoundingClientRect().top >= hh / 2) pick = first;
      }
      const g = pick?.getAttribute("data-ground") || "paper";
      if (html.dataset.headerGround !== g) html.dataset.headerGround = g;
    };

    const build = () => {
      io?.disconnect();
      inLine.clear();
      const hh = document.querySelector(".hdr")?.getBoundingClientRect().height ?? 64;
      const top = Math.round(hh / 2);
      const bottom = Math.max(0, window.innerHeight - top - 1);
      const observer = new IntersectionObserver(entries => {
        for (const e of entries) { if (e.isIntersecting) inLine.add(e.target); else inLine.delete(e.target); }
        write();
      }, { rootMargin: `-${top}px 0px -${bottom}px 0px` });
      document.querySelectorAll(SELECTOR).forEach(el => observer.observe(el));
      io = observer; // its first callback (one per observed element) writes the ground
    };

    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(build); };
    schedule();
    window.addEventListener("resize", schedule);
    window.addEventListener("awsavya-ground", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("awsavya-ground", schedule);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
