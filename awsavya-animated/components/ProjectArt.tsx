"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import type { projects } from "@/lib/site";

type Project = (typeof projects)[number];
export function ProjectArt({project}:{project:Project}) {
  const rotateX = useMotionValue(0), rotateY = useMotionValue(0);
  const pointerX = useMotionValue(0), pointerY = useMotionValue(0);
  const tiltX = useSpring(rotateX, { stiffness: 95, damping: 18 });
  const tiltY = useSpring(rotateY, { stiffness: 95, damping: 18 });
  const previewX = useSpring(pointerX, { stiffness: 250, damping: 23 });
  const previewY = useSpring(pointerY, { stiffness: 250, damping: 23 });
  const reduced = useReducedMotion();
  function move(event:PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - .5) * 9);
    rotateX.set((.5 - (event.clientY - rect.top) / rect.height) * 9);
    pointerX.set(event.clientX - rect.left - 38);
    pointerY.set(event.clientY - rect.top - 38);
  }
  return <motion.div className={`project-art art-${project.theme}`} aria-hidden="true" style={{ rotateX: tiltX, rotateY: tiltY }} onPointerMove={move} onPointerLeave={() => { rotateX.set(0); rotateY.set(0); }} whileHover={reduced ? undefined : { scale: 1.025 }}><div className="art-grid"/><div className="art-halo"/><div className="art-object"><i/><i/><i/></div><div className="art-caption"><span>AWSAVYA / STUDY {project.number}</span><strong>{project.name}</strong><span>CONCEPT STUDY ↗</span></div><motion.div className="art-view" style={{ left: previewX, top: previewY }}>VIEW STUDY ↗</motion.div></motion.div>;
}
