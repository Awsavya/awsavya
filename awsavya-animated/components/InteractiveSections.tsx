"use client";

import Link from "next/link";
import { useState } from "react";
import { services, universe } from "@/lib/site";

export function ServiceExplorer() {
  const [active,setActive]=useState(0);
  const current=services[active];
  return <div className="service-explorer">
    <div className="service-list" role="tablist" aria-label="Explore services">{services.map((service,index)=><button key={service.id} type="button" role="tab" aria-selected={active===index} aria-controls="service-detail" id={`service-tab-${index}`} className={`service-option ${active===index?"selected":""}`} onClick={()=>setActive(index)}><span className="service-number">{service.number}</span><span>{service.title}</span><span className="service-option-arrow" aria-hidden="true">↗</span></button>)}</div>
    <div className="service-stage" id="service-detail" role="tabpanel" aria-labelledby={`service-tab-${active}`} key={current.id}>
      <div className={`service-form form-${current.form}`} aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
      <div className="service-stage-copy"><span className="eyebrow">Capability / {current.number}</span><h3>{current.short}</h3><p>{current.description}</p><Link className="text-link" href={`/services/${current.id}`}>Explore capability <span aria-hidden="true">↗</span></Link></div>
    </div>
  </div>;
}

export function UniverseExplorer() {
  const [active,setActive]=useState(0);
  return <div className="universe-explorer">
    <div className="universe-map" aria-label="Explore connected capabilities">{universe.map((item,index)=><button key={item.name} className={`universe-node node-${index+1} ${active===index?"selected":""}`} type="button" onClick={()=>setActive(index)} aria-label={`Explore ${item.name}`}><span className="node-pulse" /><span>{item.name}</span></button>)}<div className="map-orbit orbit-one"/><div className="map-orbit orbit-two"/><div className="map-core">A<span>✳</span></div></div>
    <div className="universe-readout" aria-live="polite"><span className="eyebrow">Signal 0{active+1} / 05</span><h3>{universe[active].name}</h3><p>{universe[active].detail}</p><span className="readout-line" /></div>
  </div>;
}
