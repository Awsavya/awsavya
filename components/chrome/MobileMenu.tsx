"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { cta, footer, nav, site } from "@/lib/site";
import { D, DRIVE, SETTLE, STAGGER, registerEases } from "@/lib/ease";
import { motionOff } from "@/lib/motion";
import { DeliverLink } from "./DeliverLink";
import { isCurrent } from "./Header";
import { Logo } from "./Logo";
import { MotionToggle } from "./MotionToggle";

const LINKS = [...nav, cta];

/** The top-right corner the flood grows from: 120px wide, header-tall, where the Menu button sits. */
function corner() {
  const hh = document.querySelector(".hdr")?.getBoundingClientRect().height ?? 64;
  return `inset(0px 0px ${Math.max(0, window.innerHeight - hh)}px ${Math.max(0, window.innerWidth - 120)}px)`;
}
/** html.menu-open locks page scroll; "awsavya-menu" tells Lenis to stop/start. */
function flag(open: boolean) {
  document.documentElement.classList.toggle("menu-open", open);
  window.dispatchEvent(new CustomEvent("awsavya-menu", { detail: open }));
}

/**
 * Native modal <dialog>: focus trap, inert page and Escape for free. Opens as an Ink FLOOD from the Menu
 * button's corner (0.54s DRIVE), then the links RISE. Closes in reverse (0.36s). Motion Off: 0.18s opacity.
 * Navigating from it keeps the menu on screen under the DELIVER flood, then closes it in the same commit.
 */
export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const anim = useRef<gsap.core.Animation | null>(null);
  const pathname = usePathname();

  const finish = useCallback(() => {
    const d = ref.current;
    anim.current?.kill(); anim.current = null;
    if (d?.open) d.close();
    if (d) gsap.set([d, ...d.querySelectorAll(".menu__link")], { clearProps: "clipPath,opacity,transform" });
    flag(false);
  }, []);

  const close = useCallback((animate: boolean) => {
    const d = ref.current;
    if (!d?.open) return;
    if (!animate) { finish(); return; }
    registerEases();
    anim.current?.kill();
    anim.current = motionOff()
      ? gsap.to(d, { opacity: 0, duration: D.d1, ease: DRIVE, onComplete: finish })
      : gsap.fromTo(d, { clipPath: d.style.clipPath || "inset(0px 0px 0px 0px)" }, { clipPath: corner(), duration: D.d2, ease: DRIVE, onComplete: finish });
  }, [finish]);

  const open = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return;
    registerEases();
    anim.current?.kill();
    d.showModal();
    closeBtn.current?.focus();
    flag(true);
    if (motionOff()) {
      anim.current = gsap.fromTo(d, { opacity: 0 }, { opacity: 1, duration: D.d1, ease: DRIVE, clearProps: "opacity" });
      return;
    }
    const tl = gsap.timeline();
    tl.fromTo(d, { clipPath: corner() }, { clipPath: "inset(0px 0px 0px 0px)", duration: D.d3, ease: DRIVE, clearProps: "clipPath" });
    tl.fromTo(d.querySelectorAll(".menu__link"),
      { clipPath: "inset(0% 0% 100% 0%)", y: "0.2em" },
      { clipPath: "inset(0% 0% -12% 0%)", y: 0, duration: D.d3, ease: SETTLE, stagger: STAGGER.item, clearProps: "clipPath,transform" }, D.d2);
    anim.current = tl;
  }, []);

  // Open on request from the header's Menu button; close when the layout goes desktop.
  useEffect(() => {
    const d = ref.current;
    const onRequest = () => open();
    const onCancel = (e: Event) => { e.preventDefault(); close(true); };
    const onClosed = () => { if (document.documentElement.classList.contains("menu-open")) finish(); };
    const mq = matchMedia("(min-width: 1024px)");
    const onWide = () => { if (mq.matches) close(false); };
    window.addEventListener("awsavya-menu-request", onRequest);
    d?.addEventListener("cancel", onCancel);
    d?.addEventListener("close", onClosed);
    mq.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("awsavya-menu-request", onRequest);
      d?.removeEventListener("cancel", onCancel);
      d?.removeEventListener("close", onClosed);
      mq.removeEventListener("change", onWide);
      anim.current?.kill();
      if (d?.open) d.close();
      document.documentElement.classList.remove("menu-open");
    };
  }, [open, close, finish]);

  // A route change commits the new page: drop the menu in that same commit, so the DELIVER snapshot
  // of the new page has no menu while the old snapshot keeps it under the flood.
  useLayoutEffect(() => { close(false); }, [pathname, close]);

  return (
    <dialog id="site-menu" ref={ref} className="menu" data-ground="ink" aria-label="Menu" data-lenis-prevent="">
      <div className="menu__top">
        <div className="wrap">
          <div className="grid7 menu__bar">
            <DeliverLink href="/" className="hdr__mark" aria-label={`${site.name}, home`}
              onClick={() => { if (pathname === "/") close(true); }}><Logo className="hdr__logo" /></DeliverLink>
            <button ref={closeBtn} type="button" className="btn btn--line menu__close" onClick={() => close(true)}>
              <span className="btn__label" data-text="Close">Close</span>
            </button>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="grid7 menu__body">
          <nav aria-label="Main">
            <ul className="menu__links">
              {LINKS.map(item => {
                const current = isCurrent(pathname, item.href);
                return (
                  <li key={item.href}>
                    <DeliverLink href={item.href} className="bar-link menu__link" aria-current={current ? "page" : undefined}
                      onClick={() => { if (pathname === item.href) close(true); }}>{item.label}</DeliverLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="menu__meta">
            <a className="t-statement menu__email" href={`mailto:${site.email}`}><span className="widen" data-text={site.email}>{site.email}</span></a>
            <MotionToggle />
            <p className="t-small fg-2">{footer.menuNote}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
