import { ImageResponse } from "next/og";

export const alt = "AWSAVYA — Digital Product Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#faf9f6",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Top header row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#14171a",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <span style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em", color: "#14171a" }}>
            AWSAVYA<span style={{ color: "#2563eb" }}>.</span>
          </span>
          <span
            style={{
              marginLeft: "16px",
              fontSize: "13px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5e6673",
              border: "1px solid #e6e4dc",
              padding: "4px 12px",
              borderRadius: "20px",
              backgroundColor: "#ffffff",
            }}
          >
            Digital Product Studio
          </span>
        </div>

        {/* Center content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "920px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#14171a",
              margin: 0,
            }}
          >
            Technology for your next move.
          </h1>
          <p style={{ fontSize: "24px", color: "#5e6673", margin: 0, lineHeight: 1.4 }}>
            Apps, Web, Custom Software, Applied AI &amp; Automation
          </p>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #e6e4dc",
            paddingTop: "24px",
            color: "#88909e",
            fontSize: "16px",
          }}
        >
          <span>https://www.awsavya.in</span>
          <span>Crafted with intention</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
