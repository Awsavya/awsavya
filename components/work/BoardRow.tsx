"use client";

import { useRef, useState, type ReactNode } from "react";
import { DoneStamp } from "@/components/chrome/DoneStamp";
import { D, useMotionScope } from "@/lib/ease";
import { applyState } from "./usePosterState";

/**
 * One work-board row (spec §4.2, board mode). Rows are always open on every pointer, so nothing below
 * moves while the pointer passes. The mini device plays its states once, 0.72s each, when the row is
 * half in view, ending on a small DONE stamp. Motion Off: the final state and the stamp, no timer.
 */
export function BoardRow({ id, n, endWord, frame, name, facts, device, note }: {
  id: string; n: number; endWord: string; frame: "android" | "browser";
  name: ReactNode; facts: ReactNode; device: ReactNode; note: string;
}) {
  const row = useRef<HTMLElement>(null);
  const stage = useRef<HTMLElement>(null);
  const played = useRef(false);
  const [done, setDone] = useState(false);

  useMotionScope(row, off => {
    const el = row.current;
    const st = stage.current;
    if (!el || !st) return;
    if (off || played.current) { applyState(st, n - 1); setDone(true); return; }

    applyState(st, 0);
    setDone(false);
    let timer = 0;
    const play = () => {
      if (played.current) return;
      played.current = true;
      let k = 0;
      const step = () => {
        k += 1;
        applyState(st, k);
        if (k >= n - 1) { setDone(true); return; }
        timer = window.setTimeout(step, D.d4 * 1000);
      };
      timer = window.setTimeout(step, D.d4 * 1000);
    };

    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { io.disconnect(); play(); } }, { threshold: .5 });
    io.observe(el);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [n]);

  return (
    <article ref={row} className={`work-row work-row--${frame}`} aria-labelledby={id}>
      <div className="grid7 work-row__grid">
        {name}
        {facts}
        <div className="work-row__open">
          <div className="work-row__inner">
            <figure ref={stage} className="work-state work-row__stage" data-state={n - 1}>
              <div className="work-devbox">
                {device}
                <DoneStamp word={endWord} active={done} size="s" className="work-stamp" />
              </div>
              <figcaption className="t-small fg-2 work-row__note">{note}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </article>
  );
}
