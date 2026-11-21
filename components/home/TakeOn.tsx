import { Fragment } from "react";
import { DeliverLink } from "@/components/chrome/DeliverLink";
import { Section } from "@/components/chrome/Section";
import { home, projectBySlug, services, servicesPage } from "@/lib/site";

/**
 * Home §6. Four full-width rows, one per service, each a single link. The name WIDENs and draws its bar on
 * hover, focus or press; nothing animates on entry. Proof is plain text inside the row (no nested links).
 */
export default function TakeOn() {
  return (
    <Section ground="paper" id="services" labelledBy="home-take-title" className="home-take">
      <div className="grid7">
        <h2 id="home-take-title" className="t-display home-take__title">{home.takeOnTitle}</h2>
      </div>
      <ul className="home-take__list">
        {services.map(s => {
          const proof = [
            ...s.proof.map(slug => projectBySlug(slug)?.name).filter((n): n is string => Boolean(n)),
            ...(s.thisSite ? [servicesPage.thisWebsite] : []),
          ].join(" · ");
          return (
            <li key={s.slug} className="home-take__item">
              <DeliverLink href={`/services/${s.slug}`} className="grid7 home-take__row">
                <h3 className="t-display home-take__name">
                  <span className="home-take__text">
                    {/* Poster line splits, each on one line; the spaces keep the accessible name whole. */}
                    {s.lines.map((line, i) => (
                      <Fragment key={line}>
                        <span className="home-take__line">{line}</span>
                        {i < s.lines.length - 1 ? " " : null}
                      </Fragment>
                    ))}
                  </span>
                </h3>
                <p className="t-body home-take__short">{s.short}</p>
                <p className="t-label home-take__proof">{proof}</p>
              </DeliverLink>
            </li>
          );
        })}
      </ul>
      <div className="grid7 home-take__more">
        <DeliverLink href="/services" className="bar-link t-label home-take__all">{home.takeOnMore}</DeliverLink>
      </div>
    </Section>
  );
}
