import { useRef, useState, type RefObject } from "react";
import { useMotionScope } from "@/lib/ease";

/**
 * Writes state k onto a .work-state root: data-state (which the CSS reads for every screen, rail and tab)
 * and aria-current="step" on the matching rail item. Pure DOM, so scrolling never re-renders React.
 */
export function applyState(root: HTMLElement, k: number) {
  root.dataset.state = String(k);
  root.querySelectorAll<HTMLElement>("[data-rail-i]").forEach(li => {
    if (li.dataset.railI === String(k)) li.setAttribute("aria-current", "step");
    else li.removeAttribute("aria-current");
  });
}

/**
 * The poster playhead (spec §5.3). n sentinels sit inside the section, 22svh apart; one IntersectionObserver
 * on a line through the middle of the viewport. On any crossing, k = (sentinels above the middle) − 1,
 * clamped to [0, n−1], written to the stage only when it changes. The sentinels start half a viewport down,
 * so every state gets its 22svh while the stage is stuck, and the last state holds for the final 22svh.
 * React state is touched only when entering or leaving the last state (it lands the DONE stamp).
 * Motion Off: no playhead; the final state is shown and the stamp is present.
 */
export function usePosterState(section: RefObject<HTMLElement | null>, stage: RefObject<HTMLElement | null>, n: number) {
  const [atEnd, setAtEnd] = useState(false);
  const end = useRef(false);

  useMotionScope(section, off => {
    const sec = section.current;
    const st = stage.current;
    if (!sec || !st) return;
    let k = -1;
    const write = (next: number) => {
      if (next === k) return;
      k = next;
      applyState(st, next);
      const last = next === n - 1;
      if (last !== end.current) { end.current = last; setAtEnd(last); }
    };
    if (off) { write(n - 1); return; }

    const sentinels = Array.from(sec.querySelectorAll<HTMLElement>("[data-sentinel]"));
    const measure = () => {
      const mid = window.innerHeight / 2;
      let above = 0;
      for (const s of sentinels) if (s.getBoundingClientRect().top < mid) above++;
      write(Math.min(n - 1, Math.max(0, above - 1)));
    };
    const io = new IntersectionObserver(measure, { rootMargin: "-50% 0px -50% 0px" });
    sentinels.forEach(s => io.observe(s));
    measure();
    window.addEventListener("resize", measure);
    return () => { io.disconnect(); window.removeEventListener("resize", measure); };
  }, [n]);

  return atEnd;
}
