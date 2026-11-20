import { useSyncExternalStore } from "react";

// Animation is ON for everyone by default (regardless of the OS reduced-motion setting).
// Visitors can switch it off with the footer toggle; the choice is stored per browser.
const KEY = "awsavya-motion";

export function motionOff() {
  if (typeof window === "undefined") return false;
  try { return localStorage.getItem(KEY) === "off"; } catch { return false; }
}

export function applyMotionAttribute() {
  document.documentElement.dataset.motion = motionOff() ? "off" : "on";
}

export function setMotionOff(off: boolean) {
  try { if (off) localStorage.setItem(KEY, "off"); else localStorage.removeItem(KEY); } catch { /* storage blocked: choice lasts for this page only */ }
  document.documentElement.dataset.motion = off ? "off" : "on";
}

const noSubscribe = () => () => {};
export function useMotionOff() {
  return useSyncExternalStore(noSubscribe, motionOff, () => false);
}
