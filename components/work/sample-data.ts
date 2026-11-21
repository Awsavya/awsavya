// Sample data for the four redrawn interfaces (spec §6). Every name, number and order here is SAMPLE DATA:
// fictional, made up for this site, and labelled as such wherever it is shown. Product facts behind the
// screens come only from the owner's lib/site.ts and lib/project-studies.ts. Totals, balances, transfers,
// counts and character counts are always computed from these values, never typed.
import { expenseIous, formatAmount, settle, type Expense, type Transfer } from "@/lib/settle";

/** Shared labels for the sample interfaces and their controls. */
export const ui = {
  sample: "Sample data",
  rail: "States, simplified",
  runCaption: "Sample Run",
  /** The drawn device is one image to assistive tech; this is its text alternative. */
  device: (name: string, labels: readonly string[]) =>
    `${name} interface, redrawn in code with sample data. Simplified states: ${labels.join(", ")}.`,
  deviceAt: (name: string, where: string) => `${name} interface, redrawn in code with sample data. ${where}`,
} as const;

/** "a b c" lists for the screens' data-on / data-now / data-done attributes (states 0…n-1). */
export const states = (...s: number[]) => s.join(" ");
export const from = (k: number, n: number) => states(...Array.from({ length: Math.max(0, n - k) }, (_, i) => k + i));
export const below = (k: number) => states(...Array.from({ length: k }, (_, i) => i));

/** "everyone", "Ben", "Asha and Ben", "Asha, Ben and Chiara" */
export function joinNames(names: readonly string[], all: number): string {
  if (names.length === all) return "everyone";
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export const amount = formatAmount;
export const signed = (n: number) => (n > 0 ? `+${formatAmount(n)}` : formatAmount(n));

/* ------------------------------------------------------------------ TripSplit */
export const trip = {
  title: "Weekend trip · sample",
  people: ["Asha", "Ben", "Chiara", "Dani"],
  expenses: [
    { payer: 0, label: "Fuel", amount: 2400, split: [0, 1, 2, 3] },
    { payer: 1, label: "Dinner", amount: 1800, split: [0, 1, 2, 3] },
    { payer: 2, label: "Tickets", amount: 900, split: [2, 3] },
    { payer: 3, label: "Groceries", amount: 1200, split: [0, 1, 2, 3] },
    { payer: 0, label: "Snacks", amount: 600, split: [0, 1] },
    { payer: 1, label: "Parking", amount: 400, split: [0, 1, 2, 3] },
  ] as readonly Expense[],
  saved: "Saved on this phone",
  synced: "Synced",
  total: "Total spent",
  addExpense: "Add expense",
  owes: "owes",
  getsBack: "gets back",
  sumCheck: (sum: number) => `Balances add up to ${formatAmount(sum)}`,
  transfersLead: (t: number) => `${t} transfer${t === 1 ? "" : "s"} settle the trip`,
  pays: "pays",
  after: "Balances after",
  even: (allZero: boolean) => (allZero ? "Everyone is even." : "Not even yet."),
  people4: (n: number) => `${n} people`,
  counts: (people: number, expenses: number) => `${people} people · ${expenses} expenses`,
} as const;

export type TripResult = { balances: number[]; transfers: Transfer[]; total: number };
/** Balances and transfers for a list of expenses, via lib/settle.ts. */
export function tripSettle(expenses: readonly Expense[]): TripResult {
  const { balances, transfers } = settle(trip.people.length, expenseIous(expenses));
  return { balances, transfers, total: expenses.reduce((s, e) => s + e.amount, 0) };
}

export const tripRun = {
  legend: "Add an expense",
  paidBy: "Paid by",
  amount: "Amount",
  forWho: "For",
  amounts: [300, 750, 1200, 2000],
  add: "Add",
  settle: "Settle up",
  reset: "Reset",
  max: 10,
  addedLabel: "Added",
  listTitle: "Expenses",
  balancesTitle: "Balances",
  transfersTitle: "Transfers",
  notSettled: "Not settled yet. Press Settle up.",
  added: (who: string, amt: number, forText: string, n: number) => `Added: ${who} paid ${formatAmount(amt)} for ${forText}. ${n} expenses.`,
  settled: (n: number, t: number) => (t === 0 ? `${n} expenses, already even. Nothing to transfer.` : `${n} expenses, settled in ${t} transfer${t === 1 ? "" : "s"}.`),
  limit: (max: number) => `That's the ${max}-expense limit for this sample. Settle up or reset.`,
  pickOne: "Pick at least one person it was for.",
  resetDone: (n: number) => `Back to the ${n} sample expenses.`,
  columns: { what: "What", paid: "Paid by", forWho: "For", amount: "Amount" },
} as const;

/* ------------------------------------------------------------------ Build2Buzz */
export type B2BSource = { id: string; text: string; ref: string };
export type B2BSentence = { id: string; text: string; source: string | null };
export const b2b = {
  app: "Build2Buzz",
  repo: "sample-notes-app",
  task: "Release post",
  panes: { repo: "From the repo", demo: "Seen in the demo", draft: "Draft" },
  tabs: { repo: "Repo", demo: "Demo", draft: "Draft" },
  browser: "Chromium · headless",
  notRun: "Not run yet",
  noDraft: "Draft appears here",
  noSource: "No source",
  approve: "Approve",
  edit: "Edit",
  step: (i: number, n: number, label: string) => `Step ${i} of ${n} · ${label}`,
  facts: [
    { id: "F1", text: "Version 2.3 adds export to CSV.", ref: "README.md · line 14" },
    { id: "F2", text: "Sync shows conflicts before overwriting.", ref: "docs/sync.md · line 8" },
  ] as readonly B2BSource[],
  observed: [
    { id: "O1", text: "Typing ‘inv’ in search found ‘Invoice’.", ref: "Search" },
    { id: "O2", text: "Settings has a dark theme switch.", ref: "Settings" },
  ] as readonly B2BSource[],
  draft: [
    { id: "S1", text: "Version 2.3 adds export to CSV.", source: "F1" },
    { id: "S2", text: "Search now matches partial words.", source: "O1" },
    { id: "S3", text: "There's a dark theme in Settings.", source: "O2" },
    { id: "S4", text: "Sync conflicts are shown before anything is overwritten.", source: "F2" },
    { id: "S5", text: "It's twice as fast as the last version.", source: null },
  ] as readonly B2BSentence[],
  limit: 300,
  review: (kept: number, total: number, chars: number, limit: number) => `${kept} of ${total} sentences have a source · ${chars} / ${limit} characters`,
  reviewShort: (kept: number, total: number, chars: number, limit: number) => `${kept}/${total} sourced · ${chars}/${limit} chars`,
} as const;

/** Which sentences keep a source, given the sources in use, and the length of what's kept. */
export function b2bReview(using: ReadonlySet<string>) {
  const kept = b2b.draft.filter(s => s.source !== null && using.has(s.source));
  const chars = kept.map(s => s.text).join(" ").length;
  return { kept, chars, line: b2b.review(kept.length, b2b.draft.length, chars, b2b.limit) };
}

export const b2bRun = {
  legend: "Evidence",
  use: "Use this source",
  draftTitle: "Draft",
  dropped: "(no source, dropped)",
  live: (kept: number, total: number) => `${kept} of ${total} sentence${total === 1 ? "" : "s"} ${kept === 1 ? "has" : "have"} a source.`,
  caption: "In this sample, a sentence with no source is struck out.",
  repoGroup: "From the repo",
  demoGroup: "Seen in the demo",
} as const;

/* ------------------------------------------------------------------ Har Apparels */
export const har = {
  batches: [
    { id: "B-0417", roll: "R-2231", yd: 140 },
    { id: "B-0418", roll: "R-2232", yd: 120 },
    { id: "B-0419", roll: "R-2240", yd: 160 },
  ],
  stages: [
    { key: "roll", label: "Roll", role: "Supervisor", act: "Log roll issue", at: "at roll issue" },
    { key: "cutting", label: "Cutting", role: "Cutting master", act: "Log cut", at: "at cutting" },
    { key: "sewing", label: "Sewing", role: "Floor worker", act: "Log sewing", at: "at sewing" },
    { key: "qc", label: "Final QC", role: "Supervisor", act: "Log final QC", at: "at final QC" },
  ],
  batchTitle: (id: string) => `Batch ${id} · sample`,
  rollLine: (roll: string, yd: number) => `Roll ${roll} · ${yd} yd · sample`,
  role: "Role",
  flags: { done: "Done", now: "Now", next: "Next" },
} as const;

export const harRun = {
  log: "Log next stage",
  fresh: "New sample batch",
  live: (id: string, at: string) => `Batch ${id} ${at}.`,
  end: (id: string) => `Batch ${id} is already at final QC. Start a new sample batch.`,
  nextUp: "Next to log",
  allLogged: "Every stage is logged.",
} as const;

/* ------------------------------------------------------------------ QuicklyCart */
export const qc = {
  app: "QuicklyCart",
  orders: ["#2048", "#2049", "#2050"],
  orderTitle: (id: string) => `Order ${id} · sample`,
  roles: [
    { key: "customer", label: "Customer", who: "Customer (sample)" },
    { key: "store", label: "Store", who: "Corner Store (sample)" },
    { key: "rider", label: "Rider", who: "Rider R-12 (sample)" },
    { key: "admin", label: "Admin", who: "Admin" },
  ],
  verified: "Verified",
  items: [
    { name: "Notebook", qty: 2, price: 90 },
    { name: "Pens (pack)", qty: 1, price: 80 },
  ],
  total: "Total",
  itemsCount: (n: number) => `${n} item${n === 1 ? "" : "s"}`,
  steps: [
    { key: "placed", status: "Placed", phrase: "placed", actor: 0, act: "Placed the order" },
    { key: "store", status: "At store", phrase: "at store", actor: 1, act: "Confirmed and packed" },
    { key: "rider", status: "With rider", phrase: "with rider", actor: 2, act: "Picked it up" },
    { key: "delivered", status: "Delivered", phrase: "delivered", actor: 2, act: "Confirmed delivery" },
  ],
  sees: "Sees",
  log: "State log",
  route: { label: "Route · abstract", from: "Store", to: "Door" },
} as const;

/** Line totals and the order total, computed from the sample items. */
export function qcTotals() {
  const lines = qc.items.map(i => ({ ...i, line: i.qty * i.price }));
  return { lines, total: lines.reduce((s, l) => s + l.line, 0), count: lines.reduce((s, l) => s + l.qty, 0) };
}
/** The states in which role r is the one acting. */
export const qcActs = (r: number) => qc.steps.map((s, i) => (s.actor === r ? i : -1)).filter(i => i >= 0);

export const qcRun = {
  advance: "Advance the order",
  repeat: "Repeat last step",
  fresh: "New sample order",
  live: (id: string, phrase: string) => `Order ${id}: ${phrase}.`,
  repeated: (phrase: string) => `Already ${phrase}. Nothing changed.`,
  end: (id: string) => `Order ${id} is already delivered. Nothing changed.`,
} as const;
