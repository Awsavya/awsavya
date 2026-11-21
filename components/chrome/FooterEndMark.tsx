"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * The page's one "done" mark: a Stamp Lift bar one column wide under the last A. It draws (0.54s DRIVE, CSS)
 * the first time the footer is 60% visible on each page; with Motion Off it fades in (0.18s). Hidden on the 404.
 */
export function FooterEndMark() {
  const ref = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    const ftr = el?.closest("footer");
    if (!el || !ftr) return;
    // New page: reset to undrawn without playing the bar backwards.
    el.setAttribute("data-snap", "");
    el.removeAttribute("data-drawn");
    el.getBoundingClientRect();
    el.removeAttribute("data-snap");
    // A footer taller than the viewport can never be 60% visible, so cap the threshold at what fits.
    const threshold = Math.min(.6, (window.innerHeight / Math.max(1, ftr.offsetHeight)) * .9);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= threshold - .01) { el.setAttribute("data-drawn", ""); io.disconnect(); }
    }, { threshold });
    io.observe(ftr);
    return () => io.disconnect();
  }, [pathname]);

  return <span ref={ref} className="ftr-done" aria-hidden="true" />;
}
