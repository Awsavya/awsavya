import type { Metadata } from "next";
import { CloseRow } from "@/components/chrome/CloseRow";
import { FitText } from "@/components/chrome/FitText";
import { Page } from "@/components/chrome/Page";
import { Section } from "@/components/chrome/Section";
import { CrossReference } from "@/components/pages/CrossReference";
import { ServiceRows } from "@/components/pages/ServiceRows";
import { pageMeta, servicesPage } from "@/lib/site";

export const metadata: Metadata = { title: pageMeta.services.title, description: pageMeta.services.description };

const [l1, l2] = servicesPage.h1Lines;

// Paper poster → Silver rows → Paper cross-reference → Silver close. Light 80%.
export default function Services() {
  return (
    <Page id="services">
      <Section ground="paper" labelledBy="services-h1">
        <div className="grid7 pg-hero">
          <FitText as="h1" id="services-h1" size="xl" tabIndex={-1} lines={[{ text: l1, indent: "a1" }, { text: l2, indent: "a4" }]} />
          <p className="t-statement pg-c-a4">{servicesPage.statement}</p>
        </div>
      </Section>
      <Section ground="silver" className="pg-srows-sec">
        <ServiceRows />
      </Section>
      <Section ground="paper" labelledBy="xref-title">
        <div className="grid7 pg-block">
          <h2 id="xref-title" className="t-display pg-c-title">{servicesPage.crossTitle}</h2>
          <CrossReference />
        </div>
      </Section>
      <CloseRow ground="silver" />
    </Page>
  );
}
