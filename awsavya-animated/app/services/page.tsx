import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/site";
export const metadata:Metadata={title:"Services",description:"Explore AWSAVYA's web, application, software, AI and emerging technology capabilities."};
export default function Services(){return <><section className="page-hero page-hero-dark"><p className="eyebrow light">01 / Capabilities</p><h1>Many disciplines.<br/><em>One direction.</em></h1><p>Five ways to turn complex ideas into clear, compelling digital experiences.</p><span className="page-hero-glyph" aria-hidden="true">✳</span></section><section className="services-index section-pad"><div className="section-meta"><span>Explore the disciplines</span><span>01 — 05</span></div>{services.map(s=><Link href={`/services/${s.id}`} className="index-row" key={s.id}><span>{s.number}</span><div><h2>{s.title}</h2><p>{s.short}</p></div><span aria-hidden="true">↗</span></Link>)}</section></>}
