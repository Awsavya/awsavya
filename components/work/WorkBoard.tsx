import { DeliverLink } from "@/components/chrome/DeliverLink";
import { FitText } from "@/components/chrome/FitText";
import { Section } from "@/components/chrome/Section";
import { projects, work } from "@/lib/site";
import { BoardRow } from "./BoardRow";
import { ProjectDevice } from "./ProjectDevice";

/**
 * The work board (spec §4.2): four always-open rows split by hairlines. The name is the poster moment and
 * the DELIVER morph source; each row's device plays to its DONE stamp. No filters, tags or counts.
 */
export function WorkBoard() {
  return (
    <Section ground="silver" className="work-board">
      <div className="work-board__list">
        {projects.map(p => {
          const id = p.slug; // the bare slug, so the classic site's /work#tripsplit links still land on the row
          return (
            <BoardRow
              key={p.slug} id={id} n={p.states.length} endWord={p.endWord} frame={p.frame}
              name={
                <h2 id={id} className="work-row__name">
                  <DeliverLink href={`/work/${p.slug}`} className="work-name-link">
                    <FitText as="span" lines={p.name} size="l" morph={p.slug} />
                  </DeliverLink>
                </h2>
              }
              facts={
                <p className="t-small work-row__facts">
                  <span>{p.platform}</span>
                  <span>{p.stack.slice(0, 3).map(s => s.name).join(" · ")}</span>
                </p>
              }
              device={<ProjectDevice project={p} />}
              note={work.screenNote}
            />
          );
        })}
      </div>
    </Section>
  );
}
