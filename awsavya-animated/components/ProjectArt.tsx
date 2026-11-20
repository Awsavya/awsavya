"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import gsap from "gsap";
import type { projects } from "@/lib/site";
import { useMotionOff } from "@/lib/motion";

type Project = (typeof projects)[number];
export function ProjectArt({project}:{project:Project}) {
  const rotateX = useMotionValue(0), rotateY = useMotionValue(0);
  const pointerX = useMotionValue(0), pointerY = useMotionValue(0);
  const tiltX = useSpring(rotateX, { stiffness: 95, damping: 18 });
  const tiltY = useSpring(rotateY, { stiffness: 95, damping: 18 });
  const previewX = useSpring(pointerX, { stiffness: 250, damping: 23 });
  const previewY = useSpring(pointerY, { stiffness: 250, damping: 23 });
  const reduced = useMotionOff();
  function move(event:PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - .5) * 9);
    rotateX.set((.5 - (event.clientY - rect.top) / rect.height) * 9);
    pointerX.set(event.clientX - rect.left - 38);
    pointerY.set(event.clientY - rect.top - 38);
  }
  // Liquid ripple: the shared SVG filter (defined in SiteShell) is applied only to the hovered card while its displacement swells and settles.
  function ripple(event:PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const card = event.currentTarget;
    card.classList.add("is-liquid");
    gsap.killTweensOf(["#awsavya-liquid-map", "#awsavya-liquid-noise"]);
    gsap.timeline({ onComplete: () => card.classList.remove("is-liquid") })
      .fromTo("#awsavya-liquid-map", { attr: { scale: 0 } }, { attr: { scale: 55 }, duration: .35, ease: "power2.out" })
      .fromTo("#awsavya-liquid-noise", { attr: { baseFrequency: "0.012 0.018" } }, { attr: { baseFrequency: "0.02 0.032" }, duration: 1.4, ease: "sine.out" }, 0)
      .to("#awsavya-liquid-map", { attr: { scale: 0 }, duration: 1.1, ease: "power3.out" }, .35);
  }
  return <motion.div className={`project-art art-${project.theme}`} aria-hidden="true" style={{ rotateX: tiltX, rotateY: tiltY }} onPointerEnter={ripple} onPointerMove={move} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }} whileHover={reduced ? undefined : { scale: 1.025 }}><div className="art-grid"/><div className="art-halo"/><div className="art-object"><i/><i/><i/></div><div className="art-caption"><span>AWSAVYA / STUDY {project.number}</span><strong>{project.name}</strong><span>CONCEPT STUDY ↗</span></div><motion.div className="art-view" style={{ left: previewX, top: previewY }}>VIEW STUDY ↗</motion.div></motion.div>;
}
