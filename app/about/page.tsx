import type { Metadata } from "next";
import { breadcrumbList, faqPage, pageMetadata } from "@/lib/meta";
import { CloseRow } from "@/components/chrome/CloseRow";
import { JsonLd } from "@/components/chrome/JsonLd";
import { Page } from "@/components/chrome/Page";
import { Section } from "@/components/chrome/Section";
import { VYMark } from "@/components/pages/VYMark";
import { about, founders, pageMeta, phases, site, timelineDisclaimer } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ ...pageMeta.about, path: "/about" });

/** The answer text exactly as in the FAQ data, with the email address made a mailto link. */
function withEmail(text: string) {
  const [lead, ...rest] = text.split(site.email);
  return rest.length ? <>{lead}<a className="inline-link" href={`mailto:${site.email}`}>{site.email}</a>{rest.join(site.email)}</> : text;
}

// Paper V×Y → Ink how → Silver won't → Paper first project → (Silver own words) → FAQ (Silver, or Paper after own
// words) → close (Paper, or Silver after own words). Light 75%.
export default function About() {
  // Founder-written notes only. Never filled with placeholder text: both must exist or the section stays out.
  const notes = founders.every(f => f.note);

  return (
    <Page id="about">
      <Section ground="paper" labelledBy="about-h1">
        <div className="grid7 pg-hero">
          <p className="t-statement pg-c-title">{about.lead}</p>
          <h1 id="about-h1" className="pg-vy-h1" tabIndex={-1}>
            <span className="sr-only">{about.h1}</span>
            <VYMark />
          </h1>
          <p className="sr-only">{founders.map(f => `${f.name}, ${f.role}.`).join(" ")}</p>
          <p className="t-body pg-c-a4">{about.meaning}</p>
        </div>
      </Section>

      <Section ground="ink" labelledBy="how-title">
        <div className="grid7 pg-block">
          <h2 id="how-title" className="t-display pg-c-title">{about.howTitle}</h2>
          <ul className="pg-rows">
            {about.how.map(h => (
              <li key={h.title} className="grid7 pg-rows__row pg-pair">
                <h3 className="t-statement t-statement--strong pg-pair__k">{h.title}</h3>
                <p className="t-body pg-pair__v">{h.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section ground="silver" labelledBy="wont-title">
        <div className="grid7 pg-block">
          <h2 id="wont-title" className="t-display pg-c-title">{about.wontTitle}</h2>
          <ul className="pg-wont">
            {about.wont.map(w => <li key={w} className="t-statement pg-wont__item">{w}</li>)}
          </ul>
        </div>
      </Section>

      <Section ground="paper" labelledBy="phases-title">
        <div className="grid7 pg-block">
          <h2 id="phases-title" className="t-display pg-c-title">{about.phasesTitle}</h2>
          <ol className="pg-rows">
            {phases.map(p => (
              <li key={p.label} className="grid7 pg-rows__row pg-phase">
                <h3 className="t-statement t-statement--strong pg-phase__label">{p.label}</h3>
                <p className="t-label pg-phase__time">{p.duration}</p>
                <p className="t-body pg-phase__sum">{p.summary}</p>
              </li>
            ))}
          </ol>
          <p className="t-small fg-2 pg-c-a4">{timelineDisclaimer}</p>
        </div>
      </Section>

      {notes && (
        <Section ground="silver" labelledBy="words-title">
          <div className="grid7 pg-block">
            <h2 id="words-title" className="t-display pg-c-title">{about.ownWordsTitle}</h2>
            <ul className="pg-rows">
              {founders.map(f => (
                <li key={f.name} className="grid7 pg-rows__row pg-pair">
                  <h3 className="t-label pg-pair__k">{f.name}</h3>
                  <p className="t-body pg-pair__v">{f.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section ground={notes ? "paper" : "silver"} labelledBy="faq-title">
        <div className="grid7 pg-block">
          <h2 id="faq-title" className="t-display pg-c-title">{about.faqTitle}</h2>
          <ul className="pg-rows">
            {about.faq.map(f => (
              <li key={f.q} className="grid7 pg-rows__row pg-pair">
                <h3 className="t-statement t-statement--strong pg-pair__k">{f.q}</h3>
                <p className="t-body pg-pair__v">{withEmail(f.a)}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CloseRow ground={notes ? "silver" : "paper"} />
      <JsonLd data={faqPage(about.faq)} />
      <JsonLd data={breadcrumbList([{ name: "About", path: "/about" }])} />
    </Page>
  );
}
