import { DeliverLink } from "@/components/chrome/DeliverLink";
import { services, servicesPage } from "@/lib/site";

/**
 * The four services as tall rows on Silver. Each name is the link to its service page: hovering, focusing
 * or pressing it WIDENs the name and draws its bar. A hidden copy at the wide setting shares the name's
 * grid cell, so the row never reflows. Which build shows which service lives in the cross-reference below.
 */
export function ServiceRows() {
  return (
    <ul className="pg-srows">
      {services.map(s => (
        <li key={s.slug} className="grid7 pg-srow">
          <h2 className="t-display pg-srow__name" data-text={s.name}>
            <DeliverLink href={`/services/${s.slug}`} className="pg-srow__link"><span className="pg-srow__nm">{s.name}</span></DeliverLink>
          </h2>
          <p className="t-body pg-srow__lede">{s.lede}</p>
          <div className="pg-srow__stack">
            <p className="t-label fg-2 pg-key">{servicesPage.stackLabel}</p>
            <ul className="t-small pg-dots">
              {s.stack.map(x => <li key={x.name}>{x.name}</li>)}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
