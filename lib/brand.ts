// The AWSAVYA pixel logo: each letter on a 5 x 7 grid, V and Y (Vivek and Yash) solid, the rest dimmed.
// The source of truth for the header logo and the share card. The PNG and SVG files in public/brand/ were
// drawn from the same grid; regenerate them if this changes.
const GLYPHS: Record<string, readonly string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  V: ["10001", "10001", "10001", "10001", "01010", "01010", "00100"],
  Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
};

export type LogoCell = readonly [x: number, y: number, hot: boolean];

/** Lit cells of a word in grid units (letters 5 wide with a 1-cell gap), and the grid's width and height. */
function cells(word: string, hot: ReadonlySet<number>) {
  const out: LogoCell[] = [];
  [...word].forEach((ch, i) =>
    GLYPHS[ch].forEach((line, y) => [...line].forEach((bit, k) => { if (bit === "1") out.push([i * 6 + k, y, hot.has(i)]); })),
  );
  return { cells: out, width: word.length * 6 - 1, height: 7 };
}

export const LOGO = cells("AWSAVYA", new Set([4, 5]));
export const MARK = cells("VY", new Set([0, 1]));
export const LOGO_COLORS = { ink: "#111111", dim: "#8E8E8A", white: "#FFFFFF", dimOnDark: "#7A7A76" } as const;
