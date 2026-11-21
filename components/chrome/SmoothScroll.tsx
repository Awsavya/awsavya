"use client";

import { useEffect, useSyncExternalStore } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { useMotionOff } from "@/lib/motion";

let lenis: Lenis | null = null;
/** The live Lenis instance, or null (coarse pointer, Motion Off, or not mounted). Listen for "awsavya-lenis" to hear it change. */
export function getLenis(): Lenis | null { return lenis; }

const FINE = "(pointer: fine)";
function subscribeFine(cb: () => void) {
  const mq = matchMedia(FINE); mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Smooth wheel scrolling on fine pointers with motion on. Coarse pointers and Motion Off keep native scroll. */
export function SmoothScroll(): null {
  const off = useMotionOff();
  const fine = useSyncExternalStore(subscribeFine, () => matchMedia(FINE).matches, () => false);

  useEffect(() => {
    if (off || !fine) return;
    // The site's one opt-out is the Motion toggle, so Lenis must not switch itself off from the OS setting.
    const l = new Lenis({ autoRaf: false, anchors: true, smoothWheel: true, duration: 1.08, stopInertiaOnNavigate: true, respectReducedMotion: false });
    lenis = l;
    window.dispatchEvent(new CustomEvent("awsavya-lenis", { detail: l }));
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const onMenu = (e: Event) => { if ((e as CustomEvent<boolean>).detail) l.stop(); else l.start(); };
    window.addEventListener("awsavya-menu", onMenu);
    if (document.documentElement.classList.contains("menu-open")) l.stop();
    return () => {
      window.removeEventListener("awsavya-menu", onMenu);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      l.destroy();
      lenis = null;
      window.dispatchEvent(new CustomEvent("awsavya-lenis", { detail: null }));
    };
  }, [off, fine]);

  return null;
}
