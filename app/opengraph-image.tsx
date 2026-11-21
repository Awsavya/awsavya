import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOGO, LOGO_COLORS } from "@/lib/brand";
import { services, site } from "@/lib/site";

// The share card for every route: white, the pixel logo (V and Y solid, the rest grey), the services underneath.
// Drawn at build time; Archivo comes from @fontsource/archivo (WOFF, which ImageResponse can read).
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRAPHITE = "#5A5A56", RULE = "#E1E1DD";
const CELL = 24, GAP = 3; // 41 x 7 cells → 984 x 168 px
const font = () => readFile(join(process.cwd(), "node_modules/@fontsource/archivo/files/archivo-latin-400-normal.woff"));

export default async function Image() {
  const regular = await font();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: LOGO_COLORS.white, padding: "64px 108px", fontFamily: "Archivo" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: GRAPHITE }}>
          <span>Vivek and Yash</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>

        <div style={{ display: "flex", position: "relative", width: LOGO.width * CELL, height: LOGO.height * CELL }}>
          {LOGO.cells.map(([x, y, hot]) => (
            <div key={`${x}-${y}`} style={{ position: "absolute", left: x * CELL, top: y * CELL, width: CELL - GAP, height: CELL - GAP, backgroundColor: hot ? LOGO_COLORS.ink : LOGO_COLORS.dim }} />
          ))}
        </div>

        <div style={{ display: "flex", borderTop: `2px solid ${RULE}`, paddingTop: 24, fontSize: 24, color: GRAPHITE }}>
          {services.map(s => s.name).join("  ·  ")}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: regular, weight: 400, style: "normal" }] },
  );
}
