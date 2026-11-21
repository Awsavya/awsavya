import { DeliverLink } from "@/components/chrome/DeliverLink";
import { projects, services, servicesPage, type ServiceSlug } from "@/lib/site";

// What each kind of work is called inside a sentence: "TripSplit is a mobile app. Open the project." (spec §4.4)
const KIND: Record<ServiceSlug, string> = {
  "mobile-apps": "a mobile app",
  "websites-and-web-platforms": "a website or web platform",
  "custom-software": "custom software",
  "applied-ai-and-automation": "applied AI and automation",
};

/**
 * Which build shows which kind of work: a real <table> (services × builds). A filled cell is a bar that
 * links to the project; an empty cell is an honest dash. Hover or focus on a filled cell tints its row and
 * column (pages.css). Below 640px each row becomes one line ("Mobile apps — TripSplit, Har Apparels"); the
 * explicit roles keep the table semantics through that display change.
 */
export function CrossReference() {
  return (
    <div className="pg-xref-wrap">
      <table className="pg-xref" role="table">
        <caption className="sr-only">{servicesPage.crossCaption}</caption>
        <thead role="rowgroup">
          <tr role="row">
            <td role="cell" className="pg-xref__corner" />
            {projects.map(p => <th key={p.slug} scope="col" role="columnheader" className="t-label pg-xref__col">{p.name}</th>)}
            <th scope="col" role="columnheader" className="t-label pg-xref__col">{servicesPage.thisWebsite}</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {services.map(s => (
            <tr key={s.slug} role="row" className="pg-xref__row">
              <th scope="row" role="rowheader" className="t-body pg-xref__svc">{s.name}</th>
              {projects.map(p => p.services.includes(s.slug) ? (
                <td key={p.slug} role="cell" className="pg-xref__cell" data-filled="">
                  <DeliverLink href={`/work/${p.slug}`} className="pg-xref__hit" aria-label={`${p.name} is ${KIND[s.slug]}. Open the project.`}>
                    <span className="pg-xref__bar" aria-hidden="true" />
                    <span className="t-body pg-xref__nm" aria-hidden="true">{p.name}</span>
                  </DeliverLink>
                </td>
              ) : <Empty key={p.slug} />)}
              {s.thisSite ? (
                <td role="cell" className="pg-xref__cell" data-filled="">
                  <span className="pg-xref__hit">
                    <span className="pg-xref__bar" aria-hidden="true" />
                    <span className="t-body pg-xref__nm" aria-hidden="true">{servicesPage.thisWebsite}</span>
                    <span className="sr-only">{`${servicesPage.thisWebsite} is ${KIND[s.slug]}.`}</span>
                  </span>
                </td>
              ) : <Empty />}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="t-small fg-2 pg-xref__legend">{servicesPage.crossLegend}</p>
    </div>
  );
}

function Empty() {
  return (
    <td role="cell" className="pg-xref__cell pg-xref__empty">
      <span className="fg-2" aria-hidden="true">—</span>
      <span className="sr-only">{servicesPage.crossEmpty}</span>
    </td>
  );
}
