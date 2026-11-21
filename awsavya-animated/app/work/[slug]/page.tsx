import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CloseRow } from "@/components/chrome/CloseRow";
import { DeliverLink } from "@/components/chrome/DeliverLink";
import { FitText } from "@/components/chrome/FitText";
import { Page } from "@/components/chrome/Page";
import { Section } from "@/components/chrome/Section";
import { ProjectDevice } from "@/components/work/ProjectDevice";
import { StateSteps } from "@/components/work/StateSteps";
import { Build2BuzzRun } from "@/components/work/runs/Build2BuzzRun";
import { HarApparelsRun } from "@/components/work/runs/HarApparelsRun";
import { QuicklyCartRun } from "@/components/work/runs/QuicklyCartRun";
import { TripSplitRun } from "@/components/work/runs/TripSplitRun";
import { nextProject, projectBySlug, projects, work, type Project } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = projectBySlug((await params).slug);
  return p ? { title: `${p.name} — ${p.label}`, description: p.oneLine } : {};
}

function Run({ project }: { project: Project }) {
  switch (project.slug) {
    case "tripsplit": return <TripSplitRun />;
    case "build2buzz": return <Build2BuzzRun />;
    case "har-apparels": return <HarApparelsRun project={project} />;
    case "quicklycart": return <QuicklyCartRun project={project} />;
  }
}

/** Project detail (spec §4.3): Ink hero (the DELIVER landing), Paper tangle, Silver how it moves, then Paper try, stack and next. */
export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const next = nextProject(p.slug);
  const facts = [
    { k: work.facts.platform, v: p.platform },
    { k: work.facts.stack, v: p.stack.slice(0, 3).map(s => s.name).join(" · ") },
    { k: work.facts.builtBy, v: work.builtBy },
    { k: work.facts.status, v: work.status },
  ];

  return (
    <Page key={slug} id="project">
      <Section ground="ink" className="work-hero" labelledBy="project-h1">
        <div className="grid7 work-hero__grid">
          <FitText as="h1" id="project-h1" lines={p.name} size="xl" morph={p.slug} tabIndex={-1} className="work-hero__name" />
          <p className="t-statement work-hero__lead">{p.oneLine}</p>
          <dl className="work-facts">
            {facts.map(f => (
              <div key={f.k} className="work-facts__row">
                <dt className="t-label fg-2">{f.k}</dt>
                <dd className="t-small">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section ground="paper" className="work-tangle" labelledBy="tangle-title">
        <div className="grid7 work-tangle__grid">
          <h2 id="tangle-title" className="t-display work-tangle__q">{p.question}</h2>
          <p className="t-body work-tangle__body">{p.tangle}</p>
        </div>
      </Section>

      <Section ground="silver" className="work-moves" labelledBy="moves-title">
        <h2 id="moves-title" className="t-display work-moves__title">{work.statesTitle(p.endWord)}</h2>
        <StateSteps project={p} frame={p.frame} device={<ProjectDevice project={p} />} note={work.screenNote} />
      </Section>

      <Section ground="paper" className="work-try" labelledBy="try-title">
        <h2 id="try-title" className="t-display">{work.tryTitle[p.slug]}</h2>
        <Run project={p} />
        <p className="t-small fg-2 work-try__note">{work.tryNote}</p>
      </Section>

      <Section ground="paper" className="work-built" labelledBy="built-title">
        <h2 id="built-title" className="t-display">{work.builtWithTitle}</h2>
        <dl className="work-built__list">
          {p.stack.map(s => (
            <div key={s.name} className="grid7 work-built__row">
              <dt className="t-body work-built__name">{s.name}</dt>
              <dd className="t-body work-built__use">{s.usedFor}</dd>
            </div>
          ))}
        </dl>
        <p className="t-small fg-2 work-built__note">{work.real}</p>
      </Section>

      <Section ground="paper" className="work-next" labelledBy="next-title">
        <h2 id="next-title" className="t-label fg-2 work-next__label">{work.next}</h2>
        <DeliverLink href={`/work/${next.slug}`} className="work-name-link work-next__link">
          <FitText as="span" lines={next.name} size="l" morph={next.slug} morphAfterMount />
          <span className="t-label work-next__end"><span>{next.endWord}</span></span>
        </DeliverLink>
      </Section>

      <CloseRow ground="silver" />
    </Page>
  );
}
