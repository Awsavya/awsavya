"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Server and client always render the same initial state, so hydration matches.
// If a visitor turns motion off (footer toggle), MotionProvider drops the slide and keeps the fade.
export function AnimatedReveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
