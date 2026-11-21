"use client";

import Link from "next/link";
import { useMotionOff } from "@/lib/motion";

type Props = Omit<React.ComponentProps<typeof Link>, "transitionTypes" | "onNavigate">;

/**
 * The only way to link internally. Tags the navigation "deliver" (or "quick" with Motion off) and records
 * the clicked link's box, so the destination page floods out of that exact row (see chrome.css, deliver-in).
 */
export function DeliverLink({ onClick, ...rest }: Props) {
  const off = useMotionOff();
  return (
    <Link
      {...rest}
      transitionTypes={off ? ["quick"] : ["deliver"]}
      onClick={e => {
        if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
          const r = e.currentTarget.getBoundingClientRect();
          const hh = document.querySelector(".hdr")?.getBoundingClientRect().height ?? 64;
          const s = document.documentElement.style;
          s.setProperty("--vt-x", `${Math.max(0, r.left)}px`);
          s.setProperty("--vt-w", `${r.width}px`);
          s.setProperty("--vt-y", `${Math.max(0, r.top - hh)}px`);
          s.setProperty("--vt-h", `${r.height}px`);
        }
        onClick?.(e);
      }}
    />
  );
}
