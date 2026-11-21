// Pure settle-up maths shared by the hero and the TripSplit sample. Erasable TypeScript only,
// so `node --experimental-strip-types` can run it directly (see settle.test.mjs).
export type Iou = readonly [from: number, to: number, amount: number];     // from owes to
export type Transfer = { from: number; to: number; amount: number };       // from pays to
export type Expense = { payer: number; label: string; amount: number; split: readonly number[] };

export function netBalances(n: number, ious: readonly Iou[]): number[] {
  const b: number[] = new Array(n).fill(0);
  for (const [f, t, a] of ious) { b[f] -= a; b[t] += a; }
  return b;
}

/** Largest creditor ← largest debtor until everything is zero; ties go to the lowest index. */
export function greedySettle(balances: readonly number[]): Transfer[] {
  const b = balances.slice(); const out: Transfer[] = [];
  for (let g = 0; g < b.length * 2; g++) {
    let cr = -1, db = -1;
    for (let i = 0; i < b.length; i++) {
      if (b[i] > 0 && (cr < 0 || b[i] > b[cr])) cr = i;
      if (b[i] < 0 && (db < 0 || b[i] < b[db])) db = i;
    }
    if (cr < 0 || db < 0) break;
    const a = Math.min(b[cr], -b[db]);
    out.push({ from: db, to: cr, amount: a }); b[cr] -= a; b[db] += a;
  }
  return out;
}

export function settle(n: number, ious: readonly Iou[]) {
  const balances = netBalances(n, ious);
  return { balances, transfers: greedySettle(balances) };
}

/** Equal split; the remainder stays with the payer. */
export function expenseIous(expenses: readonly Expense[]): Iou[] {
  const out: Iou[] = [];
  for (const e of expenses) {
    const share = Math.floor(e.amount / e.split.length);
    for (const p of e.split) if (p !== e.payer) out.push([p, e.payer, share]);
  }
  return out;
}

export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function mulberry32(a: number): () => number {
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Locale-free grouping (1,250 / −700), so server and client always render the same string. */
export function formatAmount(n: number): string {
  const s = String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (n < 0 ? "−" : "") + s;
}
