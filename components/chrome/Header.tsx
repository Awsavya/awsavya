"use client";

import { usePathname } from "next/navigation";
import { cta, nav, site } from "@/lib/site";
import { BarLink } from "./Bar";
import { DeliverLink } from "./DeliverLink";
import { Logo } from "./Logo";

export const isCurrent = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/** Sticky, never hides. Colours follow the ground under it (GroundWatcher). */
export function Header() {
  const pathname = usePathname();
  return (
    <header className="hdr" style={{ viewTransitionName: "site-header" }}>
      <div className="wrap hdr__wrap">
        <div className="grid7 hdr__in">
          <DeliverLink href="/" className="hdr__mark" aria-label={`${site.name}, home`}><Logo className="hdr__logo" /></DeliverLink>
          <nav className="hdr__nav" aria-label="Main">
            <ul className="hdr__list">
              {nav.map(item => (
                <li key={item.href}>
                  <DeliverLink href={item.href} className="bar-link t-label" aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>{item.label}</DeliverLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hdr__actions">
            {/* On /contact the page is the brief: no self-link repeating the H1. */}
            {!isCurrent(pathname, cta.href) && <BarLink href={cta.href} className="hdr__cta">{cta.label}</BarLink>}
            <button
              type="button" className="btn btn--line hdr__menu" aria-haspopup="dialog" aria-controls="site-menu"
              onClick={() => window.dispatchEvent(new CustomEvent("awsavya-menu-request"))}
            >
              <span className="btn__label" data-text="Menu">Menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
