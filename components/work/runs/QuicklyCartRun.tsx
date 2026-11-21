"use client";

import { useState } from "react";
import { BarButton } from "@/components/chrome/Bar";
import { DoneStamp } from "@/components/chrome/DoneStamp";
import { work, type Project } from "@/lib/site";
import { DeviceFrame } from "../DeviceFrame";
import { qc, qcRun, ui } from "../sample-data";
import { QuicklyCartScreen } from "../screens/QuicklyCartScreen";
import { useLive } from "./useLive";

/**
 * QuicklyCart Sample Run: move one sample order a step at a time. "Repeat last step" changes nothing and
 * says so, which is the owner-stated idempotent transition, shown honestly.
 */
export function QuicklyCartRun({ project }: { project: Project }) {
  const n = project.states.length;
  const [order, setOrder] = useState(0);
  const [step, setStep] = useState(0);
  const [live, say, said] = useLive(qcRun.live(qc.orders[0], qc.steps[0].phrase));
  const id = qc.orders[order];
  const atEnd = step >= n - 1;

  const advance = () => {
    if (atEnd) { say(qcRun.end(id)); return; }
    const next = step + 1;
    setStep(next);
    say(qcRun.live(id, qc.steps[next].phrase));
  };
  const repeat = () => say(qcRun.repeated(qc.steps[step].phrase));
  const fresh = () => {
    const no = (order + 1) % qc.orders.length;
    setOrder(no);
    setStep(0);
    say(qcRun.live(qc.orders[no], qc.steps[0].phrase));
  };

  return (
    <div className="grid7 work-run work-run--device work-run--browser">
      <div className="work-run__controls">
        <p className="t-body work-run__live" aria-live="polite">{live}</p>
        <div className="work-run__actions">
          <BarButton label={qcRun.advance} onClick={advance} aria-disabled={atEnd || undefined} />
          <BarButton label={qcRun.repeat} tone="line" onClick={repeat} />
          <BarButton label={qcRun.fresh} tone="line" onClick={fresh} />
        </div>
      </div>
      <div className="work-run__out">
        <div className="work-state work-run__stage" data-state={step}>
          <div className="work-devbox">
            <DeviceFrame kind={project.frame} product={project.name} label={ui.deviceAt(project.name, said)} className={`work-device--${project.slug}`}>
              <QuicklyCartScreen project={project} order={order} />
            </DeviceFrame>
            <DoneStamp word={project.endWord} active={atEnd} size="s" className="work-stamp" />
          </div>
          <p className="t-small fg-2 work-run__note">{work.screenNote}</p>
        </div>
      </div>
    </div>
  );
}
