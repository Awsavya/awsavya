import type { Metadata } from "next";
import { CloseRow } from "@/components/chrome/CloseRow";
import { Page } from "@/components/chrome/Page";
import { Section } from "@/components/chrome/Section";
import SettleHero from "@/components/home/SettleHero";
import TakeOn from "@/components/home/TakeOn";
import VYTeaser from "@/components/home/VYTeaser";
import Lineup from "@/components/work/Lineup";
import { pageMetadata } from "@/lib/meta";
import { home, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ description: site.description, path: "/" });

// Home (§4.1): the Settle up hero and its Baseline flood, the Lineup, what we take on, V × Y, the close row.
// The H1 and lede are server-rendered and never animate, so the LCP is never held back by the hero's JS.
export default function Home() {
  return (
    <Page id="home">
      <Section ground="paper" id="top" labelledBy="home-h1" className="home-hero">
        <div className="grid7 home-hero__head">
          <h1 id="home-h1" className="t-statement t-statement--strong home-hero__h1" tabIndex={-1}>{home.h1}</h1>
          <p className="t-body home-hero__lede">{home.lede}</p>
        </div>
        <SettleHero />
      </Section>
      <Lineup />
      <TakeOn />
      <VYTeaser />
      <CloseRow ground="paper" />
    </Page>
  );
}
