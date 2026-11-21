import type { Metadata } from "next";
import { breadcrumbList, pageMetadata } from "@/lib/meta";
import { JsonLd } from "@/components/chrome/JsonLd";
import { DeliverLink } from "@/components/chrome/DeliverLink";
import { FitText } from "@/components/chrome/FitText";
import { Page } from "@/components/chrome/Page";
import { Section } from "@/components/chrome/Section";
import { BriefForm } from "@/components/pages/BriefForm";
import { contact, pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({ ...pageMeta.contact, path: "/contact" });

const [l1, l2] = contact.h1Lines;
const [asideLead, asideTail] = contact.aside.split(site.email);

// One Paper section, then the footer. No close row: this page is the close. Success floods it Stamp.
export default function Contact() {
  return (
    <Page id="contact">
      <Section ground="paper" labelledBy="contact-h1">
        <div className="grid7 pg-hero">
          <FitText as="h1" id="contact-h1" size="l" className="pg-contact-h1" tabIndex={-1} lines={[{ text: l1, indent: "a1" }, { text: l2, indent: "a4" }]} />
          <p className="t-statement pg-c-a4">{contact.statement}</p>
          {/* Web3Forms keys are public by design; read at build time from the Vercel variable. */}
          <div className="pg-form-col"><BriefForm accessKey={process.env.WEB3FORMS_ACCESS_KEY} /></div>
          <p className="t-small pg-aside">
            {asideLead}<a className="inline-link" href={`mailto:${site.email}`}>{site.email}</a>{asideTail}{" "}
            {contact.privacyLead} <DeliverLink href="/privacy" className="inline-link">{contact.privacyLink}</DeliverLink>.
          </p>
        </div>
      </Section>
      <JsonLd data={breadcrumbList([{ name: "Contact", path: "/contact" }])} />
    </Page>
  );
}
