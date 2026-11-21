"use client";

import { useId, useState } from "react";
import { footer } from "@/lib/site";
import { setMotionOff, useMotionOff } from "@/lib/motion";

/** Motion: On | Off. Native radios (arrow keys for free), applied live with no reload. Footer and menu stay in sync. */
export function MotionToggle({ className }: { className?: string }) {
  const off = useMotionOff();
  const name = useId();
  const [note, setNote] = useState("");
  const change = (value: "on" | "off") => {
    setMotionOff(value === "off");
    setNote(value === "off" ? footer.motion.offNote : footer.motion.onNote);
  };
  return (
    <fieldset className={className ? `mtog ${className}` : "mtog"}>
      <legend className="t-label mtog__legend">{footer.motion.legend}</legend>
      <div className="mtog__opts">
        {(["on", "off"] as const).map(v => (
          <label key={v} className="mtog__opt">
            <input className="mtog__input" type="radio" name={name} value={v} checked={v === "off" ? off : !off} onChange={() => change(v)} />
            <span className="mtog__face">{v === "off" ? footer.motion.off : footer.motion.on}</span>
          </label>
        ))}
      </div>
      <p className="t-small fg-2 mtog__note" aria-live="polite">{note}</p>
    </fieldset>
  );
}
