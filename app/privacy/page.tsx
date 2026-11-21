import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";
import { FitText } from "@/components/chrome/FitText";
import { Page } from "@/components/chrome/Page";
import { Section } from "@/components/chrome/Section";
import { pageMeta, privacy, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ ...pageMeta.privacy, path: "/privacy" });

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: pageMeta.privacy.title, item: `${site.url}/privacy` },
  ],
};

const [askLead, askTail] = privacy.ask.split(site.email);

// A legal page, so it stays calm: Paper title → Silver short version → Paper detail. No flood, no stamp.
export default function Privacy() {
  return (
    <Page id="privacy">
      <Section ground="paper" labelledBy="privacy-h1">
        <div className="grid7 pg-hero">
          <FitText as="h1" id="privacy-h1" size="l" tabIndex={-1} lines={[{ text: privacy.h1, indent: "a1" }]} />
          <p className="t-statement pg-c-a4">{privacy.statement}</p>
          <p className="t-label fg-2 pg-c-a4">{privacy.updated}</p>
        </div>
      </Section>

      <Section ground="silver" labelledBy="privacy-short">
        <div className="grid7 pg-block">
          <h2 id="privacy-short" className="t-display pg-c-title">{privacy.shortTitle}</h2>
          <ul className="pg-wont">
            {privacy.short.map(item => <li key={item} className="t-statement pg-wont__item">{item}</li>)}
          </ul>
        </div>
      </Section>

      <Section ground="paper" labelledBy="privacy-detail">
        <div className="grid7 pg-block">
          <h2 id="privacy-detail" className="t-display pg-c-title">{privacy.detailTitle}</h2>
          <ul className="pg-rows">
            {privacy.detail.map(d => (
              <li key={d.title} className="grid7 pg-rows__row pg-pair">
                <h3 className="t-statement t-statement--strong pg-pair__k">{d.title}</h3>
                <div className="pg-pair__v pg-privacy__body">
                  {d.body.map(p => <p key={p} className="t-body">{p}</p>)}
                </div>
              </li>
            ))}
            <li className="grid7 pg-rows__row pg-pair">
              <h3 className="t-statement t-statement--strong pg-pair__k">{privacy.askTitle}</h3>
              <p className="t-body pg-pair__v">
                {askLead}<a className="inline-link" href={`mailto:${site.email}`}>{site.email}</a>{askTail}
              </p>
            </li>
          </ul>
        </div>
      </Section>

      {/* Last, so the first Section stays the page's first child (the first-load H1 landing keys on that). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </Page>
  );
}
