import type { Project } from "@/lib/site";
import { amount, from, qc, qcActs, qcTotals, states } from "../sample-data";

/**
 * QuicklyCart, redrawn: one order seen from four sides. Each step is written in the column of whoever acts;
 * every column sees the same status; the admin column keeps the state log. A mini abstract L-route (no real
 * map, no real place) moves the rider dot one leg per state. In a narrow window the columns fold into a step
 * list. Totals are computed from the sample items. Renders every state; the nearest .work-state shows one.
 */
export function QuicklyCartScreen({ project, order = 0 }: { project: Project; order?: number }) {
  const id = qc.orders[order % qc.orders.length];
  const n = project.states.length;
  const steps = qc.steps.slice(0, n);
  const { lines, total, count } = qcTotals();
  const status = steps.map((s, i) => <span key={s.key} data-on={states(i)}>{s.status}</span>);

  return (
    <div className="work-scr work-qc">
      <div className="work-qc__top">
        <span className="work-qc__brand">{qc.app}</span>
        <span className="work-qc__order">{qc.orderTitle(id)}</span>
        <span className="work-swap work-qc__status">{status}</span>
      </div>

      <div className="work-qc__body">
        <div className="work-qc__cols">
          {qc.roles.map((r, ri) => {
            const acts = qcActs(ri).filter(i => i < n);
            return (
              <div key={r.key} className="work-qc__col" data-now={states(...acts)}>
                <p className="work-qc__role">{r.label}</p>
                <p className="work-qc__who">{r.who}</p>
                {r.key === "rider" && <p className="work-qc__badge">{qc.verified}</p>}
                <p className="work-qc__sees"><span className="work-qc__sees-k">{qc.sees}</span><span className="work-swap">{status}</span></p>
                {r.key === "admin" ? (
                  <div className="work-qc__log">
                    <p className="work-qc__log-head">{qc.log}</p>
                    {steps.map((s, i) => <p key={s.key} className="work-qc__log-line" data-on={from(i, n)}>{s.phrase}</p>)}
                  </div>
                ) : acts.map(i => (
                  <div key={i} className="work-qc__entry" data-on={from(i, n)} data-now={states(i)}>
                    <span className="work-qc__act">{steps[i].act}</span>
                    <span className="work-qc__key">{steps[i].status}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="work-qc__aside">
          <div className="work-qc__cart">
            <p className="work-qc__cart-head"><span>{qc.itemsCount(count)}</span></p>
            {lines.map(l => (
              <p key={l.name} className="work-qc__line"><span>{`${l.name} × ${l.qty}`}</span><span className="work-num">{amount(l.line)}</span></p>
            ))}
            <p className="work-qc__line work-qc__line--total"><span>{qc.total}</span><span className="work-num">{amount(total)}</span></p>
          </div>
          <div className="work-qc__map">
            <p className="work-qc__map-label">{qc.route.label}</p>
            <div className="work-qc__route">
              <span className="work-qc__leg work-qc__leg--a" />
              <span className="work-qc__leg work-qc__leg--b" />
              <span className="work-qc__store" />
              <span className="work-qc__door" data-done={states(n - 1)} />
              <span className="work-qc__dot" />
              <span className="work-qc__pin work-qc__pin--store">{qc.route.from}</span>
              <span className="work-qc__pin work-qc__pin--door">{qc.route.to}</span>
            </div>
          </div>
        </div>

        <div className="work-qc__steps">
          {steps.map((s, i) => (
            <div key={s.key} className="work-qc__step" data-now={states(i)} data-done={from(i + 1, n)}>
              <span className="work-qc__step-bar" />
              <span className="work-qc__step-status">{s.status}</span>
              <span className="work-qc__step-act">{`${qc.roles[s.actor].label} · ${s.act}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
