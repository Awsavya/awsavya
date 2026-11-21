import { DeliverLink } from "@/components/chrome/DeliverLink";
import { DoneStamp } from "@/components/chrome/DoneStamp";
import { FitText } from "@/components/chrome/FitText";
import { Section } from "@/components/chrome/Section";
import { fitK } from "@/lib/fit";
import { projectBySlug, work, type Ground, type ProjectSlug } from "@/lib/site";
import { ProjectDevice } from "./ProjectDevice";
import { vars } from "./vars";

/**
 * Compact poster for a service page's proof (spec §5.3): the name (fitted, no morph: the service page
 * never names a project twice for DELIVER), the device resting in its final state with its DONE stamp,
 * the caption and a link to the project. Static: nothing plays.
 */
export default function ProofPoster({ slug, ground }: { slug: ProjectSlug; ground: Ground }) {
  const p = projectBySlug(slug);
  if (!p) return null;
  const id = `proof-${p.slug}`;
  return (
    <Section ground={ground} className={`work-proof work-proof--${p.frame}`} labelledBy={id}>
      <div className="grid7 work-proof__grid" style={vars({ "--name-k": fitK([{ text: p.name }]).toFixed(4) })}>
        <FitText as="h2" id={id} lines={p.name} size="l" className="work-proof__name" />
        <div className="work-proof__side">
          <p className="t-small fg-2">{p.caption}</p>
          <DeliverLink href={`/work/${p.slug}`} className="bar-link t-label">{work.proofLink(p.name)}</DeliverLink>
        </div>
        <figure className="work-proof__cell">
          <div className="work-state work-proof__stage" data-state={p.states.length - 1}>
            <div className="work-devbox">
              <ProjectDevice project={p} />
              <DoneStamp word={p.endWord} active className="work-stamp" />
            </div>
          </div>
          <figcaption className="t-small fg-2 work-proof__note">{work.screenNote}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
