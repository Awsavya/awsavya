"use client";

import { motion } from "motion/react";
import type { projects } from "@/lib/site";
import { useMotionOff } from "@/lib/motion";

type Project = (typeof projects)[number];
const frames = [
  { number: "01", title: "System logic", kind: "system" },
  { number: "02", title: "Interface direction", kind: "interface" },
  { number: "03", title: "Interaction detail", kind: "detail" },
] as const;
export function StudyGallery({ project }: { project: Project }) {
  const reduced = useMotionOff();
  return <div className="study-gallery" aria-label={`${project.name} concept study visual gallery`}>
    {frames.map(frame => <motion.figure key={frame.number} className={`study-figure art-${project.theme} study-${frame.kind}`} whileHover={reduced ? undefined : { y: -10, rotateY: frame.number === "02" ? -3 : 3 }} transition={{ type: "spring", stiffness: 180, damping: 20 }}>
      <div className="study-visual" aria-hidden="true"><div className="study-guide"/><div className="study-main-shape"/><div className="study-secondary-shape"/><div className="study-node node-a"/><div className="study-node node-b"/><div className="study-node node-c"/><span className="study-index">{project.name.toUpperCase()} / {frame.number}</span></div>
      <figcaption><span>{frame.number} / 03</span><strong>{frame.title}</strong></figcaption>
    </motion.figure>)}
  </div>;
}
