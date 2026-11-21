import type { Project } from "@/lib/site";
import { below, from, har, states } from "../sample-data";

/**
 * Har Apparels, redrawn: one batch on a shop-floor phone. High contrast, large rows and one large action,
 * after the owner's "glove-friendly" note. Each simplified state belongs to the role that logs it.
 * Renders every state; the nearest .work-state[data-state] shows one. `batch` picks the sample batch.
 */
export function HarApparelsScreen({ project, batch = 0 }: { project: Project; batch?: number }) {
  const b = har.batches[batch % har.batches.length];
  const n = project.states.length;
  const stages = har.stages.slice(0, n);

  return (
    <div className="work-scr work-har">
      <div className="work-har__head">
        <span className="work-har__key">{har.role}</span>
        <span className="work-swap work-har__role">
          {stages.map((s, i) => <span key={s.key} data-on={states(i)}>{s.role}</span>)}
        </span>
      </div>

      <div className="work-har__batch">
        <p className="work-har__id">{har.batchTitle(b.id)}</p>
        <p className="work-har__roll">{har.rollLine(b.roll, b.yd)}</p>
      </div>

      <div className="work-har__stages">
        {stages.map((s, i) => (
          <div key={s.key} className="work-har__stage" data-now={states(i)} data-done={from(i + 1, n)}>
            <span className="work-har__bar" />
            <span className="work-har__name">{s.label}</span>
            <span className="work-har__who">{s.role}</span>
            <span className="work-swap work-har__flag">
              <span data-on={from(i + 1, n)}>{har.flags.done}</span>
              <span data-on={states(i)}>{har.flags.now}</span>
              <span data-on={below(i)}>{har.flags.next}</span>
            </span>
          </div>
        ))}
      </div>

      <span className="work-swap work-har__act">
        {stages.map((s, i) => <span key={s.key} data-on={states(i)}>{s.act}</span>)}
      </span>
    </div>
  );
}
