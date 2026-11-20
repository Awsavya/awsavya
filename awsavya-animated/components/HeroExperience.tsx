"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HeroMotionState } from "./HeroScene";
import { introDelay } from "@/lib/intro";
import { motionOff } from "@/lib/motion";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export function HeroExperience() {
  const [quality, setQuality] = useState<"none" | "low" | "high">("none");
  const [visible, setVisible] = useState(true);
  const motion = useRef<HeroMotionState>({ progress: 0, pointerX: 0, pointerY: 0, hovering: false });
  useEffect(() => {
    const reduced = motionOff();
    const canRender = !!document.createElement("canvas").getContext("webgl2");
    const qualityFrame = requestAnimationFrame(() => { if (!reduced && canRender) setQuality(matchMedia("(max-width: 750px)").matches ? "low" : "high"); });
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero || reduced) return () => cancelAnimationFrame(qualityFrame);
    gsap.registerPlugin(ScrollTrigger);
    const move = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      motion.current.pointerX = ((event.clientX - rect.left) / rect.width - .5) * 2;
      motion.current.pointerY = (.5 - (event.clientY - rect.top) / rect.height) * 2;
      motion.current.hovering = true;
    };
    const leave = () => { motion.current.hovering = false; motion.current.pointerX = 0; motion.current.pointerY = 0; };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    const visibility = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting), { rootMargin: "100px" });
    visibility.observe(hero);
    const intro = introDelay();
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-letter", { yPercent: 125, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.05, stagger: .06, ease: "power4.out", delay: intro + .15 });
      gsap.fromTo(".hero-title-sub, .hero-description, .hero-actions", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .9, stagger: .1, ease: "power3.out", delay: intro + .45 });
      const timeline = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "+=135%", pin: true, scrub: .7, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: self => { motion.current.progress = self.progress; } } });
      timeline.to(".universe-canvas", { scale: 1.35, xPercent: -10, ease: "none" }, 0)
        .to(".hero-letter", { yPercent: -150, x: (_, target) => (Number((target as HTMLElement).dataset.index) - 3) * 13, rotationZ: -8, opacity: 0, stagger: .02, ease: "none" }, .25)
        .to(".hero-title-sub, .hero-description, .hero-actions", { y: -85, opacity: 0, stagger: .04, ease: "none" }, .2)
        .to(".hero-bottomline, .hero-topline", { opacity: 0, ease: "none" }, .6)
        .to(hero, { backgroundColor: "#142935", ease: "none" }, .2);
    }, hero);
    return () => { cancelAnimationFrame(qualityFrame); hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); visibility.disconnect(); ctx.revert(); };
  }, []);
  return <div className={`universe-canvas scene-quality-${quality}`} aria-hidden="true" data-cursor="EXPLORE">
    {quality === "none" ? <div className="canvas-fallback" /> : <HeroScene motion={motion} count={quality === "high" ? 2600 : 850} active={visible} />}
  </div>;
}
