"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { nav, site } from "@/lib/site";
import { applyMotionAttribute, motionOff } from "@/lib/motion";
import { MotionToggle } from "./MotionToggle";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { applyMotionAttribute(); }, []);
  const pathname = usePathname();
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    window.dispatchEvent(new CustomEvent("awsavya-menu", { detail: open }));
    return () => document.body.classList.remove("menu-open");
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    if (!open || motionOff()) return;
    const entrance = gsap.fromTo(".menu-panel-inner > a", { y: 75, opacity: 0, rotateX: -18 }, { y: 0, opacity: 1, rotateX: 0, duration: .72, stagger: .07, ease: "power3.out", delay: .16 });
    return () => { entrance.kill(); };
  }, [open]);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const travel = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${travel > 0 ? Math.min(1, scrollY / travel) : 0})`;
    };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [pathname]);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="AWSAVYA, home" onClick={() => setOpen(false)}><span className="mark-symbol" aria-hidden="true">✳</span> AWSAVYA<span className="wordmark-dot">.</span></Link>
      <div className="header-center">Independent digital exploration <span className="status-dot" aria-hidden="true" /></div>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}><span>{open ? "Close" : "Menu"}</span><span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true"><i /><i /></span></button>
    </header>
    <div className="scroll-progress" ref={progress} aria-hidden="true" />
    <nav id="site-menu" className={`menu-panel ${open ? "is-open" : ""}`} aria-label="Main navigation" aria-hidden={!open} onPointerMove={event => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--menu-x", `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty("--menu-y", `${event.clientY - rect.top}px`); }}>
      <div className="menu-geometry" aria-hidden="true"><i/><i/><i/></div>
      <div className="menu-panel-inner"><p className="eyebrow">Navigate the universe / 001—005</p>{nav.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className={pathname === item.href ? "active" : ""}><small>0{index + 1}</small><span>{item.label}</span><span aria-hidden="true">↗</span></Link>)}<p className="menu-email"><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
    </nav>
    <Cursor />
    <main id="main">{children}</main>
    <footer className="site-footer"><div><Link href="/" className="footer-wordmark">AWSAVYA<span>.</span></Link><p>Curiosity, translated into digital form.</p></div><div className="footer-links">{nav.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div><div className="footer-end"><a href={`mailto:${site.email}`}>{site.email}</a><MotionToggle /><span>© {new Date().getFullYear()} AWSAVYA</span></div><div className="footer-giant" aria-hidden="true">{"AWSAVYA".split("").map((letter, index) => <span key={index}>{letter}</span>)}</div></footer>
    <svg className="fx-defs" aria-hidden="true" focusable="false"><filter id="awsavya-liquid" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence id="awsavya-liquid-noise" type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="noise" /><feDisplacementMap id="awsavya-liquid-map" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" /></filter></svg>
  </>;
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (motionOff() || !matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    document.body.classList.add("custom-cursor-ready");
    let x = -100, y = -100, tx = -100, ty = -100, frame = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; el.classList.add("visible"); };
    const over = (e: Event) => {
      const target = e.target instanceof Element ? e.target : null;
      const input = target?.closest("input, textarea, select, [contenteditable]");
      const interactive = target?.closest("[data-cursor], a, button");
      el.classList.toggle("active", !!interactive && !input);
      el.classList.toggle("over-input", !!input);
      const label = el.querySelector<HTMLElement>(".cursor-label");
      if (label) label.textContent = input ? "" : interactive?.getAttribute("data-cursor") || (interactive?.closest(".project-row") ? "VIEW" : interactive ? "OPEN" : "");
    };
    const tick = () => { x += (tx - x) * .19; y += (ty - y) * .19; el.style.transform = `translate3d(${x}px, ${y}px, 0)`; frame = requestAnimationFrame(tick); };
    tick(); window.addEventListener("pointermove", move); document.addEventListener("pointerover", over);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); document.body.classList.remove("custom-cursor-ready"); };
  }, []);
  return <div className="cursor-ring" ref={ref} aria-hidden="true"><span className="cursor-label"/></div>;
}
