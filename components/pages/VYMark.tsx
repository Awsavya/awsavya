"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { about, founders, site } from "@/lib/site";
import { fitK } from "@/lib/fit";
import { D, DRIVE, SETTLE, STAGGER, useMotionScope } from "@/lib/ease";
import { hashSeed, mulberry32 } from "@/lib/settle";

const SMALL = Array.from(about.smallLine);           // A W S A · · A: the V and Y columns are empty
const WORD = Array.from(site.name);                  // the measuring row, A W S A V Y A
const SLOT = { v: SMALL.indexOf("·"), y: SMALL.lastIndexOf("·") };
const NAMES_K = fitK(founders.map(f => ({ text: f.name }))).toFixed(4); // VIVEK and YASH share one size
// AWSAVYA has no measured advance (lib/fit.ts). .26 of the measure keeps the invisible row inside the column at 320px;
// above that the row is capped at --cap-l.
const MEASURE_K = ".26";
const FLY = "[data-slot]";

/**
 * About hero visual (aria-hidden; the H1's sr-only text carries "Vivek and Yash").
 * SSR renders the final layout: the small line A W S A · · A, then VIVEK / YASH with "Co-founder" and a bar
 * under each. With motion on (data-arrive pre-hides it), a hand-written FLIP starts from AWSAVYA set big in
 * the top band: the five shared letters dim and fly to the small line, V and Y drop into the names, IVEK and
 * ASH SETTLE in from a seeded jostle, then the bars draw. Motion Off: the final layout, no movement.
 */
export function VYMark() {
  const root = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  useMotionScope(root, off => {
    const el = root.current;
    if (!el) return;
    const arrive = () => el.setAttribute("data-arrived", "");
    if (off || played.current) { arrive(); return; }

    // ReadyFlag (last in <body>) has already run on a client navigation, not on a first load:
    // after a Deliver, wait for its 0.54s flood to land before starting.
    const lead = window.__awReady ? D.d3 + D.d1 : D.d1;
    const tl = gsap.timeline({ paused: true });
    let live = true;
    let timer = 0;
    const fontsReady = new Promise<void>(resolve => {
      timer = window.setTimeout(resolve, 600);
      document.fonts?.ready.then(() => resolve());
    });
    fontsReady.then(() => {
      if (!live) return;
      played.current = true;
      build(el, tl, lead);
      arrive();
      tl.play();
    });

    return () => {
      live = false;
      window.clearTimeout(timer);
      tl.kill();
      gsap.set(el.querySelectorAll(`${FLY}, .pg-vy__ch, .pg-vy__rest, .pg-vy__bar, .pg-vy__role`), { clearProps: "transform,transformOrigin,opacity,color,--wdth" });
      arrive();
    };
  });

  return (
    <span ref={root} className="pg-vy" aria-hidden="true" data-arrive="">
      <span className="fit fit--l pg-vy__measure" style={{ "--k": MEASURE_K } as CSSProperties}>
        <span className="fit__line"><span className="fit__text">
          {WORD.map((ch, i) => <span key={i} className="fit__char">{ch}</span>)}
        </span></span>
      </span>

      <span className="grid7 pg-vy__small">
        {SMALL.map((ch, i) => ch === "·"
          ? <span key={i} className="t-label pg-vy__ch" data-gap="">{ch}</span>
          : <span key={i} className="t-label pg-vy__ch" data-slot={i}>{ch}</span>)}
      </span>

      <span className="fit fit--xl pg-vy__names" style={{ "--k": NAMES_K } as CSSProperties}>
        {founders.map((f, fi) => (
          <span key={f.name} className="pg-vy__name">
            <span className="fit__line" data-indent="a1">
              <span className="fit__text">
                {Array.from(f.name).map((ch, i) => i === 0
                  ? <span key={i} className="fit__char" data-slot={fi === 0 ? SLOT.v : SLOT.y}>{ch}</span>
                  : <span key={i} className="fit__char pg-vy__rest">{ch}</span>)}
              </span>
            </span>
            <span className="pg-vy__sig">
              <span className="pg-vy__bar" />
              <span className="t-label pg-vy__role">{f.role}</span>
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

/** FLIP: measure the final boxes, invert each flying letter onto its slot in the big AWSAVYA, play to none. */
function build(el: HTMLElement, tl: gsap.core.Timeline, at: number) {
  const slots = Array.from(el.querySelectorAll<HTMLElement>(".pg-vy__measure .fit__char"));
  const fliers = Array.from(el.querySelectorAll<HTMLElement>(FLY));
  const small = fliers.filter(t => t.classList.contains("pg-vy__ch"));
  const dots = el.querySelectorAll<HTMLElement>(".pg-vy__ch[data-gap]");
  const rest = el.querySelectorAll<HTMLElement>(".pg-vy__rest");
  const bars = el.querySelectorAll<HTMLElement>(".pg-vy__bar");
  const roles = el.querySelectorAll<HTMLElement>(".pg-vy__role");
  if (!slots.length || !fliers.length) return;

  const big = parseFloat(getComputedStyle(slots[0]).fontSize);
  const inv = fliers.map(t => {
    const f = slots[Number(t.dataset.slot)].getBoundingClientRect();
    const l = t.getBoundingClientRect();
    return { x: f.left - l.left, y: f.top - l.top, s: big / parseFloat(getComputedStyle(t).fontSize) };
  });
  const ink = getComputedStyle(el).color;
  const dim = small.length ? getComputedStyle(small[0]).color : ink;
  const narrow = matchMedia("(max-width: 639px)").matches;
  const rand = mulberry32(hashSeed("vy:jostle"));

  const t2 = at + D.d2;          // fly
  // IVEK / ASH settle in once the five small letters have finished their width change, so no more than
  // 9 characters animate the width axis at once (§8, §10).
  const t3 = t2 + D.d4 + (small.length - 1) * STAGGER.char;
  const t4 = t3 + D.d3;          // bars draw

  // 0 → 1: all seven start as one poster word; the five shared letters dim (colour only).
  tl.fromTo(small, { color: ink }, { color: dim, duration: D.d2, ease: DRIVE, clearProps: "color" }, at);
  // 2: FLIP to the final boxes. The small letters relax from the poster's width (wdth 62) back into labels.
  tl.fromTo(fliers,
    { transformOrigin: "0 0", x: i => inv[i].x, y: i => inv[i].y, scale: i => inv[i].s },
    { x: 0, y: 0, scale: 1, duration: D.d4, ease: SETTLE, stagger: STAGGER.char, clearProps: "transform,transformOrigin" }, t2);
  tl.fromTo(small,
    { "--wdth": 62 },
    { "--wdth": 125, duration: D.d4, ease: SETTLE, stagger: STAGGER.char, clearProps: "--wdth" }, t2);
  tl.fromTo(dots, { opacity: 0 }, { opacity: 1, duration: D.d1, ease: DRIVE, clearProps: "opacity" }, t2 + D.d3);
  // 3: the rest of each name SETTLEs in from a seeded jostle.
  tl.fromTo(rest, {
    opacity: 0,
    y: () => `${((rand() * 2 - 1) * .3).toFixed(3)}em`,
    rotation: () => (rand() * 2 - 1) * (narrow ? 4 : 6),
    "--wdth": () => 62 + rand() * (narrow ? 10 : 28),
  }, { opacity: 1, y: 0, rotation: 0, "--wdth": 62, duration: D.d4, ease: SETTLE, stagger: STAGGER.char, clearProps: "opacity,transform,--wdth" }, t3);
  // 4: "Co-founder" bars draw; the labels fade in with them.
  tl.fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: D.d3, ease: DRIVE, stagger: STAGGER.item, clearProps: "transform" }, t4);
  tl.fromTo(roles, { opacity: 0 }, { opacity: 1, duration: D.d1, ease: DRIVE, stagger: STAGGER.item, clearProps: "opacity" }, t4 + D.d1);
}
