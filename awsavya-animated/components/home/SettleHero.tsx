"use client";

import { useRef, useState, useSyncExternalStore, type CSSProperties, type RefObject } from "react";
import gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { BarButton } from "@/components/chrome/Bar";
import { getLenis } from "@/components/chrome/SmoothScroll";
import { D, DRIVE, SETTLE, STAGGER, useMotionScope } from "@/lib/ease";
import { home } from "@/lib/site";
import { formatAmount, settle as settleUp, type Transfer } from "@/lib/settle";
import { FOOT, HEAD, attach, placeTag, rubber, thread, transfer, type Box, type Pt } from "./hero-geometry";
import { DESKTOP_SEEDS, MOBILE_SEEDS, jostleFor, taggedThreads, type Pose, type Seed } from "./seeds";
import { SPRING, bindPointer, makeBody, stepBodies, type Body, type PointerHooks } from "./useLetterPhysics";

// The home hero (§5.1, §5.2). AWSAVYA as seven thrown letters, tangled in sample IOU threads. Settle up runs
// lib/settle.ts live, cuts the threads down to a few transfers, lands the letters on one Ink baseline, and that
// baseline floods into the Lineup. The band is decoration (aria-hidden); the H1, the button, the live region and
// the sr-only table carry the meaning. Motion Off: letters set, threads and transfers crossfade, no physics.

const WORD = ["A", "W", "S", "A", "V", "Y", "A"] as const;
const MAX_THREADS = 8, MAX_TRANSFERS = 4, THREAD_TAGS = 3;
const SMALL = "(max-width: 639px)";
const PIN = "(min-width: 1024px) and (pointer: fine)";

// The settle timeline, on the 180ms beat (§5.1): threads retract from 0, letters land from .36, transfers draw
// from .54, the baseline draws from .90, and the readout turns at 1.44.
const LAND_AT = D.d2, DRAW_AT = D.d3, BAR_AT = D.d3 + D.d2, DONE_AT = BAR_AT + D.d3;
/** Arrival hop, in em of the mark. */
const HOP = .08;
/** Tap-to-pluck, in marks per second. The spec's 0.9 lifts a letter ~0.03em with these springs (k 170, c 16):
 *  invisible. 5.4 lifts it ~0.2em and lets the spring bounce it home. */
const PLUCK = 5.4;
/** Drag reach before the rubber band: ±1.5 column pitches across, ±0.8 marks up and down. Throws cap at 3000px/s. */
const REACH_X = 1.5, REACH_Y = .8, MAX_THROW = 3000;
/** Baseline flood: the desktop pin scrubs the flood over its last 70%; the auto-settle fires past 5%. */
const FLOOD_FROM = .3, AUTO_SETTLE = .05;

type Phase = "tangled" | "settling" | "settled" | "tangling";
type Model = { round: number; phase: Phase; pressed: boolean; started: boolean };
type View = { round: number; phase: Phase };
type Api = { press(): void };
type ScrollTriggerClass = typeof ScrollTrigger;

const seedAt = (small: boolean, round: number): Seed => {
  const list = small ? MOBILE_SEEDS : DESKTOP_SEEDS;
  return list[round % list.length];
};
const transfersOf = (seed: Seed): Transfer[] => settleUp(WORD.length, seed.ious).transfers;
const owedOf = (seed: Seed) => formatAmount(seed.ious.reduce((sum, iou) => sum + iou[2], 0));
const movedOf = (plan: readonly Transfer[]) => formatAmount(plan.reduce((sum, t) => sum + t.amount, 0));
const SET: readonly Pose[] = WORD.map(() => ({ y: 0, r: 0, w: 62 }));

// SSR jostle for the two default seeds, written as inline CSS vars. CSS applies them only with JS and motion on,
// so no-JS and Motion Off show the settled word, and hydration matches exactly (the seeds are deterministic).
const J_DESK = jostleFor(DESKTOP_SEEDS[0].name, false), J_MOB = jostleFor(MOBILE_SEEDS[0].name, true);
const LETTER_VARS = WORD.map((_, i) => ({
  "--jy": `${J_DESK[i].y.toFixed(3)}em`, "--jr": `${J_DESK[i].r.toFixed(2)}deg`, "--jw": J_DESK[i].w.toFixed(1),
  "--jy-m": `${J_MOB[i].y.toFixed(3)}em`, "--jr-m": `${J_MOB[i].r.toFixed(2)}deg`, "--jw-m": J_MOB[i].w.toFixed(1),
}) as CSSProperties);

function subscribeSmall(cb: () => void) {
  const mq = matchMedia(SMALL);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const isSmall = () => matchMedia(SMALL).matches;

const sentence = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function SettleHero() {
  const root = useRef<HTMLDivElement>(null);
  const model = useRef<Model>({ round: 0, phase: "tangled", pressed: false, started: false });
  const api = useRef<Api | null>(null);
  // Below 640px the band uses the 6-thread seeds. Server and first client render use desktop; the swap is a
  // state update after hydration, never a mismatch.
  const small = useSyncExternalStore(subscribeSmall, isSmall, () => false);
  const [view, setView] = useState<View>({ round: 0, phase: "tangled" });
  const [live, setLive] = useState("");

  useMotionScope(root, off => {
    const el = root.current;
    if (!el) return;
    return createHero({ el, off, small, model: model.current, setView, setLive, api });
  }, [small]);

  const busy = view.phase === "settling" || view.phase === "tangling";
  const label = view.phase === "settled" ? home.retangle : view.phase === "settling" ? home.settling : home.settle;
  const readout = (s: boolean) => {
    const seed = seedAt(s, view.round);
    const plan = transfersOf(seed);
    return view.phase === "settled" ? home.readoutAfter(plan.length, movedOf(plan)) : home.readoutBefore(seed.ious.length, owedOf(seed));
  };
  const seed = seedAt(small, view.round);
  const plan = transfersOf(seed);
  const name = (i: number) => home.letterNames[i];

  return (
    <div ref={root} className="home-hero__play">
      <div className="home-band" aria-hidden="true">
        <div className="home-band__stage">
          {WORD.map((ch, i) => <span key={i} className="home-letter" style={LETTER_VARS[i]}>{ch}</span>)}
          <span className="home-band__base" data-ground="ink" />
          <svg className="home-band__svg">
            {Array.from({ length: MAX_THREADS }, (_, k) => <path key={`t${k}`} className="home-thread" pathLength={1} />)}
            {Array.from({ length: MAX_TRANSFERS }, (_, k) => <path key={`x${k}`} className="home-transfer" pathLength={1} />)}
            {Array.from({ length: MAX_TRANSFERS }, (_, k) => <path key={`h${k}`} className="home-head" />)}
          </svg>
          {Array.from({ length: THREAD_TAGS }, (_, k) => <span key={`a${k}`} className="home-tag home-tag--thread" />)}
          {Array.from({ length: MAX_TRANSFERS }, (_, k) => <span key={`b${k}`} className="home-tag home-tag--transfer" />)}
        </div>
      </div>

      <div className="grid7 home-hero__controls">
        <div className="home-readout">
          <p className="t-data home-readout__line">
            <span className="home-readout__d">{readout(false)}</span>
            <span className="home-readout__m">{readout(true)}</span>
          </p>
          <p className="t-small fg-2 home-readout__caption">{home.caption}</p>
        </div>
        <BarButton
          className="home-hero__cta" label={label} aria-describedby="home-band-desc" aria-disabled={busy ? true : undefined}
          onClick={() => api.current?.press()}
        />
        <p className="t-label home-hint" aria-hidden="true">
          <span className="home-hint__fine">{home.hintFine}</span>
          <span className="home-hint__coarse">{home.hintCoarse}</span>
        </p>
      </div>

      <p id="home-band-desc" hidden>{home.caption}</p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{live}</p>
      {/* sr-only on a wrapper: overflow does not clip a table box, and its long rows must not widen the page. */}
      <div className="sr-only">
        <table>
          <caption>{home.tableCaption}</caption>
          <tbody>
            {seed.ious.map(([f, t, a], k) => <tr key={k}><td>{sentence(`${name(f)} owes ${name(t)} ${formatAmount(a)}`)}</td></tr>)}
          </tbody>
          {view.phase === "settled" && (
            <tbody>
              {plan.map((tr, k) => <tr key={k}><td>{sentence(`${name(tr.from)} pays ${name(tr.to)} ${formatAmount(tr.amount)}`)}</td></tr>)}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

type HeroOptions = {
  el: HTMLElement; off: boolean; small: boolean; model: Model;
  setView: (v: View) => void; setLive: (s: string) => void; api: RefObject<Api | null>;
};

/**
 * The imperative hero: physics, timelines, the flood. One gsap.ticker callback runs the springs and sleeps at rest
 * and offscreen. Everything animated is created inside one gsap.context, so the returned cleanup reverts it all
 * (route change, Motion toggle, crossing 640px). The model outlives a run, so a toggle keeps the round and phase.
 */
function createHero({ el, off, small, model, setView, setLive, api }: HeroOptions): () => void {
  const band = el.querySelector<HTMLElement>(".home-band");
  const stage = el.querySelector<HTMLElement>(".home-band__stage");
  const bar = el.querySelector<HTMLElement>(".home-band__base");
  const svg = el.querySelector<SVGSVGElement>(".home-band__svg");
  const section = el.closest<HTMLElement>("section");
  if (!band || !stage || !bar || !svg || !section) return () => {};
  const all = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
  const letters = all<HTMLElement>(".home-letter");
  const threadEls = all<SVGPathElement>(".home-thread");
  const transferEls = all<SVGPathElement>(".home-transfer");
  const headEls = all<SVGPathElement>(".home-head");
  const threadTags = all<HTMLElement>(".home-tag--thread");
  const transferTags = all<HTMLElement>(".home-tag--transfer");

  const ctx = gsap.context(() => {}, el);
  let disposed = false;

  // A run that was cut off mid-animation resumes at that animation's end state.
  const coerced = model.phase === "settling" || model.phase === "tangling";
  if (model.phase === "settling") model.phase = "settled";
  if (model.phase === "tangling") model.phase = "tangled";
  const sync = () => setView({ round: model.round, phase: model.phase });
  if (coerced) sync();

  let seed = seedAt(small, model.round);
  let plan = transfersOf(seed);
  let tagged = taggedThreads(seed.ious, THREAD_TAGS);
  const bodies: Body[] = WORD.map(() => makeBody());
  let pose: readonly Pose[] = SET;
  let links: (readonly [number, number])[] = [];
  const g = { mark: 0, pitch: 0, cx: [0, 0, 0, 0, 0, 0, 0], cy: [0, 0, 0, 0, 0, 0, 0] };

  let current: gsap.core.Timeline | null = null; // the settle or re-tangle that owns the letters
  let last: gsap.core.Timeline | null = null;    // its tail (amount fades) may outlive the state change
  let arrival: gsap.core.Timeline | null = null;
  let dragOff = off, looping = false, visible = true, slow = 0, showThreads = false, showTransfers = false;
  // The device's own frame interval (16.7, 8.3 or 33.3ms): a slowly rising floor, so a 30Hz cap (Low Power Mode,
  // Energy Saver) is not mistaken for a struggling device.
  let minDt = Infinity;
  let unbind: (() => void) | null = null;

  // ------------------------------------------------------------------ geometry and drawing
  function measure() {
    const prev = g.mark;
    g.mark = parseFloat(getComputedStyle(stage!).fontSize) || 1;
    letters.forEach((l, i) => { g.cx[i] = l.offsetLeft + l.offsetWidth / 2; g.cy[i] = l.offsetTop + l.offsetHeight / 2; });
    g.pitch = (g.cx[6] - g.cx[0]) / 6 || g.mark;
    svg!.setAttribute("viewBox", `0 0 ${stage!.clientWidth} ${stage!.clientHeight}`);
    if (prev && prev !== g.mark) {
      const k = g.mark / prev;
      for (const b of bodies) { b.x *= k; b.y *= k; b.tx *= k; b.ty *= k; b.vx *= k; b.vy *= k; }
    }
    bodies.forEach((b, i) => { b.ry = pose[i].y * g.mark; });
  }

  function setRest(p: readonly Pose[], snap: boolean) {
    pose = p;
    bodies.forEach((b, i) => {
      b.rx = 0; b.ry = p[i].y * g.mark; b.rr = p[i].r; b.rw = p[i].w;
      if (snap) { b.x = b.rx; b.y = b.ry; b.r = b.rr; b.w = b.rw; b.vx = 0; b.vy = 0; b.tx = b.x; b.ty = b.y; }
    });
  }
  const setLinks = () => {
    links = model.phase === "settled" ? plan.map(t => [t.from, t.to] as const) : seed.ious.map(([f, t]) => [f, t] as const);
  };

  /** Shows only the slots this seed uses and writes the amounts into the tags. */
  function prepareSeed() {
    threadEls.forEach((p, k) => { p.style.display = k < seed.ious.length ? "" : "none"; });
    tagged.forEach((k, s) => { threadTags[s].textContent = formatAmount(seed.ious[k][2]); });
    transferEls.forEach((p, k) => {
      const on = k < plan.length;
      for (const n of [p, headEls[k], transferTags[k]]) n.style.display = on ? "" : "none";
      if (on) transferTags[k].textContent = formatAmount(plan[k].amount);
    });
  }

  // Where each amount tag sits along its curve (0.5 = the middle). Chosen once per seed and size, at the rest
  // pose, so no two tags overlap; while letters are dragged the tags ride their curves at that same t.
  const threadT = Array<number>(MAX_THREADS).fill(.5), transferT = Array<number>(MAX_TRANSFERS).fill(.5);
  let tanglePose: readonly Pose[] = SET;
  const restTie = (i: number, d: number, p: readonly Pose[]): Pt => attach(g.cx[i], g.cy[i], 0, p[i].y * g.mark, p[i].r, d * g.mark);
  function layoutTags() {
    const half = (tag: HTMLElement) => [tag.offsetWidth / 2 + 3, tag.offsetHeight / 2 + 2] as const;
    const below: Box[] = [];
    threadT.fill(.5);
    tagged.forEach((k, s) => {
      const [f, t, a] = seed.ious[k];
      const [hw, hh] = half(threadTags[s]);
      threadT[k] = placeTag(u => thread(restTie(f, FOOT, tanglePose), restTie(t, FOOT, tanglePose), a, g.mark, u).mid, hw, hh, below);
    });
    const above: Box[] = [];
    const span = (k: number) => Math.abs(plan[k].from - plan[k].to);
    plan.map((_, k) => k).sort((a, b) => span(a) - span(b)).forEach(k => {
      const { from, to } = plan[k];
      const [hw, hh] = half(transferTags[k]);
      transferT[k] = placeTag(u => transfer(restTie(from, HEAD, SET), restTie(to, HEAD, SET), span(k), g.mark, u).mid, hw, hh, above);
    });
  }

  const lastT: string[] = [], lastW: string[] = [];
  function writeLetters() {
    if (off) return; // Motion Off: CSS keeps the word set
    for (let i = 0; i < bodies.length; i++) {
      const b = bodies[i];
      const t = `translate3d(${b.x.toFixed(2)}px,${b.y.toFixed(2)}px,0) rotate(${b.r.toFixed(2)}deg)`;
      if (t !== lastT[i]) { letters[i].style.transform = t; lastT[i] = t; }
      const w = b.w.toFixed(1);
      if (w !== lastW[i]) { letters[i].style.setProperty("--wdth", w); lastW[i] = w; }
    }
  }
  const tie = (i: number, d: number): Pt => { const b = bodies[i]; return attach(g.cx[i], g.cy[i], b.x, b.y, b.r, d * g.mark); };
  const place = (tag: HTMLElement, p: Pt) => { tag.style.transform = `translate3d(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px,0) translate(-50%,-50%)`; };
  function writeStrings() {
    if (showThreads) {
      const mids: Pt[] = [];
      seed.ious.forEach(([f, t, a], k) => {
        const th = thread(tie(f, FOOT), tie(t, FOOT), a, g.mark, threadT[k]);
        threadEls[k].setAttribute("d", th.d);
        mids[k] = th.mid;
      });
      tagged.forEach((k, s) => place(threadTags[s], mids[k]));
    }
    if (showTransfers) {
      plan.forEach((tr, k) => {
        const x = transfer(tie(tr.from, HEAD), tie(tr.to, HEAD), Math.abs(tr.from - tr.to), g.mark, transferT[k]);
        transferEls[k].setAttribute("d", x.d);
        headEls[k].setAttribute("d", x.head);
        place(transferTags[k], x.mid);
      });
    }
  }
  const render = () => { writeLetters(); writeStrings(); };

  /** The baseline counts as an Ink ground only while it is drawn, so the header never turns Ink over a bare hero. */
  function barGround(ink: boolean) {
    const v = ink ? "ink" : "paper";
    if (bar!.dataset.ground === v) return;
    bar!.dataset.ground = v;
    window.dispatchEvent(new Event("awsavya-ground"));
  }

  // ------------------------------------------------------------------ springs (one gsap.ticker callback, sleeps at rest)
  const tick = (_time: number, dtMs: number) => {
    if (dtMs <= 0) return;
    minDt = Math.min(minDt * 1.01, dtMs);
    if (dtMs > Math.max(22, minDt * 1.5)) { if (++slow >= 60) { downgrade(); return; } } else slow = 0;
    const moving = stepBodies(bodies, { dt: Math.min(dtMs / 1000, SPRING.maxDt), mark: g.mark, pitch: g.pitch, maxRot: small ? 4 : 7, stretch: !small, links });
    render();
    if (!moving || !visible) sleep();
  };
  function wake() { if (off || looping || !visible) return; looping = true; slow = 0; gsap.ticker.add(tick); }
  function sleep() { if (!looping) return; looping = false; gsap.ticker.remove(tick); }

  /** 60 slow frames in a row (over 22ms and over 1.5× the device's own frame interval): settle, and stop offering drag. The content stays. */
  function downgrade() {
    sleep();
    dragOff = true;
    unbind?.(); unbind = null;
    el.setAttribute("data-nodrag", "");
    el.removeAttribute("data-holding");
    for (const b of bodies) b.held = false;
    if (model.phase === "tangled") settle();
    else if (!current) { setRest(pose, true); render(); }
  }

  /** Hands a letter back to the springs mid-hop (the arrival threads keep drawing). */
  function free(b: Body) { gsap.killTweensOf(b); b.locked = false; }

  const grip = { px: 0, py: 0, ox: 0, oy: 0 };
  const hooks: PointerHooks = {
    canGrab: () => !current && !dragOff,
    grab(i, x, y) {
      const b = bodies[i];
      free(b);
      b.held = true; b.tx = b.x; b.ty = b.y;
      grip.px = x; grip.py = y; grip.ox = b.x - b.rx; grip.oy = b.y - b.ry;
      el.setAttribute("data-holding", "");
      wake();
    },
    move(i, x, y) {
      const b = bodies[i];
      if (!b.held) return;
      b.tx = b.rx + rubber(grip.ox + x - grip.px, REACH_X * g.pitch);
      b.ty = b.ry + rubber(grip.oy + y - grip.py, REACH_Y * g.mark);
      wake();
    },
    release(i, vx, vy) {
      const b = bodies[i];
      el.removeAttribute("data-holding");
      if (!b.held) return;
      b.held = false;
      const s = Math.hypot(vx, vy), k = s > MAX_THROW ? MAX_THROW / s : 1;
      b.vx = vx * k; b.vy = vy * k;
      wake();
    },
    tap(i) {
      if (current) return;
      if (model.phase === "settled") retangle();
      else if (model.phase === "tangled" && !dragOff) {
        const b = bodies[i];
        free(b);
        b.vy -= PLUCK * g.mark;
        wake();
      }
    },
  };

  // ------------------------------------------------------------------ arrival, settle, re-tangle
  function arrive() {
    if (disposed || arrival || current || model.phase !== "tangled") return;
    showThreads = true;
    render();
    ctx.add(() => {
      const n = seed.ious.length;
      const tl = gsap.timeline({ onUpdate: render, onComplete: () => { arrival = null; } });
      tl.fromTo(threadEls.slice(0, n), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: D.d4, ease: DRIVE, stagger: STAGGER.item }, 0);
      tagged.forEach((k, s) => tl.fromTo(threadTags[s], { opacity: 0 }, { opacity: 1, duration: D.d1, ease: "none" }, k * STAGGER.item + D.d4));
      // Each letter gives a small hop as the strings take its weight: up on DRIVE, down on SETTLE.
      bodies.forEach((b, i) => {
        const t0 = D.d1 + i * STAGGER.char;
        tl.to(b, { y: () => b.ry - HOP * g.mark, duration: D.d1, ease: DRIVE, onStart: () => { b.locked = true; } }, t0)
          .to(b, { y: () => b.ry, duration: D.d2, ease: SETTLE, onComplete: () => { b.locked = false; } }, t0 + D.d1);
      });
      arrival = tl;
    });
  }

  function lockAll() {
    sleep();
    arrival?.kill(); arrival = null;
    last?.progress(1); last = null;
    el.removeAttribute("data-holding");
    for (const b of bodies) { gsap.killTweensOf(b); b.held = false; b.locked = true; }
  }
  function unlockAt(p: readonly Pose[]) {
    setRest(p, true);
    for (const b of bodies) b.locked = false;
    setLinks();
    render();
  }

  function settle() {
    if (disposed || current || model.phase !== "tangled") return;
    start();
    model.phase = "settling";
    sync();
    lockAll();
    showTransfers = true;
    render();
    barGround(!off); // Motion Off has no flood: the thin bar never turns the header Ink
    const m = plan.length, n = seed.ious.length;
    ctx.add(() => {
      const tl = gsap.timeline({ onUpdate: render, onComplete: () => { if (last === tl) last = null; } });
      if (off) {
        // Motion Off: threads and transfers crossfade, the baseline appears. Opacity only.
        tl.to([...threadEls, ...threadTags], { opacity: 0, duration: D.d1, ease: "none" }, 0)
          .to([...transferEls.slice(0, m), ...headEls.slice(0, m), ...transferTags.slice(0, m), bar], { opacity: 1, duration: D.d1, ease: "none" }, 0)
          .call(settled, [], D.d1);
      } else {
        // TRACK: threads retract in order. SETTLE: letters land outward from the centre A.
        tl.to(threadEls.slice(0, n), { strokeDashoffset: 1, duration: D.d2, ease: DRIVE, stagger: STAGGER.item }, 0);
        tagged.forEach((k, s) => tl.to(threadTags[s], { opacity: 0, duration: D.d1, ease: "none" }, k * STAGGER.item));
        tl.to(bodies, { x: 0, y: 0, r: 0, w: 62, duration: D.d4, ease: SETTLE, stagger: { each: STAGGER.char, from: "center" } }, LAND_AT);
        // The computed transfers draw, each amount fading in where its arrow lands.
        tl.fromTo(transferEls.slice(0, m), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: D.d3, ease: DRIVE, stagger: STAGGER.item }, DRAW_AT);
        for (let k = 0; k < m; k++) tl.to([headEls[k], transferTags[k]], { opacity: 1, duration: D.d1, ease: "none" }, DRAW_AT + D.d3 + k * STAGGER.item);
        // The baseline: a bar, so DRIVE, never SETTLE.
        tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: D.d3, ease: DRIVE }, BAR_AT);
        tl.call(settled, [], DONE_AT);
      }
      current = tl;
      last = tl;
    });
  }

  function settled() {
    current = null;
    model.phase = "settled";
    showThreads = false;
    unlockAt(SET);
    sync();
    setLive(home.liveAfter(seed.ious.length, owedOf(seed), plan.length, movedOf(plan)));
  }

  function retangle() {
    if (disposed || current || model.phase !== "settled") return;
    start();
    model.phase = "tangling";
    sync();
    setLive("");
    lockAll();
    // The next seed (cyclic). Its jostle is seeded, so every visitor sees the same tangle.
    const nextSeed = seedAt(small, model.round + 1);
    const next = off ? SET : jostleFor(nextSeed.name, small);
    const swap = () => {
      model.round += 1;
      seed = nextSeed; plan = transfersOf(seed); tagged = taggedThreads(seed.ious, THREAD_TAGS);
      showTransfers = false; showThreads = true;
      tanglePose = next;
      prepareSeed();
      layoutTags();
      setLinks();
      render();
      sync(); // the readout resets to the new sample
    };
    ctx.add(() => {
      const n = nextSeed.ious.length;
      const tl = gsap.timeline({ onUpdate: render, onComplete: () => { if (last === tl) last = null; } });
      if (off) {
        tl.to([...transferEls, ...headEls, ...transferTags, bar], { opacity: 0, duration: D.d1, ease: "none" }, 0)
          .call(() => { barGround(false); swap(); }, [], D.d1)
          .fromTo([...threadEls.slice(0, n), ...threadTags], { opacity: 0 }, { opacity: 1, duration: D.d1, ease: "none", immediateRender: false }, D.d1)
          .call(tangled, [next], D.d2);
      } else {
        // Transfers and the baseline let go; the letters unravel from the outside in; the new threads draw.
        tl.to(transferEls, { strokeDashoffset: 1, duration: D.d2, ease: DRIVE }, 0)
          .to([...headEls, ...transferTags], { opacity: 0, duration: D.d1, ease: "none" }, 0)
          .to(bar, { scaleX: 0, duration: D.d2, ease: DRIVE }, 0)
          .to(bodies, {
            x: 0, y: (i: number) => next[i].y * g.mark, r: (i: number) => next[i].r, w: (i: number) => next[i].w,
            duration: D.d3, ease: DRIVE, stagger: { each: STAGGER.char, from: "edges" },
          }, D.d1)
          .call(() => { barGround(false); swap(); }, [], D.d2)
          .set(threadTags, { opacity: 0 }, D.d2)
          .fromTo(threadEls.slice(0, n), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: D.d4, ease: DRIVE, stagger: STAGGER.item, immediateRender: false }, D.d2);
        const tags = taggedThreads(nextSeed.ious, THREAD_TAGS);
        tags.forEach((k, s) => tl.to(threadTags[s], { opacity: 1, duration: D.d1, ease: "none" }, D.d2 + k * STAGGER.item + D.d4));
        tl.call(tangled, [next], D.d2 + (n - 1) * STAGGER.item + D.d4);
      }
      current = tl;
      last = tl;
    });
  }

  function tangled(p: readonly Pose[]) {
    current = null;
    model.phase = "tangled";
    unlockAt(p);
    sync();
    setLive(home.liveBefore(seed.ious.length));
  }

  // ------------------------------------------------------------------ start (deferred to idle on first mount)
  let started = false;
  function start() {
    if (started || disposed) return;
    started = true;
    model.started = true;
    band!.setAttribute("data-live", "");
    if (off) el.setAttribute("data-nodrag", "");
    const isSettled = model.phase === "settled";
    measure();
    tanglePose = off ? SET : jostleFor(seed.name, small);
    setRest(isSettled ? SET : tanglePose, true);
    setLinks();
    prepareSeed();
    layoutTags();
    // Tag widths change once Martian Mono arrives.
    document.fonts?.ready.then(() => { if (!disposed) { layoutTags(); render(); } });
    showThreads = off || !isSettled;
    showTransfers = off || isSettled;
    barGround(isSettled && !off);

    ctx.add(() => {
      if (off) {
        gsap.set([...threadEls, ...transferEls], { strokeDashoffset: 0 });
        gsap.set([...transferEls, ...headEls, ...transferTags, bar], { opacity: isSettled ? 1 : 0 });
        gsap.set(bar, { scaleX: 1 });
        gsap.set([...threadEls, ...threadTags], { opacity: 0 });
        if (!isSettled) gsap.to([...threadEls, ...threadTags], { opacity: 1, duration: D.d1, ease: "none" });
      } else {
        gsap.set(threadEls, { strokeDashoffset: 1 });
        gsap.set(threadTags, { opacity: 0 });
        gsap.set(transferEls, { strokeDashoffset: isSettled ? 0 : 1 });
        gsap.set([...headEls, ...transferTags], { opacity: isSettled ? 1 : 0 });
        gsap.set(bar, { scaleX: isSettled ? 1 : 0, scaleY: 1, "--flood": 0 });
      }
    });
    render();

    ro.observe(stage!);
    io.observe(band!);
    if (off) return;

    unbind = bindPointer(letters, hooks);
    // Arrival waits for the real letterforms, but never longer than 600ms.
    if (!isSettled) {
      let go = false;
      const run = () => { if (!go) { go = true; arrive(); } };
      const t = window.setTimeout(run, 600);
      document.fonts?.ready.then(() => { clearTimeout(t); run(); });
    }
    if (!model.pressed) window.addEventListener("scroll", onFirstScroll, { passive: true });
    flood();
  }

  // ------------------------------------------------------------------ Baseline flood (§5.2): the only ScrollTrigger on the site
  let mm: gsap.MatchMedia | null = null;
  let st: ScrollTrigger | null = null;
  let ST: ScrollTriggerClass | null = null; // loaded on demand: ScrollTrigger stays out of Home's first load
  let unhook: (() => void) | null = null;
  const headerH = () => document.querySelector(".hdr")?.getBoundingClientRect().height ?? 64;
  const scrollToY = (y: number) => { const l = getLenis(); if (l) l.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y); };
  const hookLenis = () => { unhook?.(); const l = getLenis(); unhook = l && ST ? l.on("scroll", ST.update) : null; };

  function flood() {
    import("gsap/ScrollTrigger").then(mod => {
      if (disposed) return;
      ST = mod.ScrollTrigger;
      buildFlood(ST);
    });
  }

  function buildFlood(ScrollTrigger: ScrollTriggerClass) {
    gsap.registerPlugin(ScrollTrigger);
    hookLenis();
    window.addEventListener("awsavya-lenis", hookLenis);
    document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    mm = gsap.matchMedia();
    const build = (pin: boolean) => {
      const from = pin ? FLOOD_FROM : 0, span = 1 - from;
      // How far the bar must grow (top-anchored) to reach the hero's bottom edge. Re-read on every refresh.
      // (Computed height, not offsetHeight: the bar is .08em, a fraction of a pixel that offsetHeight rounds away.)
      const reach = () => Math.max(1, (section!.getBoundingClientRect().bottom - bar!.getBoundingClientRect().top) / Math.max(.5, parseFloat(getComputedStyle(bar!).height)));
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section, scrub: .4, invalidateOnRefresh: true,
          // Desktop pins the hero under the header; a hero taller than the screen pins once its bottom is in view,
          // so the button is always reachable before the flood.
          ...(pin
            ? { start: () => (section!.offsetHeight > window.innerHeight - headerH() ? "bottom bottom" : `top ${headerH()}px`), end: "+=80%", pin: true }
            : { start: "clamp(bottom 90%)", end: "bottom top" }),
          onUpdate: self => { if (pin && self.direction > 0 && self.progress > AUTO_SETTLE && model.phase === "tangled") settle(); },
        },
      });
      tl.fromTo(bar, { scaleY: 1, "--flood": 0 }, { scaleY: reach, "--flood": 1, duration: span }, from);
      const trigger = tl.scrollTrigger ?? null;
      st = trigger;
      // Turning the pin on or off adds or removes its scroll distance. Keep a reader below the hero where they were.
      if (pin && trigger && window.scrollY > trigger.start + section!.offsetHeight) scrollToY(window.scrollY + (trigger.end - trigger.start));
      return () => {
        if (st === trigger) st = null;
        if (pin && trigger && el.isConnected && window.scrollY > trigger.end) {
          const y = window.scrollY - (trigger.end - trigger.start);
          queueMicrotask(() => window.scrollTo(0, y));
        }
      };
    };
    mm.add(PIN, () => build(true));
    mm.add(`not all and ${PIN}`, () => build(false));
  }

  function onFirstScroll() {
    if (window.scrollY < 8) return;
    window.removeEventListener("scroll", onFirstScroll);
    if (!model.pressed && model.phase === "tangled") settle();
  }

  // Keyboard focus must never land under the flood: bring the hero back to its start first. Mouse and touch
  // focus (Chrome focuses a tapped button) never scroll, and neither does focus the flood does not cover.
  const onFocusIn = (e: FocusEvent) => {
    const t = e.target;
    if (!st || st.progress <= 0 || !(t instanceof HTMLElement) || !t.matches(":focus-visible")) return;
    if (bar.getBoundingClientRect().bottom <= t.getBoundingClientRect().top) return;
    scrollToY(st.start);
  };
  el.addEventListener("focusin", onFocusIn);

  const ro = new ResizeObserver(() => { measure(); layoutTags(); render(); });
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) wake(); else sleep(); });

  api.current = {
    press() {
      model.pressed = true;
      if (model.phase === "settled") retangle();
      else settle();
    },
  };

  // Init after first paint, off the critical path. A re-run (Motion toggle, crossing 640px) starts at once, so
  // nothing flashes between the old run's revert and the new one.
  let idle = 0;
  const useIdle = !model.started && typeof window.requestIdleCallback === "function";
  if (model.started) start();
  else if (useIdle) idle = window.requestIdleCallback(start, { timeout: 300 });
  else idle = window.setTimeout(start, 1);

  return () => {
    disposed = true;
    if (useIdle) window.cancelIdleCallback(idle); else clearTimeout(idle);
    sleep();
    unbind?.();
    ro.disconnect();
    io.disconnect();
    el.removeEventListener("focusin", onFocusIn);
    window.removeEventListener("scroll", onFirstScroll);
    window.removeEventListener("awsavya-lenis", hookLenis);
    unhook?.();
    mm?.revert();
    for (const b of bodies) gsap.killTweensOf(b);
    ctx.revert();
    if (api.current) api.current = null;
    for (const l of letters) { l.style.removeProperty("transform"); l.style.removeProperty("--wdth"); }
    for (const n of [...threadEls, ...transferEls, ...headEls, ...threadTags, ...transferTags]) { n.style.removeProperty("display"); n.style.removeProperty("transform"); }
    for (const p of [...threadEls, ...transferEls, ...headEls]) p.removeAttribute("d");
    bar.dataset.ground = "ink";
    band.removeAttribute("data-live");
    el.removeAttribute("data-nodrag");
    el.removeAttribute("data-holding");
  };
}
