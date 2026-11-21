import type { Metadata } from "next";
import { breadcrumbList, pageMetadata } from "@/lib/meta";
import { JsonLd } from "@/components/chrome/JsonLd";
import { CloseRow } from "@/components/chrome/CloseRow";
import { Page } from "@/components/chrome/Page";
import { Section } from "@/components/chrome/Section";
import { WorkBoard } from "@/components/work/WorkBoard";
import { pageMeta, work } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ ...pageMeta.work, path: "/work" });

/** Work index (spec §4.2): Paper head, the Silver board, the close row. */
export default function Work() {
  return (
    <Page id="work">
      <Section ground="paper" className="work-head" labelledBy="work-h1">
        <div className="grid7 work-head__grid">
          <h1 id="work-h1" className="t-display work-head__title" tabIndex={-1}>{work.h1}</h1>
          <p className="t-statement work-head__lead">{work.statement}</p>
          <p className="t-label fg-2 work-head__label">{work.label}</p>
        </div>
      </Section>
      <WorkBoard />
      <CloseRow ground="paper" />
      <JsonLd data={breadcrumbList([{ name: "Work", path: "/work" }])} />
    </Page>
  );
}
