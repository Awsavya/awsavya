import type { ReactNode } from "react";
import { ui } from "./sample-data";

/**
 * A drawn device. Android: Ink 2 body, 10px bezel, 28/20px radii, Sheet screen, status bar printing
 * SAMPLE DATA. Browser: square corners, a 32px Ink 2 bar with "SAMPLE DATA · {PRODUCT}" in the address
 * field. No shadows, no gloss. To assistive tech the whole drawing is one image with a text alternative;
 * the state rails, step text and Sample Runs carry the same information as text.
 */
export function DeviceFrame({ kind, product, label, className, children }: {
  kind: "android" | "browser"; product: string; label: string; className?: string; children: ReactNode;
}) {
  return (
    <div className={["work-device", `work-device--${kind}`, className].filter(Boolean).join(" ")} role="img" aria-label={label}>
      {kind === "browser" && (
        <div className="work-device__bar" aria-hidden="true">
          <span className="work-device__nav"><span /><span /></span>
          <span className="work-device__address">{`${ui.sample} · ${product}`}</span>
        </div>
      )}
      <div className="work-device__screen" aria-hidden="true">
        {kind === "android" && (
          <div className="work-device__status">
            <span className="work-device__tag">{ui.sample}</span>
            <span className="work-device__cam" />
            <span className="work-device__sys"><span /><span /><span /><span className="work-device__batt" /></span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
