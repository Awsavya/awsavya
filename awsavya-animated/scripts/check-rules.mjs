// AWSAVYA house rules (spec §13.5). Walks app/, components/ and lib/ and exits 1 with file:line for each violation.
// Run: npm run check:rules
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIRS = ["app", "components", "lib"];
const EXT = /\.(tsx?|mjs|js|css)$/;
const SKIP = new Set(["node_modules", ".next"]);

const BANNED_IMPORT = /(?:from\s+|import\s*\(\s*|require\s*\(\s*|^\s*import\s+)["'](three(?:\/[^"']*)?|@react-three\/[^"']*|motion\/react|framer-motion|gsap\/(?:SplitText|Flip|Draggable)|gsap\/dist\/(?:SplitText|Flip|Draggable))["']/;
const GSAP_EASE = /\b(power[0-4]|expo|back|elastic|bounce|sine|circ|quad|cubic|quart|quint|strong)\.(in|out|inOut)\b/;
const CSS_EASE = /(?<![-\w])(ease|ease-in|ease-out|ease-in-out)(?![-\w])/;
const WORDS = [
  [/✳/, "the ✳ glyph"], [/universe/, "\"universe\""], [/Signal 0/, "\"Signal 0\""], [/Signal lost/, "\"Signal lost\""],
  [/[Ee]xplor(e|es|ed|ing|ation)\b/, "\"explore\" (any form)"], [/[Cc]oncept study/, "\"Concept study\""], [/Georgia/, "Georgia"],
  [/prefers-reduced-motion/, "prefers-reduced-motion (motion is never gated on the OS setting)"],
  [/@import url\(/, "@import url("], [/scroll-behavior:\s*smooth/, "scroll-behavior: smooth"], [/backdrop-filter/, "backdrop-filter"],
  [/radial-gradient/, "radial-gradient"], [/box-shadow/, "box-shadow"], [/mix-blend-mode/, "mix-blend-mode"], [/↗/, "the ↗ arrow"],
];
const ALLOWED_S = new Set([0, .18, .36, .54, .72, 1.08]);
const ROOT_EASES = /--ease-(settle|drive):\s*cubic-bezier\([^)]*\)/g;

const files = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p); else if (EXT.test(name)) files.push(p);
  }
}
for (const d of DIRS) { try { walk(join(ROOT, d)); } catch { /* directory missing */ } }

const out = [];
const flag = (file, line, msg) => out.push(`${relative(ROOT, file).split(sep).join("/")}:${line}  ${msg}`);
// String literals on a line ('…', "…", `…`), used to apply the CSS-keyword rule to style strings in TS.
const strings = line => [...line.matchAll(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`((?:[^`\\]|\\.)*)`/g)].map(m => m[1] ?? m[2] ?? m[3] ?? "");
const toSeconds = (n, unit) => (unit === "ms" ? n / 1000 : n);

for (const file of files) {
  const rel = relative(ROOT, file).split(sep).join("/");
  const isCss = file.endsWith(".css");
  const isGlobals = rel === "app/globals.css";
  const isDeliver = rel === "components/chrome/DeliverLink.tsx";
  const lines = readFileSync(file, "utf8").split(/\r?\n/);

  lines.forEach((raw, i) => {
    const n = i + 1;
    const line = raw;

    if (!isCss && BANNED_IMPORT.test(line)) flag(file, n, `banned import: ${line.match(BANNED_IMPORT)[1]}`);
    if (!isCss && !isDeliver && /from\s+["']next\/link["']/.test(line)) flag(file, n, "import next/link only in components/chrome/DeliverLink.tsx; use DeliverLink");

    if (GSAP_EASE.test(line)) flag(file, n, `banned ease ${line.match(GSAP_EASE)[0]} (use "settle", "drive" or "none")`);
    if (isCss) {
      const noComments = line.replace(/\/\*.*?\*\//g, "");
      if (CSS_EASE.test(noComments)) flag(file, n, `banned CSS timing keyword "${noComments.match(CSS_EASE)[0]}" (use var(--ease-settle) / var(--ease-drive))`);
    } else {
      const code = line.replace(/(?:from\s+|import\s*\(\s*|^\s*import\s+)["'][^"']*["']/g, ""); // module paths like "@/lib/ease" are not style strings
      for (const s of strings(code)) if (CSS_EASE.test(s)) { flag(file, n, `banned CSS timing keyword "${s.match(CSS_EASE)[0]}" in a style string`); break; }
    }

    const bez = isGlobals ? line.replace(ROOT_EASES, "") : line;
    if (bez.includes("cubic-bezier(")) flag(file, n, "cubic-bezier( outside the two :root tokens in app/globals.css");

    for (const [re, label] of WORDS) if (re.test(line)) flag(file, n, `banned: ${label}`);

    // Durations: only the 180ms beat.
    if (isCss) {
      if (/(^|[{;])\s*(transition|animation)[\w-]*\s*:/.test(line)) {
        for (const m of line.matchAll(/(?<![\w.-])(\d*\.?\d+)(ms|s)\b/g)) {
          const s = Math.round(toSeconds(parseFloat(m[1]), m[2]) * 1000) / 1000;
          if (!ALLOWED_S.has(s)) flag(file, n, `CSS duration ${m[0]} is off the beat (use var(--d-1|2|3|4|6))`);
        }
      }
    } else {
      for (const m of line.matchAll(/\bduration\s*:\s*(\d*\.?\d+)/g)) {
        const s = parseFloat(m[1]);
        if (!ALLOWED_S.has(s)) flag(file, n, `duration: ${m[1]} is off the beat (use D.d1|d2|d3|d4|d6)`);
      }
    }
  });
}

if (out.length) {
  console.error(`check:rules — ${out.length} violation${out.length === 1 ? "" : "s"}:\n${out.join("\n")}`);
  process.exit(1);
}
console.log(`check:rules — ${files.length} files clean.`);
