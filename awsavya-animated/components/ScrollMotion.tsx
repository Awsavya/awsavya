"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";
import { introDelay } from "@/lib/intro";
import { motionOff } from "@/lib/motion";

export function ScrollMotion() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    if (motionOff()) {
      const gentle=gentleFades();
      const settle=requestAnimationFrame(()=>ScrollTrigger.refresh());
      return ()=>{cancelAnimationFrame(settle);gentle.revert();};
    }
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

      // Marquee: endless loop whose speed, direction and skew follow scroll velocity.
      const band=document.querySelector<HTMLElement>(".transition-band");
      const marquee=band?.querySelector<HTMLElement>(".transition-track");
      if(band&&marquee){
        const kids=marquee.children;
        const round=()=>(kids[kids.length/3] as HTMLElement).offsetLeft-(kids[0] as HTMLElement).offsetLeft;
        const loop=gsap.fromTo(marquee,{x:0,xPercent:0},{x:()=>-round(),duration:26,ease:"none",repeat:-1});
        loop.totalTime(loop.duration()*400);
        const skew=gsap.quickTo(marquee,"skewX",{duration:.45,ease:"power3"});
        const settle=gsap.delayedCall(.12,()=>skew(0)).pause();
        ScrollTrigger.create({trigger:band,start:"top bottom",end:"bottom top",onUpdate:self=>{
          const velocity=self.getVelocity();
          gsap.killTweensOf(loop);
          loop.timeScale(self.direction*(1+Math.min(6,Math.abs(velocity)/300)));
          gsap.to(loop,{timeScale:self.direction,duration:1.2,ease:"power2.out"});
          skew(gsap.utils.clamp(-14,14,velocity/-220));
          settle.restart(true);
        }});
      }

      // Project cards lean into fast scrolling, then spring back.
      const rows=gsap.utils.toArray<HTMLElement>(".project-list .project-row");
      if(rows.length){
        const lean=gsap.quickTo(rows,"skewX",{duration:.6,ease:"power3"});
        const straighten=gsap.delayedCall(.15,()=>lean(0)).pause();
        ScrollTrigger.create({trigger:rows[0].parentElement??rows[0],start:"top bottom",end:"bottom top",onUpdate:self=>{lean(gsap.utils.clamp(-7,7,self.getVelocity()/-350));straighten.restart(true);}});
      }

      // Inner-page heroes: masked line-by-line headline, staged details, then parallax as they scroll away.
      gsap.utils.toArray<HTMLElement>(".page-hero, .project-detail-hero, .not-found").forEach(hero=>{
        const q=gsap.utils.selector(hero);
        const title=q("h1")[0] as HTMLElement|undefined;
        const split=title?SplitText.create(title,{type:"lines",mask:"lines",aria:"none"}):null;
        gsap.timeline({defaults:{ease:"power3.out"},delay:introDelay()+.3})
          .fromTo(q(".eyebrow"),{y:24,opacity:0},{y:0,opacity:1,duration:.7})
          .fromTo(split?.lines??[],{yPercent:115},{yPercent:0,duration:1.25,stagger:.11,ease:"expo.out",onComplete:()=>split?.revert()},"-=.45")
          .fromTo(q("h1 ~ p, h1 ~ .pill-button"),{y:26,opacity:0},{y:0,opacity:1,duration:.8,stagger:.08},"-=.85")
          .fromTo(q(".page-hero-glyph"),{rotate:-60,scale:.7,opacity:0},{rotate:0,scale:1,opacity:1,duration:1.6,ease:"expo.out"},0)
          .fromTo(q(".detail-art span"),{scale:0,opacity:0},{scale:1,opacity:1,duration:.7,stagger:.05,ease:"back.out(1.7)"},.2)
          .fromTo(q(".project-art"),{y:60,opacity:0},{y:0,opacity:1,duration:1.1,clearProps:"transform"},.25);
        gsap.to(q("h1"),{y:-70,ease:"none",scrollTrigger:{trigger:hero,start:"top top",end:"bottom top",scrub:true}});
        gsap.to(q(".page-hero-glyph"),{rotate:90,ease:"none",scrollTrigger:{trigger:hero,start:"top top",end:"bottom top",scrub:true}});
      });

      // Section headings rise line by line from behind a mask. Headings with their own effects are left alone.
      gsap.utils.toArray<HTMLElement>("main h2").filter(el=>!el.closest(".display-statement, .final-cta, .index-row, .hero")&&!el.classList.contains("display-statement")).forEach(el=>{
        SplitText.create(el,{type:"lines",mask:"lines",aria:"none",autoSplit:true,onSplit:self=>gsap.from(self.lines,{yPercent:110,duration:1.1,stagger:.09,ease:"expo.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}})});
      });

      // Everything else on inner pages (and the footer) rises in as it enters the viewport. Home sections already use data-reveal.
      const reveal=[".page-hero ~ section .section-meta",".index-row",".about-body .display-statement",".about-principles > div",".about-close > *",".detail-intro",".detail-columns > div",".project-facts > div",".project-story > div",".study-figure",".project-tech",".study-note",".contact-section > div",".contact-form > :not(.honeypot)",".work-page .project-row",".next-chapter",".site-footer > div:not(.footer-giant)"].join(",");
      const items=gsap.utils.toArray<HTMLElement>(reveal).filter(el=>!el.hasAttribute("data-reveal"));
      if(items.length){
        gsap.set(items,{y:48,opacity:0});
        ScrollTrigger.batch(items,{start:"top 92%",once:true,onEnter:batch=>gsap.to(batch,{y:0,opacity:1,duration:.85,stagger:.09,ease:"power3.out",overwrite:true,clearProps:"transform"})});
      }

      // Giant footer wordmark climbs out of its baseline as the page ends.
      const giant=document.querySelector<HTMLElement>(".footer-giant");
      if(giant)gsap.fromTo(".footer-giant span",{yPercent:105},{yPercent:0,stagger:.06,ease:"none",scrollTrigger:{trigger:giant,start:"top bottom",end:"bottom bottom",scrub:.8}});
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

// Reduced motion: content still fades in softly, but nothing moves, scales, spins, skews, pins or scrubs with scroll.
function gentleFades(){
  return gsap.context(()=>{
    gsap.fromTo(".hero-content > *, .page-hero > :not(.page-hero-glyph), .project-detail-hero > *, .not-found > *",{opacity:0},{opacity:1,duration:.9,stagger:.12,ease:"power1.out",delay:.1});
    const items=gsap.utils.toArray<HTMLElement>("[data-reveal], .project-list .project-row, .section-meta, .index-row, .about-body .display-statement, .about-principles > div, .about-close > *, .detail-intro, .detail-columns > div, .project-facts > div, .project-story > div, .study-figure, .project-tech, .study-note, .contact-section > div, .contact-form > :not(.honeypot), .next-chapter, .final-cta-content, .site-footer > div").filter((el,index,all)=>!all.some(other=>other!==el&&other.contains(el)));
    if(!items.length)return;
    gsap.set(items,{opacity:0});
    ScrollTrigger.batch(items,{start:"top 92%",once:true,onEnter:batch=>gsap.to(batch,{opacity:1,duration:.7,stagger:.08,ease:"power1.out",overwrite:true})});
  });
}
