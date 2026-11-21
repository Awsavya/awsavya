// Run with: npm test  (node --experimental-strip-types --test lib/settle.test.mjs)
import test from "node:test";
import assert from "node:assert/strict";
import { expenseIous, formatAmount, greedySettle, netBalances, settle } from "./settle.ts";

// Hero seeds (spec §5.1). [from, to, amount] = "from owes to". Letters: 0 A · 1 W · 2 S · 3 A · 4 V · 5 Y · 6 A.
const SEEDS = {
  "settle-01": [[4, 1, 740], [4, 0, 180], [3, 0, 420], [3, 5, 80], [6, 2, 580], [0, 2, 600], [1, 5, 380], [6, 3, 240]],
  "settle-02": [[3, 6, 480], [4, 0, 320], [5, 1, 560], [0, 3, 480], [6, 0, 300], [2, 0, 320], [2, 4, 440], [2, 5, 440]],
  "settle-03": [[0, 6, 340], [3, 5, 120], [3, 0, 60], [4, 0, 280], [2, 4, 120], [1, 3, 60], [3, 6, 800], [5, 2, 680]],
  "settle-04": [[0, 4, 720], [4, 6, 720], [3, 6, 800], [3, 1, 660], [2, 0, 660], [0, 6, 720], [5, 0, 320], [0, 3, 700]],
  "settle-m1": [[6, 1, 340], [6, 2, 240], [1, 4, 660], [0, 3, 660], [4, 2, 660], [2, 5, 320]],
  "settle-m2": [[0, 5, 400], [5, 2, 800], [0, 4, 400], [2, 0, 800], [1, 6, 400], [3, 5, 700]],
  "settle-m3": [[4, 2, 240], [2, 0, 240], [0, 4, 200], [4, 1, 220], [0, 5, 260], [3, 6, 380]],
};

const EXPECTED = {
  "settle-01": [[4, 2, 920], [6, 5, 460], [6, 1, 360], [3, 2, 260]],
  "settle-02": [[2, 1, 560], [2, 0, 460], [2, 6, 180], [5, 4, 120]],
  "settle-03": [[3, 6, 920], [5, 2, 560], [4, 6, 160], [1, 6, 60]],
  "settle-04": [[0, 6, 1160], [3, 6, 760], [2, 1, 660], [5, 6, 320]],
  "settle-m1": [[0, 3, 660], [6, 2, 580], [1, 5, 320]],
  "settle-m2": [[3, 4, 400], [1, 6, 400], [3, 5, 300]],
  "settle-m3": [[3, 6, 380], [4, 5, 260], [0, 1, 220]],
};

const triples = transfers => transfers.map(t => [t.from, t.to, t.amount]);

test("settle-01 (desktop default) computes the spec's four transfers", () => {
  assert.deepEqual(triples(settle(7, SEEDS["settle-01"]).transfers), EXPECTED["settle-01"]);
});

test("settle-m1 (mobile default) computes the spec's three transfers", () => {
  assert.deepEqual(triples(settle(7, SEEDS["settle-m1"]).transfers), EXPECTED["settle-m1"]);
});

test("every seed matches the table in the spec", () => {
  for (const [name, ious] of Object.entries(SEEDS)) assert.deepEqual(triples(settle(7, ious).transfers), EXPECTED[name], name);
});

test("every seed: balances sum to 0, at most n−1 transfers, transfers zero every balance", () => {
  for (const [name, ious] of Object.entries(SEEDS)) {
    const balances = netBalances(7, ious);
    assert.equal(balances.reduce((a, b) => a + b, 0), 0, `${name}: sum`);
    const transfers = greedySettle(balances);
    assert.ok(transfers.length <= 6, `${name}: ${transfers.length} transfers`);
    const after = balances.slice();
    for (const t of transfers) { after[t.from] += t.amount; after[t.to] -= t.amount; }
    assert.ok(after.every(v => v === 0), `${name}: not zeroed ${after}`);
  }
});

test("every seed touches all seven letters and never joins adjacent letters", () => {
  for (const [name, ious] of Object.entries(SEEDS)) {
    const touched = new Set(ious.flatMap(([f, t]) => [f, t]));
    assert.equal(touched.size, 7, `${name}: touches ${[...touched]}`);
    for (const [f, t] of ious) assert.ok(Math.abs(f - t) > 1, `${name}: ${f}→${t} is adjacent`);
  }
});

test("TripSplit sample: computed balances and transfers", () => {
  // People: 0 Asha, 1 Ben, 2 Chiara, 3 Dani (fictional).
  const all = [0, 1, 2, 3];
  const expenses = [
    { payer: 0, label: "Fuel", amount: 2400, split: all },
    { payer: 1, label: "Dinner", amount: 1800, split: all },
    { payer: 2, label: "Tickets", amount: 900, split: [2, 3] },
    { payer: 3, label: "Groceries", amount: 1200, split: all },
    { payer: 0, label: "Snacks", amount: 600, split: [0, 1] },
    { payer: 1, label: "Parking", amount: 400, split: all },
  ];
  const { balances, transfers } = settle(4, expenseIous(expenses));
  assert.deepEqual(balances, [1250, 450, -1000, -700]);
  assert.deepEqual(triples(transfers), [[2, 0, 1000], [3, 1, 450], [3, 0, 250]]);
});

test("formatAmount is locale-free", () => {
  assert.equal(formatAmount(1250), "1,250");
  assert.equal(formatAmount(-700), "−700");
  assert.equal(formatAmount(1234567), "1,234,567");
  assert.equal(formatAmount(0), "0");
});
