import type { ReactNode } from "react";

export default function SectionHeading({ eyebrow, title, accent, children, center = false }: { eyebrow: string; title: string; accent?: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={`section-heading ${center ? "section-heading-center" : ""}`}>
      <span className="eyebrow"><span className="eyebrow-dot" /> {eyebrow}</span>
      <h2>{title}{accent && <> <span>{accent}</span></>}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
