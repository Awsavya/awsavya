import { hashSeed, mulberry32, type Iou } from "@/lib/settle";

// Sample IOUs strung between the letters of AWSAVYA: [from, to, amount] = "from owes to".
// Letter indices: 0 A · 1 W · 2 S · 3 A · 4 V · 5 Y · 6 A. Every seed touches all seven letters and
// no thread joins neighbours. Only IOUs live here: transfers are always computed with lib/settle.ts.
export type Seed = { readonly name: string; readonly ious: readonly Iou[] };

/** ≥640px: 8 threads settle into 4 transfers. */
export const DESKTOP_SEEDS: readonly Seed[] = [
  { name: "settle-01", ious: [[4, 1, 740], [4, 0, 180], [3, 0, 420], [3, 5, 80], [6, 2, 580], [0, 2, 600], [1, 5, 380], [6, 3, 240]] },
  { name: "settle-02", ious: [[3, 6, 480], [4, 0, 320], [5, 1, 560], [0, 3, 480], [6, 0, 300], [2, 0, 320], [2, 4, 440], [2, 5, 440]] },
  { name: "settle-03", ious: [[0, 6, 340], [3, 5, 120], [3, 0, 60], [4, 0, 280], [2, 4, 120], [1, 3, 60], [3, 6, 800], [5, 2, 680]] },
  { name: "settle-04", ious: [[0, 4, 720], [4, 6, 720], [3, 6, 800], [3, 1, 660], [2, 0, 660], [0, 6, 720], [5, 0, 320], [0, 3, 700]] },
];

/** <640px: 6 threads settle into 3 transfers. */
export const MOBILE_SEEDS: readonly Seed[] = [
  { name: "settle-m1", ious: [[6, 1, 340], [6, 2, 240], [1, 4, 660], [0, 3, 660], [4, 2, 660], [2, 5, 320]] },
  { name: "settle-m2", ious: [[0, 5, 400], [5, 2, 800], [0, 4, 400], [2, 0, 800], [1, 6, 400], [3, 5, 700]] },
  { name: "settle-m3", ious: [[4, 2, 240], [2, 0, 240], [0, 4, 200], [4, 1, 220], [0, 5, 260], [3, 6, 380]] },
];

/** A letter's unsettled pose: y in em of the mark size, r in degrees, w = the wdth axis. */
export type Pose = { readonly y: number; readonly r: number; readonly w: number };

// Desktop: y −.22…+.30em, ±7°, wdth 62–90. Below 640px: y −.16…+.20em, ±4°, wdth 62–72 (one letter per narrow column).
const RANGE = {
  desk: { y0: -.22, y1: .30, rot: 7, w1: 90 },
  mob: { y0: -.16, y1: .20, rot: 4, w1: 72 },
} as const;

/** Seeded, deterministic jostle (SSR-identical): mulberry32(hashSeed(name + ":jostle")). */
export function jostleFor(name: string, small: boolean): Pose[] {
  const rand = mulberry32(hashSeed(`${name}:jostle`));
  const g = small ? RANGE.mob : RANGE.desk;
  return Array.from({ length: 7 }, () => ({
    y: g.y0 + rand() * (g.y1 - g.y0),
    r: (rand() * 2 - 1) * g.rot,
    w: 62 + rand() * (g.w1 - 62),
  }));
}

/** The three largest threads carry an amount tag before settling (ties go to the earlier thread). */
export function taggedThreads(ious: readonly Iou[], count = 3): number[] {
  return ious.map((iou, i) => [iou[2], i] as const)
    .sort((a, b) => b[0] - a[0] || a[1] - b[1])
    .slice(0, count)
    .map(([, i]) => i)
    .sort((a, b) => a - b);
}
