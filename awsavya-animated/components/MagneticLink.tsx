"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { ReactNode, PointerEvent } from "react";

const MotionLink = motion.create(Link);
export function MagneticLink({ href, className, children, cursor }: { href: string; className: string; children: ReactNode; cursor?: string }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });
  const reduced = useReducedMotion();
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * .15);
    y.set((event.clientY - rect.top - rect.height / 2) * .15);
  }
  return <MotionLink href={href} className={className} data-cursor={cursor} style={{ x: springX, y: springY }} whileHover={reduced ? undefined : { scale: 1.045 }} whileTap={reduced ? undefined : { scale: .97 }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</MotionLink>;
}
