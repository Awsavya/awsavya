import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CloseRow } from "@/components/chrome/CloseRow";
import { DeliverLink } from "@/components/chrome/DeliverLink";
import { FitText } from "@/components/chrome/FitText";
import { Page } from "@/components/chrome/Page";
import { Section } from "@/components/chrome/Section";
import ProofPoster from "@/components/work/ProofPoster";
import { nextService, projectBySlug, serviceBySlug, services, servicesPage } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  return s ? { title: s.name, description: s.lede } : {};
}

// Ink poster → Paper questions → Silver proof → Paper stack, then the next service under a rule → Silver close.
export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const proof = s.proof.map(p => projectBySlug(p)).filter(p => p !== undefined);
  const next = nextService(s.slug);

  return (
    <Page key={slug} id="service">
      <Section ground="ink" labelledBy="service-h1">
        <div className="grid7 pg-hero">
          <FitText as="h1" id="service-h1" size="xl" tabIndex={-1} lines={s.lines} />
          <p className="t-statement pg-c-a4">{s.lede}</p>
          <div className="pg-c-meta">
            <p className="t-label fg-2 pg-key">{servicesPage.proof}</p>
            <ul className="pg-links">
              {proof.map(p => (
                <li key={p.slug}><DeliverLink href={`/work/${p.slug}`} className="bar-link t-body">{p.name}</DeliverLink></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section ground="paper" labelledBy="ask-title">
        <div className="grid7 pg-block">
          <h2 id="ask-title" className="t-display pg-c-title">{servicesPage.askTitle}</h2>
          <ul className="pg-rows">
            {s.questions.map(q => (
              <li key={q} className="grid7 pg-rows__row"><p className="t-statement pg-c-a4">{q}</p></li>
            ))}
          </ul>
        </div>
      </Section>

      <ProofPoster slug={s.proof[0]} ground="silver" />

      <Section ground="paper" labelledBy="stack-title">
        <div className="grid7 pg-block">
          <h2 id="stack-title" className="t-display pg-c-title">{servicesPage.stackTitle}</h2>
          <div>
            <dl className="pg-rows">
              {s.stack.map(x => (
                <div key={x.name} className="grid7 pg-rows__row pg-stack">
                  <dt className="t-body pg-stack__name">{x.name}</dt>
                  <dd className="t-body pg-stack__use">{x.usedFor}</dd>
                  <dd className="t-label fg-2 pg-stack__where">{x.where}</dd>
                </div>
              ))}
            </dl>
            <div className="grid7 pg-also">
              <p className="t-label pg-also__key">{servicesPage.alsoTitle}</p>
              <ul className="t-body pg-also__list">
                {s.also.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section ground="paper" className="sec--tight pg-next-sec">
        <div className="grid7 pg-next">
          <p className="t-label fg-2 pg-next__key">{servicesPage.next}</p>
          <p className="pg-next__line">
            <DeliverLink href={`/services/${next.slug}`} className="bar-link t-display pg-next__link">{next.name}</DeliverLink>
          </p>
        </div>
      </Section>

      <CloseRow ground="silver" />
    </Page>
  );
}
