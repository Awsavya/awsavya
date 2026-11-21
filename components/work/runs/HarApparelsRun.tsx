"use client";

import { useState } from "react";
import { BarButton } from "@/components/chrome/Bar";
import { DoneStamp } from "@/components/chrome/DoneStamp";
import { work, type Project } from "@/lib/site";
import { DeviceFrame } from "../DeviceFrame";
import { har, harRun, ui } from "../sample-data";
import { HarApparelsScreen } from "../screens/HarApparelsScreen";
import { useLive } from "./useLive";

/**
 * Har Apparels Sample Run: log the batch through its stages on the redrawn floor screen, or start a new
 * sample batch. One stage per press; the result is announced.
 */
export function HarApparelsRun({ project }: { project: Project }) {
  const n = project.states.length;
  const [batch, setBatch] = useState(0);
  const [stage, setStage] = useState(0);
  const [live, say, said] = useLive(harRun.live(har.batches[0].id, har.stages[0].at));
  const b = har.batches[batch];
  const atEnd = stage >= n - 1;

  const log = () => {
    if (atEnd) { say(harRun.end(b.id)); return; }
    const next = stage + 1;
    setStage(next);
    say(harRun.live(b.id, har.stages[next].at));
  };
  const fresh = () => {
    const nb = (batch + 1) % har.batches.length;
    setBatch(nb);
    setStage(0);
    say(harRun.live(har.batches[nb].id, har.stages[0].at));
  };

  return (
    <div className="grid7 work-run work-run--device work-run--android">
      <div className="work-run__controls">
        <p className="t-body work-run__live" aria-live="polite">{live}</p>
        <p className="t-small fg-2">{atEnd ? harRun.allLogged : `${harRun.nextUp}: ${har.stages[stage + 1].label}`}</p>
        <div className="work-run__actions">
          <BarButton label={harRun.log} onClick={log} aria-disabled={atEnd || undefined} />
          <BarButton label={harRun.fresh} tone="line" onClick={fresh} />
        </div>
      </div>
      <div className="work-run__out">
        <div className="work-state work-run__stage" data-state={stage}>
          <div className="work-devbox">
            <DeviceFrame kind={project.frame} product={project.name} label={ui.deviceAt(project.name, said)} className={`work-device--${project.slug}`}>
              <HarApparelsScreen project={project} batch={batch} />
            </DeviceFrame>
            <DoneStamp word={project.endWord} active={atEnd} size="s" className="work-stamp" />
          </div>
          <p className="t-small fg-2 work-run__note">{work.screenNote}</p>
        </div>
      </div>
    </div>
  );
}
