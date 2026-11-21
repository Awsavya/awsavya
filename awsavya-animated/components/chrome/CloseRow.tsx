import { closeRow } from "@/lib/site";
import { BarLink } from "./Bar";
import { Section } from "./Section";

/**
 * The ask that ends every page except Contact and 404: the page's last display-size line. No violet, no flood:
 * the footer's end mark is the one "done". The email follows straight after, in the footer.
 */
export function CloseRow({ ground }: { ground?: "paper" | "silver" }) {
  return (
    <Section ground={ground ?? "paper"} className="close" labelledBy="close-title">
      <div className="grid7 close__grid">
        <h2 id="close-title" className="t-display close__title">{closeRow.title}</h2>
        <p className="t-body close__body">{closeRow.body}</p>
        <div className="close__actions">
          <BarLink href="/contact">{closeRow.button}</BarLink>
        </div>
      </div>
    </Section>
  );
}
