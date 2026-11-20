import { motionOff } from "./motion";

// Seconds to hold first-load entrance animations so they start as the CSS preloader lifts (~2.2s after navigation start).
// After in-app navigation the page has been open longer than that, so this returns 0.
export function introDelay() {
  if (typeof window === "undefined" || motionOff()) return 0;
  return Math.max(0, 2.2 - performance.now() / 1000);
}
