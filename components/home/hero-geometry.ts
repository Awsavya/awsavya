// Pure path maths for the Settle up hero. All coordinates are stage pixels; nothing here touches the DOM.

export type Pt = { x: number; y: number };

/**
 * Where strings tie on, in em of the mark size, measured from the centre of a letter's .78em line box
 * (Archivo, wght 900, caps): FOOT sits on the baseline, HEAD on the cap line.
 */
export const FOOT = .335;
export const HEAD = -.355;

/** Arrowhead: 10 × 10 user units, like a userSpaceOnUse marker. */
const ARROW = 10;

/** A point `d` px along a letter's own vertical axis, after the letter has moved by (x, y) and turned by r degrees. */
export function attach(cx: number, cy: number, x: number, y: number, rDeg: number, d: number): Pt {
  const a = (rDeg * Math.PI) / 180;
  return { x: cx + x - Math.sin(a) * d, y: cy + y + Math.cos(a) * d };
}

export function quadAt(p0: Pt, p1: Pt, p2: Pt, t: number): Pt {
  const u = 1 - t;
  return { x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x, y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y };
}

const f = (n: number) => n.toFixed(1);

/**
 * A sample IOU: a quadratic sagging below the word, foot to foot. Sag = (0.18 + 0.5 × amount/800) × mark size.
 * `mid` is the point at `t` (0.5 unless the tag layout slid it along the curve to clear another tag).
 */
export function thread(a: Pt, b: Pt, amount: number, mark: number, t = .5) {
  const c = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 + (.18 + .5 * (amount / 800)) * mark };
  return { d: `M${f(a.x)} ${f(a.y)}Q${f(c.x)} ${f(c.y)} ${f(b.x)} ${f(b.y)}`, mid: quadAt(a, c, b, t) };
}

/**
 * A settled transfer: an arc above the word, head to head, lifted by (0.25 + 0.06 × |i − j|) × mark size.
 * The stroke stops just inside the arrowhead (so its butt end never shows past the tip); the head sits on the end.
 */
export function transfer(a: Pt, b: Pt, span: number, mark: number, t = .5) {
  const c = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - (.25 + .06 * span) * mark };
  // Tangent at t = 1 is (b − c); |B′(1)| = 2|b − c|.
  const tx = b.x - c.x, ty = b.y - c.y;
  const len = Math.hypot(tx, ty) || 1;
  const ux = tx / len, uy = ty / len;
  const te = Math.max(.5, 1 - (ARROW * .7) / (2 * len));
  // De Casteljau: the sub-curve [0, te] has control lerp(a, c, te) and end B(te).
  const c1 = { x: a.x + (c.x - a.x) * te, y: a.y + (c.y - a.y) * te };
  const e = quadAt(a, c, b, te);
  const bx = b.x - ux * ARROW, by = b.y - uy * ARROW, nx = -uy * ARROW / 2, ny = ux * ARROW / 2;
  return {
    d: `M${f(a.x)} ${f(a.y)}Q${f(c1.x)} ${f(c1.y)} ${f(e.x)} ${f(e.y)}`,
    head: `M${f(b.x)} ${f(b.y)}L${f(bx + nx)} ${f(by + ny)}L${f(bx - nx)} ${f(by - ny)}Z`,
    mid: quadAt(a, c, b, t),
  };
}

export type Box = { l: number; r: number; t: number; b: number };
/** Where a tag may sit along its curve, in order of preference: the middle first, then sliding outwards. */
const TAG_T = [.5, .38, .62, .3, .7, .24, .76, .18, .82] as const;

/**
 * Picks the first `t` whose tag box (half-size hw × hh, centred on the curve point) clears every box already
 * placed, and records it. Two arcs can share a midpoint (A→A and V→Y both peak between V and Y); the longer one
 * slides further for the same step in t, so callers place short curves first. If nothing clears (very narrow
 * screens), the spot with the least overlap wins.
 */
export function placeTag(at: (t: number) => Pt, hw: number, hh: number, placed: Box[]): number {
  let best: { t: number; box: Box; hit: number } | null = null;
  for (const t of TAG_T) {
    const p = at(t);
    const box = { l: p.x - hw, r: p.x + hw, t: p.y - hh, b: p.y + hh };
    let hit = 0;
    for (const q of placed) hit += Math.max(0, Math.min(box.r, q.r) - Math.max(box.l, q.l)) * Math.max(0, Math.min(box.b, q.b) - Math.max(box.t, q.t));
    if (hit === 0) { placed.push(box); return t; }
    if (!best || hit < best.hit) best = { t, box, hit };
  }
  if (!best) return .5;
  placed.push(best.box);
  return best.t;
}

/** Soft limit: 1:1 up to `limit`, then each extra pixel counts for less, approaching limit + 0.35 × limit. */
export function rubber(d: number, limit: number): number {
  const m = Math.abs(d);
  if (m <= limit) return d;
  const over = m - limit;
  return Math.sign(d) * (limit + over / (1 + over / (.35 * limit)));
}
