"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { D, DRIVE, SETTLE, STAGGER, registerEases } from "@/lib/ease";
import { useMotionOff } from "@/lib/motion";
import { hashSeed, mulberry32 } from "@/lib/settle";

/**
 * The violet DONE stamp: the only meaning violet has. Inactive = invisible, layout reserved.
 * The first time it becomes active (motion on): the bar draws (0.54s DRIVE), then the letters SETTLE in
 * from a jostle seeded by the word. Later activations are instant. A stamp that mounts active is static.
 * Motion Off: a 0.18s fade (CSS). Switching Motion Off mid-landing reverts it at once to the final CSS state.
 */
export function DoneStamp({ word, active, size = "m", className }: { word: string; active: boolean; size?: "m" | "s"; className?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const was = useRef(active);
  const landed = useRef(active);
  const off = useMotionOff();

  useLayoutEffect(() => {
    const prev = was.current;
    was.current = active;
    const el = root.current;
    if (!el || !active || prev || landed.current) return;
    landed.current = true;
    if (off) return; // CSS fades it in (0.18s)
    registerEases();
    const small = matchMedia("(max-width: 639px)").matches;
    const rand = mulberry32(hashSeed(`${word}:stamp`));
    const chars = Array.from(el.querySelectorAll<HTMLElement>(".stamp__char"));
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(el.querySelector(".stamp__bar"), { scaleX: 0 }, { scaleX: 1, duration: D.d3, ease: DRIVE });
      tl.fromTo(chars, {
        opacity: 0,
        y: () => `${(-.18 + rand() * .46).toFixed(3)}em`,
        rotation: () => (rand() * 2 - 1) * (small ? 4 : 7),
        "--wdth": () => 62 + rand() * (small ? 10 : 28),
      }, { opacity: 1, y: 0, rotation: 0, "--wdth": 62, duration: D.d4, ease: SETTLE, stagger: STAGGER.char, clearProps: "opacity,transform,--wdth" }, D.d2);
    }, el);
    return () => ctx.revert();
  }, [active, word, off]);

  return (
    <span ref={root} className={["stamp", size === "s" && "stamp--s", className].filter(Boolean).join(" ")} data-active={active ? "" : undefined}>
      <span className="sr-only">{word}</span>
      <span className="stamp__bar" aria-hidden="true" />
      <span className="stamp__word" aria-hidden="true">
        {Array.from(word).map((ch, i) => <span key={i} className="stamp__char">{ch}</span>)}
      </span>
    </span>
  );
}
