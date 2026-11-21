import { Fragment, type CSSProperties, type ReactNode } from "react";
import { fitK, type FitLine } from "@/lib/fit";
import type { ProjectSlug } from "@/lib/site";
import { LateTitleMorph } from "./LateTitleMorph";
import { TitleMorph } from "./TitleMorph";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

/**
 * Poster type fitted from measured advances (lib/fit.ts): one --k per poster, pure CSS, exact at every width.
 * Real text stays in the DOM (CSS uppercases it). With perChar, the visual lines are aria-hidden character
 * spans and an sr-only copy carries the text. `morph` wraps a single-line project name in TitleMorph
 * (`morphAfterMount`: only once the page has mounted, for titles that are off-screen on arrival).
 * `charStyle` (optional) lets a unit seed per-character inline styles at SSR, e.g. a jostle.
 */
export function FitText({ lines, size, as: As = "div", morph, morphAfterMount, id, className, tabIndex, perChar, charStyle }: {
  lines: string | readonly (string | FitLine)[]; size: "xl" | "l" | "m"; as?: Tag;
  morph?: ProjectSlug; morphAfterMount?: boolean; id?: string; className?: string; tabIndex?: number; perChar?: boolean;
  charStyle?: (char: string, index: number, line: number) => CSSProperties | undefined;
}) {
  const list: FitLine[] = (typeof lines === "string" ? [lines] : lines).map(l => (typeof l === "string" ? { text: l } : l));
  const k = fitK(list);
  const text = list.map(l => l.text).join(" ");
  let ci = 0;

  return (
    <As id={id} tabIndex={tabIndex} className={className ? `fit fit--${size} ${className}` : `fit fit--${size}`} style={{ "--k": k.toFixed(4) } as CSSProperties}>
      {perChar && <span className="sr-only">{text}</span>}
      {list.map((line, li) => {
        let content: ReactNode = line.text;
        if (perChar) {
          content = Array.from(line.text).map((ch, i) => {
            if (ch === " ") return " ";
            const n = ci++;
            return <span key={i} className="fit__char" style={{ "--ci": n, ...charStyle?.(ch, n, li) } as CSSProperties}>{ch}</span>;
          });
        }
        const inner = <span className="fit__text">{content}</span>;
        return (
          <Fragment key={li}>
            {li > 0 && " "}
            <span className="fit__line" data-indent={line.indent ?? "a1"} aria-hidden={perChar || undefined}>
              {morph && list.length === 1
                ? morphAfterMount ? <LateTitleMorph slug={morph}>{inner}</LateTitleMorph> : <TitleMorph slug={morph}>{inner}</TitleMorph>
                : inner}
            </span>
          </Fragment>
        );
      })}
    </As>
  );
}
