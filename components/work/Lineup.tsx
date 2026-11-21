import { DeliverLink } from "@/components/chrome/DeliverLink";
import { Section } from "@/components/chrome/Section";
import { home, projects } from "@/lib/site";
import { ProjectPoster } from "./ProjectPoster";

/**
 * Home sections 2–5 (spec §4.1): the Ink intro that picks up from the Baseline flood, then the four
 * full-screen posters (Ink, Paper, Silver, Ink). The last one ends with the way into /work.
 * Default export, no props.
 */
export default function Lineup() {
  const last = projects.length - 1;
  return (
    <>
      <Section ground="ink" id="work" labelledBy="lineup-title" className="work-intro">
        <div className="grid7 work-intro__grid">
          <h2 id="lineup-title" className="t-statement t-statement--strong work-intro__title">{home.lineupTitle}</h2>
          <p className="t-body work-intro__lead">{home.lineupStatement}</p>
        </div>
      </Section>
      {projects.map((p, i) => (
        <ProjectPoster key={p.slug} project={p} after={i === last ? (
          <div className="wrap grid7 work-poster__after">
            <DeliverLink href="/work" className="bar-link t-statement t-statement--strong work-poster__more">{home.lineupMore}</DeliverLink>
          </div>
        ) : undefined} />
      ))}
    </>
  );
}
