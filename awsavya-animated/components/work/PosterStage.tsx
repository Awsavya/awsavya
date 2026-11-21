"use client";

import { useRef, type ReactNode } from "react";
import { DoneStamp } from "@/components/chrome/DoneStamp";
import { useMotionScope } from "@/lib/ease";
import type { Ground } from "@/lib/site";
import { usePosterState } from "./usePosterState";
import { vars } from "./vars";

/**
 * One Lineup poster (spec §5.3, lineup mode). A tall section with a sticky stage: the fitted name on top,
 * the device overlapping its lower third, the rail and caption on the left. The playhead steps the screen
 * as the reader scrolls; the last state lands the DONE stamp on the device's lower-left corner.
 * The name RISEs once (0.54s SETTLE) when the poster is 35% into the viewport.
 * Motion Off: not sticky, final state, stamp present (CSS + usePosterState).
 */
export function PosterStage({ id, ground, n, endWord, frame, nameK, name, rail, caption, device, note, after }: {
  id: string; ground: Ground; n: number; endWord: string; frame: "android" | "browser"; nameK: string;
  name: ReactNode; rail: ReactNode; caption: ReactNode; device: ReactNode; note: string; after?: ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const risen = useRef(false);
  const atEnd = usePosterState(section, stage, n);

  // RISE, once. A poster already in view when this runs (reload mid-page, Motion turned back on) just stays.
  useMotionScope(section, off => {
    const sec = section.current;
    const h = title.current;
    if (!sec || !h || off || risen.current) return;
    if (sec.getBoundingClientRect().top < window.innerHeight * .65) { risen.current = true; return; }
    h.dataset.rise = "wait";
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      risen.current = true;
      h.dataset.rise = "go";
    }, { rootMargin: "0px 0px -35% 0px" });
    io.observe(sec);
    const landed = (e: TransitionEvent) => { if (e.target === h && e.propertyName === "clip-path") delete h.dataset.rise; };
    h.addEventListener("transitionend", landed);
    return () => {
      io.disconnect();
      h.removeEventListener("transitionend", landed);
      delete h.dataset.rise;
    };
  });

  return (
    <section ref={section} data-ground={ground} className={`work-poster work-poster--${frame}`} aria-labelledby={id} style={vars({ "--steps": n })}>
      {/* The track holds the sticky stage, so whatever follows it (the "after" link) is never painted under the stage. */}
      <div className="work-poster__track">
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="work-poster__sentinel" data-sentinel="" style={vars({ "--i": i })} aria-hidden="true" />
        ))}
        <div ref={stage} className="work-poster__stage work-state" data-state={n - 1}>
          <div className="wrap grid7 work-poster__wrap" style={vars({ "--name-k": nameK })}>
            <h3 ref={title} id={id} className="work-poster__name">{name}</h3>
            <div className="work-poster__side">{rail}{caption}</div>
            <figure className="work-poster__cell">
              <div className="work-poster__fig">
                <div className="work-devbox">
                  {device}
                  <DoneStamp word={endWord} active={atEnd} className="work-stamp" />
                </div>
              </div>
              <figcaption className="t-small fg-2 work-poster__note">{note}</figcaption>
            </figure>
          </div>
        </div>
      </div>
      {after}
    </section>
  );
}
