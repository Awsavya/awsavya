// Springs and pointer for the hero letters. Imperative and framework-free: SettleHero owns the loop
// (one gsap.ticker) and calls stepBodies() once per frame while anything moves.

/** Semi-implicit Euler spring (ported from the old hero integrator): vel += force·dt; vel *= exp(−c·dt); pos += vel·dt. */
export const SPRING = { k: 170, c: 16, maxDt: 1 / 30, couple: 24 } as const;

/** One letter. Offsets are px from the letter's grid position; r is degrees; w is the wdth axis. */
export type Body = {
  x: number; y: number; r: number; w: number;
  vx: number; vy: number;
  /** Rest pose: the jostle while tangled, all zero (wdth 62) once settled. */
  rx: number; ry: number; rr: number; rw: number;
  /** Pointer target while held. */
  tx: number; ty: number;
  /** The pointer owns x/y. */
  held: boolean;
  /** A timeline owns x/y/r/w: the integrator leaves it alone. */
  locked: boolean;
};

export const makeBody = (): Body => ({ x: 0, y: 0, r: 0, w: 62, vx: 0, vy: 0, rx: 0, ry: 0, rr: 0, rw: 62, tx: 0, ty: 0, held: false, locked: false });

export type StepOptions = {
  dt: number;
  mark: number;
  pitch: number;
  /** ±7° on desktop, ±4° below 640px. */
  maxRot: number;
  /** Desktop only: a dragged letter stretches its width with speed. */
  stretch: boolean;
  /** The strings currently drawn (threads, or transfers once settled). Each one tugs its two letters together. */
  links: readonly (readonly [number, number])[];
};

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const fx = new Float64Array(7), fy = new Float64Array(7);

/** Advances every free body by one step. Returns true while anything is still moving. */
export function stepBodies(bodies: Body[], o: StepOptions): boolean {
  const { k, c, couple } = SPRING;
  const dt = o.dt, damp = Math.exp(-c * dt);
  const wallX = 1.8 * o.pitch, wallY = 1.0 * o.mark;
  const turn = 1 - Math.exp(-dt * 18), widen = 1 - Math.exp(-dt * 12), follow = 1 - Math.exp(-dt * 32);

  fx.fill(0); fy.fill(0);
  for (const [i, j] of o.links) {
    const a = bodies[i], b = bodies[j];
    const dx = (a.x - a.rx) - (b.x - b.rx), dy = (a.y - a.ry) - (b.y - b.ry);
    fx[i] -= couple * dx; fy[i] -= couple * dy;
    fx[j] += couple * dx; fy[j] += couple * dy;
  }

  let moving = false;
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    if (b.locked) continue;
    if (b.held) {
      // Follows the pointer with ~30ms of lag: enough to feel the weight, never late.
      const px = b.x, py = b.y;
      b.x += (b.tx - b.x) * follow; b.y += (b.ty - b.y) * follow;
      b.vx = (b.x - px) / dt; b.vy = (b.y - py) / dt;
      moving = true;
    } else {
      let ax = -k * (b.x - b.rx) + fx[i], ay = -k * (b.y - b.ry) + fy[i];
      // A stiff wall past the drag limits, so a hard throw can never fling a letter off the band.
      const ox = Math.abs(b.x - b.rx) - wallX, oy = Math.abs(b.y - b.ry) - wallY;
      if (ox > 0) ax -= Math.sign(b.x - b.rx) * ox * k * 6;
      if (oy > 0) ay -= Math.sign(b.y - b.ry) * oy * k * 6;
      b.vx = (b.vx + ax * dt) * damp; b.vy = (b.vy + ay * dt) * damp;
      b.x += b.vx * dt; b.y += b.vy * dt;
    }
    // Leans into horizontal motion, then turns back to its rest angle.
    const lean = clamp((b.vx / o.mark) * .9, -o.maxRot, o.maxRot);
    b.r += (clamp(b.rr + lean, -o.maxRot, o.maxRot) - b.r) * turn;
    // Desktop drag stretch: wdth 62 + min(|vx| / 1800 px/s, 1) × 38, never narrower than the rest pose.
    const wt = o.stretch && b.held ? Math.max(b.rw, 62 + Math.min(Math.abs(b.vx) / 1800, 1) * 38) : b.rw;
    b.w += (wt - b.w) * widen;

    if (!b.held && Math.abs(b.vx) < .01 && Math.abs(b.vy) < .01 && Math.abs(b.x - b.rx) < .05 && Math.abs(b.y - b.ry) < .05
      && Math.abs(b.r - b.rr) < .02 && Math.abs(b.w - b.rw) < .05) {
      b.x = b.rx; b.y = b.ry; b.r = b.rr; b.w = b.rw; b.vx = 0; b.vy = 0;
    } else moving = true;
  }
  return moving;
}

export type PointerHooks = {
  /** False while a timeline owns the letters. A tap still reports. */
  canGrab(): boolean;
  grab(i: number, x: number, y: number): void;
  move(i: number, x: number, y: number): void;
  /** Release velocity in px/s from the last 80ms of samples (the caller clamps it). */
  release(i: number, vx: number, vy: number): void;
  /** A click or tap without travel: <250ms and <8px. */
  tap(i: number): void;
};

const HOLD_MS = 300, TAP_MS = 250, SLOP = 8, SAMPLE_MS = 80;

/**
 * Mouse and pen grab at once. Touch never traps the page: letters keep touch-action: pan-y, a quick tap
 * reports `tap`, and only a 300ms press-and-hold (moving <8px) grabs. While grabbed, a non-passive
 * touchmove listener cancels scrolling; at any other time the browser scrolls as usual.
 */
export function bindPointer(letters: readonly HTMLElement[], hooks: PointerHooks): () => void {
  type Sample = { x: number; y: number; t: number };
  let active: { id: number; i: number; el: HTMLElement; x0: number; y0: number; t0: number; touch: boolean; grabbed: boolean; samples: Sample[] } | null = null;
  let timer = 0;

  const grabNow = (x: number, y: number) => {
    if (!active) return;
    active.grabbed = true;
    try { active.el.setPointerCapture(active.id); } catch { /* the pointer already ended */ }
    active.samples = [{ x, y, t: performance.now() }];
    hooks.grab(active.i, x, y);
  };

  const end = (e: PointerEvent, cancelled: boolean) => {
    if (!active || e.pointerId !== active.id) return;
    clearTimeout(timer);
    const a = active;
    active = null;
    const travel = Math.hypot(e.clientX - a.x0, e.clientY - a.y0);
    const quick = !cancelled && travel < SLOP && performance.now() - a.t0 < TAP_MS;
    if (a.grabbed) {
      let vx = 0, vy = 0;
      const s = a.samples, last = s[s.length - 1], first = s[0];
      if (!cancelled && s.length > 1 && last.t - first.t > 0) {
        vx = ((last.x - first.x) / (last.t - first.t)) * 1000;
        vy = ((last.y - first.y) / (last.t - first.t)) * 1000;
      }
      hooks.release(a.i, vx, vy);
    }
    if (quick) hooks.tap(a.i);
  };

  const onDown = (e: PointerEvent) => {
    if (active || !e.isPrimary || (e.pointerType === "mouse" && e.button !== 0)) return;
    const el = e.currentTarget as HTMLElement;
    const i = letters.indexOf(el);
    if (i < 0) return;
    const touch = e.pointerType === "touch";
    active = { id: e.pointerId, i, el, x0: e.clientX, y0: e.clientY, t0: performance.now(), touch, grabbed: false, samples: [] };
    if (!touch) {
      e.preventDefault(); // no text selection, no native image drag
      if (hooks.canGrab()) grabNow(e.clientX, e.clientY);
      return;
    }
    const { clientX, clientY } = e;
    timer = window.setTimeout(() => {
      if (!active || active.grabbed || !hooks.canGrab()) return;
      grabNow(clientX, clientY);
      navigator.vibrate?.(8);
    }, HOLD_MS);
  };

  const onMove = (e: PointerEvent) => {
    if (!active || e.pointerId !== active.id) return;
    if (!active.grabbed) {
      // Travel before the hold completes: a scroll or a swipe. Let the browser have it.
      if (Math.hypot(e.clientX - active.x0, e.clientY - active.y0) > SLOP) { clearTimeout(timer); active = null; }
      return;
    }
    const t = performance.now();
    const s = active.samples;
    s.push({ x: e.clientX, y: e.clientY, t });
    while (s.length > 2 && t - s[0].t > SAMPLE_MS) s.shift();
    hooks.move(active.i, e.clientX, e.clientY);
  };

  const onUp = (e: PointerEvent) => end(e, false);
  const onCancel = (e: PointerEvent) => end(e, true);
  const onTouchMove = (e: TouchEvent) => { if (active?.grabbed && e.cancelable) e.preventDefault(); };
  const onBlock = (e: Event) => e.preventDefault();

  for (const el of letters) {
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onCancel);
    el.addEventListener("lostpointercapture", onCancel);
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("contextmenu", onBlock);
    el.addEventListener("dragstart", onBlock);
  }
  return () => {
    clearTimeout(timer);
    active = null;
    for (const el of letters) {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
      el.removeEventListener("lostpointercapture", onCancel);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("contextmenu", onBlock);
      el.removeEventListener("dragstart", onBlock);
    }
  };
}
