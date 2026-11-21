"use client";

import { useEffect } from "react";

// The path this module last saw. Null on the first load, so the first paint never moves focus.
let lastPath: string | null = null;

/** After a client-side route change, moves focus to the new page's H1 (tabIndex -1, no ring). */
export function RouteFocus() {
  useEffect(() => {
    const path = location.pathname;
    if (lastPath === null || lastPath === path) { lastPath = path; return; }
    lastPath = path;
    requestAnimationFrame(() => document.querySelector<HTMLElement>("main h1")?.focus({ preventScroll: true }));
  }, []);
  return null;
}
