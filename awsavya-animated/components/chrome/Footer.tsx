import { cta, footer, nav, site } from "@/lib/site";
import { DeliverLink } from "./DeliverLink";
import { FooterEndMark } from "./FooterEndMark";
import { MotionToggle } from "./MotionToggle";

const LETTERS = Array.from(site.name);

/** Ink. Email, links, the Motion toggle, then the grid signs off: A W S A V Y A, one letter per column, and the end mark. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="ftr" data-ground="ink">
      <div className="wrap">
        <div className="grid7 ftr__row">
          <a className="ftr__email" href={`mailto:${site.email}`}><span className="widen" data-text={site.email}>{site.email}</span></a>
          <nav className="ftr__nav" aria-label="Footer">
            <ul className="ftr__list">
              {[...nav, cta].map(item => (
                <li key={item.href}><DeliverLink href={item.href} className="bar-link t-label">{item.label}</DeliverLink></li>
              ))}
            </ul>
          </nav>
          <div className="ftr__meta">
            <MotionToggle />
            <p className="t-small fg-2">{footer.signoff(year)}</p>
          </div>
        </div>
        <div className="grid7 ftr__sign" aria-hidden="true">
          {LETTERS.map((letter, i) => <span key={i} className="ftr__letter">{letter}</span>)}
        </div>
        <div className="grid7 ftr__endrow">
          <p className="t-label fg-2 ftr__end" aria-hidden="true">{footer.end}</p>
          <FooterEndMark />
        </div>
      </div>
    </footer>
  );
}
