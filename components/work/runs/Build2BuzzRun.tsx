"use client";

import { useId, useState } from "react";
import { SampleTag } from "@/components/chrome/SampleTag";
import { b2b, b2bReview, b2bRun } from "../sample-data";
import { vars } from "../vars";
import { useLive } from "./useLive";

const SOURCES = [...b2b.facts, ...b2b.observed].map(s => s.id);
const GROUPS = [
  { title: b2bRun.repoGroup, items: b2b.facts },
  { title: b2bRun.demoGroup, items: b2b.observed },
] as const;

/**
 * Build2Buzz Sample Run: untick a source and the sentence that leans on it is struck out (a 1.5px Fault
 * line, plus "(no source, dropped)" for screen readers). S5 never had a source, so it is always struck.
 * Counts and characters are computed from the kept sentences.
 */
export function Build2BuzzRun() {
  const uid = useId();
  const [using, setUsing] = useState<ReadonlySet<string>>(() => new Set(SOURCES));
  const review = b2bReview(using);
  const [live, say] = useLive(b2bRun.live(review.kept.length, b2b.draft.length));
  const ratio = Math.min(1, review.chars / b2b.limit);

  const toggle = (id: string) => {
    const next = new Set(using);
    if (next.has(id)) next.delete(id); else next.add(id);
    setUsing(next);
    say(b2bRun.live(b2bReview(next).kept.length, b2b.draft.length));
  };

  return (
    <div className="grid7 work-run">
      <div className="work-run__controls" role="group" aria-labelledby={`${uid}-legend`}>
        <p id={`${uid}-legend`} className="t-label work-run__legend">{b2bRun.legend}</p>
        {GROUPS.map(g => (
          <fieldset key={g.title} className="work-field">
            <legend className="t-label fg-2 work-field__legend">{g.title}</legend>
            <div className="work-srcs">
              {g.items.map(s => (
                <label key={s.id} className="work-src">
                  <input type="checkbox" className="work-src__input" checked={using.has(s.id)} onChange={() => toggle(s.id)} />
                  <span className="work-src__box" aria-hidden="true" />
                  <span className="work-src__body">
                    <span className="work-src__use">{b2bRun.use}</span>
                    <span className="work-src__text">{s.text}</span>
                    <span className="work-ref">{`${s.id} · ${s.ref}`}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="work-run__out">
        <p className="t-body work-run__live" aria-live="polite">{live}</p>
        <div className="work-run__panel">
          <div className="work-run__bar"><h3 className="t-label">{b2bRun.draftTitle}</h3><SampleTag /></div>
          <ol className="work-draft">
            {b2b.draft.map(s => {
              const kept = s.source !== null && using.has(s.source);
              return (
                <li key={s.id} className="work-draft__s" data-struck={kept ? undefined : ""}>
                  <span className="work-draft__text">
                    {s.text}
                    {!kept && <span className="sr-only">{` ${b2bRun.dropped}`}</span>}
                  </span>
                  <span className={kept ? "work-ref" : "work-ref work-ref--none"}>{kept ? s.source : b2b.noSource}</span>
                </li>
              );
            })}
          </ol>
          <div className="work-run__meter">
            <p className="t-data">{review.line}</p>
            <span className="work-meter" style={vars({ "--r": ratio.toFixed(3) })} aria-hidden="true"><span /></span>
          </div>
          <p className="t-small fg-2">{b2bRun.caption}</p>
        </div>
      </div>
    </div>
  );
}
