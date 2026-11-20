"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { applyMotionAttribute, useMotionOff } from "@/lib/motion";

// Animations run on every device by default. If a visitor turns motion off (footer toggle),
// Motion keeps opacity fades and drops movement ("always" = always reduce).
export default function MotionProvider({ children }: { children: ReactNode }) {
  const off = useMotionOff();
  useEffect(() => { applyMotionAttribute(); }, []);
  return (
    <MotionConfig reducedMotion={off ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
