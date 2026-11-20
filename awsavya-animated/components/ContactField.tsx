"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionOff } from "@/lib/motion";

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; phase: number };
export function ContactField({ subtle = false }: { subtle?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current, host = element?.parentElement;
    if (!element || !host) return;
    const context = element.getContext("2d");
    if (!context) return;
    const reduced = motionOff();
    const coarse = matchMedia("(pointer: coarse)").matches;
    const count = coarse ? 85 : 230;
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      x: ((i * 89) % count) / count,
      y: ((i * 47) % count) / count,
      vx: 0, vy: 0,
      radius: .5 + ((i * 23) % 13) / 13 * 1.5,
      phase: i * 1.27,
    }));
    const state = { width: 1, height: 1, pointerX: -.5, pointerY: -.5, progress: 0, visible: false };
    let frame = 0;
    const resize = () => {
      const rect = host.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, coarse ? 1 : 1.5);
      state.width = Math.max(1, rect.width); state.height = Math.max(1, rect.height);
      element.width = Math.ceil(state.width * dpr); element.height = Math.ceil(state.height * dpr);
      element.style.width = `${state.width}px`; element.style.height = `${state.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize); observer.observe(host);
    const visibility = new IntersectionObserver(entries => { state.visible = entries[0].isIntersecting; if (state.visible) draw(); }, { rootMargin: "80px" }); visibility.observe(host);
    const move = (event: PointerEvent) => { const rect = host.getBoundingClientRect(); state.pointerX = event.clientX - rect.left; state.pointerY = event.clientY - rect.top; };
    const leave = () => { state.pointerX = -.5; state.pointerY = -.5; };
    host.addEventListener("pointermove", move); host.addEventListener("pointerleave", leave);
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({ trigger: host, start: "top bottom", end: "center center", scrub: true, onUpdate: self => { state.progress = self.progress; if (reduced) draw(); } });
    function draw() {
      if (!state.visible) return;
      const w = state.width, h = state.height;
      context!.clearRect(0, 0, w, h);
      const cx = subtle ? w * .7 : w * .76, cy = h * .62;
      const positions: { x: number; y: number }[] = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const angle = p.phase * 2.39996;
        const spreadX = p.x * w, spreadY = p.y * h;
        const gatheredX = cx + Math.cos(angle) * (55 + (i % 17) * 8);
        const gatheredY = cy + Math.sin(angle) * (55 + (i % 13) * 8);
        let targetX = spreadX + (gatheredX - spreadX) * state.progress * .75;
        let targetY = spreadY + (gatheredY - spreadY) * state.progress * .75;
        if (!reduced) { targetX += Math.sin(performance.now() * .0004 + p.phase) * 9; targetY += Math.cos(performance.now() * .00045 + p.phase) * 9; }
        const dx = targetX - state.pointerX, dy = targetY - state.pointerY, dist = Math.hypot(dx, dy);
        if (dist < 105 && dist > 0) { const force = (1 - dist / 105) * 58; targetX += dx / dist * force; targetY += dy / dist * force; }
        p.vx = (p.vx + (targetX - p.x * w) * .025) * .82;
        p.vy = (p.vy + (targetY - p.y * h) * .025) * .82;
        const x = targetX + p.vx, y = targetY + p.vy;
        positions.push({ x, y });
        context!.fillStyle = `rgba(151, 227, 239, ${.2 + p.radius * .22})`;
        context!.beginPath(); context!.arc(x, y, p.radius, 0, Math.PI * 2); context!.fill();
      }
      context!.strokeStyle = "rgba(143, 221, 234, .09)"; context!.lineWidth = .6;
      for (let i = 0; i < positions.length - 1; i += 3) {
        const a = positions[i], b = positions[i + 1];
        if (Math.hypot(a.x - b.x, a.y - b.y) < 150) { context!.beginPath(); context!.moveTo(a.x, a.y); context!.lineTo(b.x, b.y); context!.stroke(); }
      }
      if (!reduced) frame = requestAnimationFrame(draw);
    }
    return () => { cancelAnimationFrame(frame); trigger.kill(); observer.disconnect(); visibility.disconnect(); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); };
  }, [subtle]);
  return <canvas className="contact-field" ref={canvas} aria-hidden="true" />;
}
