"use client";

import { useRef, useState, type ReactNode } from "react";
import { DoneStamp } from "@/components/chrome/DoneStamp";
import { useMotionScope } from "@/lib/ease";
import type { Project } from "@/lib/site";
import { from, states } from "./sample-data";
import { applyState } from "./usePosterState";

const PHONE = "(max-width: 639px)";

/**
 * Long mode (project page, "How it moves"): one text step per simplified state, 70svh each, beside a sticky
 * device (pinned to the top on phones). A line through the viewport (60% down; 85% on phones, under the
 * pinned device) decides the current step; the device follows and the last step lands the DONE stamp.
 * With Motion Off it still steps as the reader scrolls; the CSS turns every change into an opacity fade.
 */
export function StateSteps({ project, frame, device, note }: { project: Project; frame: "android" | "browser"; device: ReactNode; note: string }) {
  const root = useRef<HTMLDivElement>(null);
  const end = useRef(false);
  const [atEnd, setAtEnd] = useState(false);
  const n = project.states.length;

  useMotionScope(root, () => {
    const el = root.current;
    if (!el) return;
    const texts = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    const mq = matchMedia(PHONE);
    let k = -1;
    let io: IntersectionObserver | null = null;

    const measure = () => {
      const line = window.innerHeight * (mq.matches ? .85 : .6);
      let above = 0;
      for (const t of texts) if (t.getBoundingClientRect().top < line) above++;
      const next = Math.min(n - 1, Math.max(0, above - 1));
      if (next === k) return;
      k = next;
      applyState(el, k);
      const last = k === n - 1;
      if (last !== end.current) { end.current = last; setAtEnd(last); }
    };
    const build = () => {
      io?.disconnect();
      const top = mq.matches ? 85 : 60;
      io = new IntersectionObserver(measure, { rootMargin: `-${top}% 0px -${100 - top}% 0px` });
      texts.forEach(t => io?.observe(t));
      measure();
    };
    build();
    mq.addEventListener("change", build);
    window.addEventListener("resize", measure);
    return () => {
      io?.disconnect();
      mq.removeEventListener("change", build);
      window.removeEventListener("resize", measure);
    };
  }, [n]);

  return (
    <div ref={root} className={`grid7 work-long work-long--${frame} work-state`} data-state={0}>
      <div className="work-long__dev">
        <figure className="work-long__fig">
          <div className="work-long__box">
            <div className="work-devbox">
              {device}
              <DoneStamp word={project.endWord} active={atEnd} className="work-stamp" />
            </div>
          </div>
          <figcaption className="t-small fg-2 work-long__note">{note}</figcaption>
        </figure>
      </div>
      <ol className="work-long__steps">
        {project.states.map((s, i) => (
          <li key={s.key} className="work-step" data-now={states(i)} data-done={from(i + 1, n)}>
            <div className="work-step__text" data-step="">
              <h3 className="t-label work-step__label">{s.label}</h3>
              <p className="t-statement work-step__line">{s.line}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
