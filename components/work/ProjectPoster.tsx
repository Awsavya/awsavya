import type { ReactNode } from "react";
import { DeliverLink } from "@/components/chrome/DeliverLink";
import { FitText } from "@/components/chrome/FitText";
import { fitK } from "@/lib/fit";
import { work, type Project } from "@/lib/site";
import { PosterStage } from "./PosterStage";
import { ProjectDevice } from "./ProjectDevice";
import { StateRail } from "./StateRail";

/** A Lineup poster for one built project: name (DELIVER morph source), rail, caption, device, stamp. */
export function ProjectPoster({ project: p, after }: { project: Project; after?: ReactNode }) {
  const id = `poster-${p.slug}`;
  const n = p.states.length;
  return (
    <PosterStage
      id={id} ground={p.lineupGround} n={n} endWord={p.endWord} frame={p.frame}
      nameK={fitK([{ text: p.name }]).toFixed(4)}
      name={
        <DeliverLink href={`/work/${p.slug}`} className="work-name-link">
          <FitText as="span" lines={p.name} size="xl" morph={p.slug} />
        </DeliverLink>
      }
      rail={<StateRail project={p} id={id} current={n - 1} />}
      caption={<p className="t-small fg-2 work-poster__caption">{p.caption}</p>}
      device={<ProjectDevice project={p} />}
      note={work.screenNote}
      after={after}
    />
  );
}
