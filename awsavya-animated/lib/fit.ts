// Measured poster fitting. A line's width is adv × font-size, where adv is the advance measured in em,
// so font-size = measure × safety / adv. That is rendered as calc(var(--k) * 100cqi): exact at every
// viewport, pure CSS, nothing measured after hydration, no layout shift.
// Advances in em, Archivo v25 latin, wght 860, font-stretch 62%, letter-spacing 0, uppercase.
export const POSTER_ADV: Record<string, number> = {
  TRIPSPLIT: 3.797, BUILD2BUZZ: 4.533, "HAR APPARELS": 5.46, QUICKLYCART: 5.085,
  VIVEK: 2.186, YASH: 1.918, IVEK: 1.703, ASH: 1.491, V: 0.483, Y: 0.48,
  SETTLED: 3.246, GROUNDED: 4.078, TRACKED: 3.467, DELIVERED: 4.054, SENT: 1.903,
  "WHAT WE": 3.444, "TAKE ON.": 3.285, "START A": 2.984, "BRIEF.": 2.266,
  "NOTHING TO": 4.403, "DELIVER.": 3.307, "FOUR BUILDS.": 4.925,
  "MOBILE APPS": 4.927, "WEBSITES AND": 5.428, "WEB PLATFORMS": 6.221,
  CUSTOM: 3.146, SOFTWARE: 4.049, "APPLIED AI AND": 5.66, AUTOMATION: 4.925,
};
export const A4_AVAIL = 0.55, SAFETY = 0.98, EST_PER_CHAR = 0.47;
export type FitLine = { text: string; indent?: "a1" | "a4" };

export function adv(text: string): number {
  const key = text.toUpperCase(); const v = POSTER_ADV[key];
  if (v) return v;
  if (process.env.NODE_ENV !== "production") console.warn(`[fit] no measured advance for "${key}" — using estimate`);
  return key.length * EST_PER_CHAR; // conservative: renders slightly small, never overflows
}

export function fitK(lines: readonly FitLine[], safety = SAFETY): number {
  return Math.min(...lines.map(l => ((l.indent === "a4" ? A4_AVAIL : 1) * safety) / adv(l.text)));
}
