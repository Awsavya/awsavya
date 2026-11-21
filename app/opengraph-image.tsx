import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { services, site } from "@/lib/site";

// The share card for every route: Paper, the wordmark in Ink, one violet stamp. Colours are the :root tokens.
// Archivo comes from @fontsource/archivo (WOFF, which ImageResponse can read); the card is drawn at build time.
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F5F4F8", INK = "#15131C", GRAPHITE = "#57536A", RULE = "#C9C6D2", STAMP = "#672891";
const font = (weight: number) => readFile(join(process.cwd(), `node_modules/@fontsource/archivo/files/archivo-latin-${weight}-normal.woff`));

export default async function Image() {
  const [regular, heavy] = await Promise.all([font(400), font(800)]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: PAPER, padding: "64px 72px", color: INK, fontFamily: "Archivo" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: GRAPHITE }}>
          <span>Vivek and Yash</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <span style={{ fontSize: 204, fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.035em" }}>{site.name}</span>
          <span style={{ position: "absolute", right: 0, bottom: -40, display: "flex", backgroundColor: STAMP, color: PAPER, fontSize: 60, fontWeight: 800, padding: "2px 22px 6px", textTransform: "uppercase" }}>
            Settled
          </span>
        </div>

        <div style={{ display: "flex", borderTop: `2px solid ${RULE}`, paddingTop: 24, fontSize: 24, color: GRAPHITE }}>
          {services.map(s => s.name).join("  ·  ")}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: heavy, weight: 800, style: "normal" },
      ],
    },
  );
}
