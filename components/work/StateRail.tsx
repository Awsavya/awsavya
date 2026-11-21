import type { Project } from "@/lib/site";
import { from, states, ui } from "./sample-data";
import { vars } from "./vars";

/**
 * The state rail: a static <ol> of the product's simplified states. The current item carries
 * aria-current="step" (moved by the poster's playhead, never announced) and a bar that hops to it
 * (TRACK, 0.18s SETTLE). Done items fall back to --fg-2 with a solid mark. Below 640px it is a strip.
 */
export function StateRail({ project, id, current }: { project: Project; id: string; current: number }) {
  const n = project.states.length;
  const head = `${id}-rail`;
  return (
    <div className="work-rail" style={vars({ "--n": n })}>
      <p className="t-label work-rail__head" id={head}>{ui.rail}</p>
      <div className="work-rail__track">
        <ol className="work-rail__list t-data" aria-labelledby={head}>
          {project.states.map((s, i) => (
            <li key={s.key} className="work-rail__item" data-rail-i={i} data-now={states(i)} data-done={from(i + 1, n)}
              aria-current={i === current ? "step" : undefined}>
              <span className="work-rail__mark" aria-hidden="true" />
              <span className="work-rail__label">{s.label}</span>
            </li>
          ))}
        </ol>
        <span className="work-rail__bar" aria-hidden="true" />
      </div>
    </div>
  );
}
