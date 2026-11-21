import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useMotionOff } from "./motion";

/** The two house curves. SETTLE = arriving at a state (3% overshoot). DRIVE = travelling. Bars never use SETTLE. */
export const SETTLE = "settle", DRIVE = "drive";
/** The 180ms beat. No other durations exist. */
export const D = { d1: .18, d2: .36, d3: .54, d4: .72, d6: 1.08 } as const;
export const STAGGER = { char: .036, item: .09 } as const;

let registered = false;
export function registerEases() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(CustomEase);
  CustomEase.create("settle", "M0,0 C0.2,0.9 0.25,1.12 1,1");
  CustomEase.create("drive", "M0,0 C0.66,0 0.12,1 1,1");
  registered = true;
}

/** Runs `setup(off)` inside a gsap.context scoped to `scope`. It reverts and re-runs live when the Motion toggle changes. */
export function useMotionScope(scope: RefObject<HTMLElement | null>, setup: (off: boolean) => void | (() => void), deps: unknown[] = []) {
  const off = useMotionOff();
  useEffect(() => {
    const el = scope.current; if (!el) return;
    registerEases();
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => { cleanup = setup(off); }, el);
    return () => { if (typeof cleanup === "function") cleanup(); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [off, ...deps]);
  return off;
}
