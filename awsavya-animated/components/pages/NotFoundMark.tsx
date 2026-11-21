"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { FitText } from "@/components/chrome/FitText";
import { adv, fitK, A4_AVAIL, SAFETY, type FitLine } from "@/lib/fit";
import { D, SETTLE, useMotionScope } from "@/lib/ease";
import { notFound } from "@/lib/site";
import { hashSeed, mulberry32 } from "@/lib/settle";

const LINES: readonly FitLine[] = [{ text: notFound.lines[0], indent: "a1" }, { text: notFound.lines[1], indent: "a4" }];

// Jostle ranges: desktop y ±.2em, ±7°, wdth 62–90. Below 640px the hero's phone limits: ±.16em, ±4°, wdth ≤ 72.
const RANGE = { d: { y: .2, r: 7, w: 28 }, m: { y: .16, r: 4, w: 10 } } as const;
type Jostle = { y: number; r: number; w: number };
const draw = (rand: () => number, R: { y: number; r: number; w: number }): Jostle =>
  ({ y: (rand() * 2 - 1) * R.y, r: (rand() * 2 - 1) * R.r, w: 62 + rand() * R.w });

// Seeded, so the server and the browser render the same jostle: no flash, no hydration difference.
const seed = mulberry32(hashSeed("404:jostle"));
const CHARS = LINES.flatMap((l, line) => Array.from(l.text).filter(c => c !== " ").map(() => ({ line, d: draw(seed, RANGE.d), m: draw(seed, RANGE.m) })));

// A letter set wider than wdth 62 takes more room: W measures .729em at 62, .800 at 72 and 1.0 at 100,
// about +0.98% per unit. Shrink the poster so each line's jostled width still fits its measure, then keep
// the spec's ×0.9 as headroom for the twitch. Computed once from the seeds, so it's pure CSS at runtime.
const grow = (w: number) => 1 + (w - 62) * .0098;
const meanGrow = (key: "d" | "m", line: number, ws?: readonly number[]) => {
  const idx = CHARS.flatMap((c, i) => (c.line === line ? [i] : []));
  return idx.reduce((s, i) => s + grow(ws ? ws[i] : CHARS[i][key].w), 0) / idx.length;
};
const OWN_K = LINES.map(l => ((l.indent === "a4" ? A4_AVAIL : 1) * SAFETY) / adv(l.text));
const scale = (key: "d" | "m") => (.9 * Math.min(...OWN_K.map((k, li) => k / meanGrow(key, li)))) / fitK(LINES);
const SCALE = { d: scale("d").toFixed(4), m: scale("m").toFixed(4) };
// The twitch may widen a line by at most what the ×0.9 headroom allows.
const LIMIT = { d: LINES.map((_, li) => meanGrow("d", li) / .9), m: LINES.map((_, li) => meanGrow("m", li) / .9) };

const vars = (j: Jostle, suffix: "" | "-m") => ({
  [`--jy${suffix}`]: `${j.y.toFixed(3)}em`, [`--jr${suffix}`]: `${j.r.toFixed(2)}deg`, [`--jw${suffix}`]: j.w.toFixed(1),
});

/**
 * "NOTHING TO / DELIVER." in poster type, per character, jostled at SSR and never settled. With motion on,
 * every 1.8s three letters re-jostle (0.36s SETTLE), three times at most, then they rest. Off: static jostle.
 * The H1's accessible name is the sr-only copy FitText renders; the letters are aria-hidden.
 */
export function NotFoundMark() {
  const root = useRef<HTMLDivElement>(null);

  useMotionScope(root, off => {
    const el = root.current;
    if (off || !el) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>(".fit__char"));
    if (chars.length !== CHARS.length) return;
    const rand = mulberry32(hashSeed("404:twitch"));
    const cur = { d: CHARS.map(c => c.d.w), m: CHARS.map(c => c.m.w) };
    let count = 0;
    // The twitches start from a timer, outside the gsap.context, so they are killed here by hand.
    const tweens: gsap.core.Tween[] = [];

    const twitch = () => {
      const picked = new Set<number>();
      while (picked.size < 3) picked.add(Math.floor(rand() * CHARS.length));
      for (const i of picked) {
        const next = { d: draw(rand, RANGE.d), m: draw(rand, RANGE.m) };
        for (const key of ["d", "m"] as const) {
          const ws = cur[key].slice();
          ws[i] = next[key].w;
          if (meanGrow(key, CHARS[i].line, ws) > LIMIT[key][CHARS[i].line]) next[key].w = cur[key][i]; // keep its width: the line is full
          cur[key][i] = next[key].w;
        }
        tweens.push(gsap.to(chars[i], { ...vars(next.d, ""), ...vars(next.m, "-m"), duration: D.d2, ease: SETTLE }));
      }
      if (++count >= 3) window.clearInterval(timer);
    };
    const timer = window.setInterval(twitch, 1800);
    return () => { window.clearInterval(timer); tweens.forEach(t => t.kill()); };
  });

  return (
    <div ref={root} className="pg-nf__mark" style={{ "--pg-nf-s": SCALE.d, "--pg-nf-s-m": SCALE.m } as CSSProperties}>
      <FitText as="h1" id="nf-h1" size="xl" tabIndex={-1} perChar lines={LINES}
        charStyle={(_, n) => ({ ...vars(CHARS[n].d, ""), ...vars(CHARS[n].m, "-m") }) as CSSProperties} />
    </div>
  );
}
