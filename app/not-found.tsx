import type { Metadata } from "next";
import { DeliverLink } from "@/components/chrome/DeliverLink";
import { Page } from "@/components/chrome/Page";
import { Section } from "@/components/chrome/Section";
import { NotFoundMark } from "@/components/pages/NotFoundMark";
import { notFound } from "@/lib/site";

// Replaces the layout's "index, follow" so a missing page carries only noindex.
export const metadata: Metadata = { title: "Page not found", description: notFound.statement, robots: { index: false, follow: true } };

// One Ink screen. The letters never settle, and there is no violet anywhere (pages.css, chrome.css).
export default function NotFound() {
  return (
    <Page id="404">
      <Section ground="ink" className="pg-nf" labelledBy="nf-h1">
        <div className="grid7 pg-nf__grid">
          <NotFoundMark />
          <div className="grid7 pg-nf__foot">
            <p className="t-statement pg-c-a4">{notFound.statement}</p>
            <ul className="pg-c-a4 pg-nf__links">
              <li><DeliverLink href="/" className="bar-link t-body pg-nf__link">{notFound.home}</DeliverLink></li>
              <li><DeliverLink href="/work" className="bar-link t-body pg-nf__link">{notFound.work}</DeliverLink></li>
            </ul>
          </div>
        </div>
      </Section>
    </Page>
  );
}
