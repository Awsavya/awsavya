"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.08, anchors: true, smoothWheel: true, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const onMenu = (event: Event) => { if ((event as CustomEvent<boolean>).detail) lenis.stop(); else lenis.start(); };
    window.addEventListener("awsavya-menu", onMenu);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => { gsap.ticker.remove(tick); window.removeEventListener("awsavya-menu", onMenu); lenis.off("scroll", ScrollTrigger.update); lenis.destroy(); };
  }, []);
  return null;
}
