"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/site";

export default function AnimatedCapabilities() {
  const [active, setActive] = useState(0);
  const item = services[active];
  return <div className="av-cap-explorer"><div className="av-cap-tabs" role="group" aria-label="AWSAVYA capabilities">{services.map((service,index)=><button key={service.icon} type="button" id={`av-tab-${service.icon}`} aria-pressed={active===index} aria-controls="av-cap-panel" onClick={()=>setActive(index)}><span>{service.number}</span>{service.title}</button>)}</div><div className="av-cap-panel" id="av-cap-panel" role="region" aria-labelledby={`av-tab-${item.icon}`}><div className="av-cap-copy"><span className="av-kicker">{item.number} / {item.title.toUpperCase()}</span><h3>{item.title}</h3><p>{item.description}</p><ul>{item.tags.map(tag=><li key={tag}><Check size={14}/>{tag}</li>)}</ul><Link href={`/services#${item.icon}`}>Explore this capability <ArrowUpRight size={15}/></Link></div><div className={`av-cap-visual av-cap-visual-${item.icon}`} aria-hidden="true"><div className="av-cap-visual-top"><span>AWSAVYA / {item.title.toUpperCase()}</span><i>PRODUCT SYSTEMS</i></div><div className="av-cap-visual-main"><span className="av-cap-visual-code">{["01", "02", "03", "04", "05"][active]}</span><strong>{["Mobile, made useful.","Web, with a purpose.","Built around your work.","Intelligence, applied.","Less repetition. Better flow."][active]}</strong><div className="av-cap-diagram">{(active===4?["TRIGGER","RULES","ACTION"]:active===3?["SOURCES","MODEL","REVIEW"]:active===2?["PEOPLE","PROCESS","SYSTEM"]:active===0?["MOBILE","DATA","SYNC"]:["CONTENT","INTERFACE","PLATFORM"]).map((label,index)=><span key={label}><i>{String(index+1).padStart(2,"0")}</i>{label}</span>)}</div></div><div className="av-cap-visual-footer">DESIGN <b>+</b> ENGINEERING <b>+</b> DELIVERY</div></div></div></div>;
}
