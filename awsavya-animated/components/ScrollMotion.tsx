"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export function ScrollMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(el=>gsap.fromTo(el,{y:42,opacity:0},{y:0,opacity:1,duration:.8,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}}));
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach(el=>gsap.to(el,{yPercent:-13,ease:"none",scrollTrigger:{trigger:el.parentElement,start:"top bottom",end:"bottom top",scrub:true}}));
      const intro=document.querySelector<HTMLElement>(".intro");
      if(intro){
        gsap.fromTo(".intro .display-statement span",{backgroundPosition:"0% 0%"},{backgroundPosition:"100% 0%",scrollTrigger:{trigger:intro,start:"top 75%",end:"bottom 25%",scrub:true}});
        gsap.to(".intro-orbit",{rotate:115,scale:1.15,ease:"none",scrollTrigger:{trigger:intro,start:"top bottom",end:"bottom top",scrub:true}});
      }
      const capabilities=document.querySelector<HTMLElement>(".capabilities");
      if(capabilities)gsap.fromTo(".service-option",{rotateX:55,y:45,opacity:.3},{rotateX:0,y:0,opacity:1,stagger:.1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:capabilities,start:"top 55%",once:true}});
      const work=document.querySelector<HTMLElement>(".work-section:not(.work-page)");
      const track=work?.querySelector<HTMLElement>(".project-list");
      if(work&&track&&innerWidth>=1000){
        const distance=()=>Math.max(0,track.scrollWidth-(innerWidth-clampPadding()*2));
        gsap.to(track,{x:()=>-distance(),ease:"none",scrollTrigger:{trigger:work,start:"top top",end:()=>`+=${distance()+innerHeight*.25}`,scrub:1,pin:true,anticipatePin:1,invalidateOnRefresh:true}});
      }
      const universe=document.querySelector<HTMLElement>(".universe-section");
      if(universe){
        gsap.fromTo(".universe-node",{scale:.65,opacity:0},{scale:1,opacity:1,stagger:.08,duration:.7,ease:"back.out(1.5)",scrollTrigger:{trigger:universe,start:"top 65%",once:true}});
        gsap.to(".map-orbit",{rotate:100,ease:"none",scrollTrigger:{trigger:universe,start:"top bottom",end:"bottom top",scrub:true}});
      }
      const final=document.querySelector<HTMLElement>(".final-cta");
      if(final)gsap.fromTo(".final-cta h2",{y:95,rotateX:18,opacity:.4},{y:0,rotateX:0,opacity:1,ease:"none",scrollTrigger:{trigger:final,start:"top 75%",end:"top 20%",scrub:true}});
    });
    const refresh=requestAnimationFrame(()=>ScrollTrigger.refresh());
    const final=document.querySelector<HTMLElement>(".final-cta");
    const move=(event:PointerEvent)=>{if(!final)return;const rect=final.getBoundingClientRect();final.style.setProperty("--light-x",`${event.clientX-rect.left}px`);final.style.setProperty("--light-y",`${event.clientY-rect.top}px`);};
    final?.addEventListener("pointermove",move);
    return ()=>{cancelAnimationFrame(refresh);final?.removeEventListener("pointermove",move);ctx.revert();};
  },[pathname]);
  return null;
}

function clampPadding(){return Math.min(96,Math.max(24,innerWidth*.05));}
