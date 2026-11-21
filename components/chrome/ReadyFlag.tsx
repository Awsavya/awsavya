"use client";

import { useEffect } from "react";

declare global { interface Window { __awReady?: boolean } }

/**
 * Tells the head script that hydration happened, so pre-hidden elements are never stranded. Marks html[data-fonts]
 * once the webfonts are in (poster lines may then wrap instead of clip under user text spacing), and ends the
 * first-load landing (html[data-first]) after it has run, so a later navigation never replays it.
 */
export function ReadyFlag() {
  useEffect(() => {
    const html = document.documentElement;
    window.__awReady = true;
    html.removeAttribute("data-js-failed");
    let live = true;
    document.fonts?.ready.then(() => { if (live) html.setAttribute("data-fonts", ""); });
    const t = window.setTimeout(() => html.removeAttribute("data-first"), 1080);
    return () => { live = false; window.clearTimeout(t); };
  }, []);
  return null;
}
