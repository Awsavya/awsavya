import { useSyncExternalStore } from "react";

// Motion is ON for every visitor and every device by default. It is never gated on an OS setting.
// The one opt-out is the footer/menu toggle, stored per browser and applied live (no reload).
const KEY = "awsavya-motion";
const EVT = "awsavya-motion";

export function motionOff(): boolean {
  if (typeof document === "undefined") return false;
  const a = document.documentElement.dataset.motion;
  if (a) return a === "off";
  try { return localStorage.getItem(KEY) === "off"; } catch { return false; }
}

export function applyMotionAttribute() {
  document.documentElement.dataset.motion = motionOff() ? "off" : "on";
}

export function setMotionOff(off: boolean) {
  try { if (off) localStorage.setItem(KEY, "off"); else localStorage.removeItem(KEY); } catch { /* storage blocked: lasts for this page */ }
  document.documentElement.dataset.motion = off ? "off" : "on";
  window.dispatchEvent(new CustomEvent(EVT, { detail: off }));
}

function subscribe(cb: () => void) {
  // "storage" fires when another tab changes the choice: mirror it onto this document first.
  const onStorage = (e: StorageEvent) => { if (e.key === KEY || e.key === null) { document.documentElement.dataset.motion = e.newValue === "off" ? "off" : "on"; cb(); } };
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener(EVT, cb); window.removeEventListener("storage", onStorage); };
}

export function useMotionOff() {
  return useSyncExternalStore(subscribe, motionOff, () => false);
}
