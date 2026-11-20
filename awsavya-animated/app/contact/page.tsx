import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactField } from "@/components/ContactField";
import { site } from "@/lib/site";
export const metadata:Metadata={title:"Contact",description:"Start a conversation with AWSAVYA about a digital product or experience."};
export default function Contact(){return <><section className="page-hero page-hero-dark contact-hero"><ContactField subtle /><p className="eyebrow light">04 / Get in touch</p><h1>Let’s make<br/><em>something matter.</em></h1><p>Tell us what you’re imagining. We’ll start with the right questions.</p><span className="page-hero-glyph" aria-hidden="true">✳</span></section><section className="contact-section section-pad"><div><p className="eyebrow">Start here</p><h2>Share the spark.</h2><p>Describe your idea, challenge, or early thought. A useful conversation can start anywhere.</p><a href={`mailto:${site.email}`} className="contact-email">{site.email} ↗</a></div><ContactForm /></section></>}
