"use client";

import { setMotionOff, useMotionOff } from "@/lib/motion";

// Accessibility escape hatch: animations run for everyone, and anyone who needs calm can turn them off here.
export function MotionToggle() {
  const off = useMotionOff();
  return <button type="button" className="motion-toggle" aria-pressed={!off} onClick={() => { setMotionOff(!off); location.reload(); }}>
    Motion: {off ? "Off" : "On"}
  </button>;
}
