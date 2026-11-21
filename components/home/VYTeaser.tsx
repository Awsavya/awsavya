import { DeliverLink } from "@/components/chrome/DeliverLink";
import { Section } from "@/components/chrome/Section";
import { home, site } from "@/lib/site";

/** Home §7. A static mini mark with V and Y lit and the other five letters dimmed (decorative), then the point of it. */
export default function VYTeaser() {
  return (
    <Section ground="silver" labelledBy="home-vy-title" className="home-vy">
      <div className="grid7 home-vy__grid">
        <p className="t-display home-vy__mark" aria-hidden="true">
          {Array.from(site.name).map((ch, i) => (
            <span key={i} className={ch === "V" || ch === "Y" ? undefined : "home-vy__dim"}>{ch}</span>
          ))}
        </p>
        <h2 id="home-vy-title" className="t-statement home-vy__title">{home.vyStatement}</h2>
        <p className="t-body home-vy__body">{home.vyBody}</p>
        <p className="home-vy__link">
          <DeliverLink href="/about" className="bar-link t-label">{home.vyLink}</DeliverLink>
        </p>
      </div>
    </Section>
  );
}
