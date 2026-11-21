import type { Project } from "@/lib/site";
import { b2b, b2bReview, states } from "../sample-data";
import { vars } from "../vars";

/**
 * Build2Buzz, redrawn: the review desk. Three panes keep what the repo documents, what the demo showed and
 * what the AI wrote apart; each draft sentence carries its source chip. In a narrow window the panes become
 * tabs. The review footer's counts are computed from the sample draft (b2bReview), never typed.
 * Renders every state; the nearest .work-state[data-state] shows one.
 */
export function Build2BuzzScreen({ project }: { project: Project }) {
  const n = project.states.length;
  const all = new Set([...b2b.facts, ...b2b.observed].map(s => s.id));
  const review = b2bReview(all);
  const ratio = Math.min(1, review.chars / b2b.limit);

  return (
    <div className="work-scr work-b2b">
      <div className="work-b2b__top">
        <span className="work-b2b__brand">{b2b.app}</span>
        <span className="work-ref work-b2b__repo">{b2b.repo}</span>
        <span className="work-b2b__task">{b2b.task}</span>
        <span className="work-swap work-b2b__step">
          {project.states.map((s, i) => <span key={s.key} data-on={states(i)}>{b2b.step(i + 1, n, s.label)}</span>)}
        </span>
      </div>

      <div className="work-tabs work-b2b__tabs" style={vars({ "--n": 3 })}>
        <span className="work-tabs__tab" data-now={states(0)}>{b2b.tabs.repo}</span>
        <span className="work-tabs__tab" data-now={states(1)}>{b2b.tabs.demo}</span>
        <span className="work-tabs__tab" data-now={states(2, 3)}>{b2b.tabs.draft}</span>
        <span className="work-tabs__bar" />
      </div>

      <div className="work-b2b__panes">
        <div className="work-b2b__pane" data-now={states(0)}>
          <p className="work-b2b__head"><span>{b2b.panes.repo}</span><span className="work-num">{b2b.facts.length}</span></p>
          {b2b.facts.map(f => (
            <div key={f.id} className="work-b2b__item">
              <span className="work-b2b__text">{f.text}</span>
              <span className="work-ref">{`${f.id} · ${f.ref}`}</span>
            </div>
          ))}
        </div>

        <div className="work-b2b__pane" data-now={states(1)}>
          <p className="work-b2b__head">
            <span>{b2b.panes.demo}</span>
            <span className="work-num" data-on={states(1, 2, 3)}>{b2b.observed.length}</span>
          </p>
          <div className="work-swap work-b2b__swap">
            <p className="work-b2b__empty" data-on={states(0)}>{b2b.notRun}</p>
            <div className="work-b2b__shot" data-on={states(1, 2, 3)}>
              <p className="work-b2b__shot-bar">{b2b.browser}</p>
              {b2b.observed.map((o, i) => (
                <div key={o.id} className="work-b2b__item" data-on={states(1, 2, 3)} style={vars({ "--i": i + 1 })}>
                  <span className="work-b2b__text">{o.text}</span>
                  <span className="work-ref">{`${o.id} · ${o.ref}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="work-b2b__pane" data-now={states(2, 3)}>
          <p className="work-b2b__head">
            <span>{b2b.panes.draft}</span>
            <span className="work-num" data-on={states(2, 3)}>{b2b.draft.length}</span>
          </p>
          <div className="work-swap work-b2b__swap">
            <p className="work-b2b__empty" data-on={states(0, 1)}>{b2b.noDraft}</p>
            <div className="work-b2b__sents">
              {b2b.draft.map((s, i) => (
                <div key={s.id} className="work-b2b__sent" data-on={states(2, 3)} data-done={s.source ? undefined : states(3)} style={vars({ "--i": i })}>
                  <span className="work-b2b__text">{s.text}</span>
                  <span className={s.source ? "work-ref" : "work-ref work-ref--none"}>{s.source ?? b2b.noSource}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="work-b2b__foot" data-on={states(3)} data-now={states(3)}>
        <span className="work-b2b__count">{review.line}</span>
        <span className="work-b2b__count work-b2b__count--short">{b2b.reviewShort(review.kept.length, b2b.draft.length, review.chars, b2b.limit)}</span>
        <span className="work-b2b__meter" style={vars({ "--r": ratio.toFixed(3) })}><span /></span>
        <span className="work-b2b__approve">{b2b.approve}</span>
      </div>
    </div>
  );
}
