import type { Project } from "@/lib/site";
import { amount, joinNames, signed, states, trip, tripRun, tripSettle } from "../sample-data";
import { vars } from "../vars";

const [EXPENSES, BALANCES, TRANSFERS] = [0, 1, 2];

/**
 * TripSplit, redrawn: a group's trip with three tabs that follow the simplified states. Every state is
 * rendered; the nearest .work-state[data-state] shows one. Balances and transfers are computed from the
 * sample expenses with lib/settle.ts, never typed.
 */
export function TripSplitScreen({ project }: { project: Project }) {
  const { balances, transfers, total } = tripSettle(trip.expenses);
  const people = trip.people;
  const max = Math.max(1, ...balances.map(b => Math.abs(b)));
  const sum = balances.reduce((s, b) => s + b, 0);
  // Apply the computed transfers back to the balances: the end state the stamp claims.
  const after = balances.slice();
  for (const t of transfers) { after[t.from] += t.amount; after[t.to] -= t.amount; }
  const even = after.every(b => b === 0);

  return (
    <div className="work-scr work-ts">
      <div className="work-ts__head">
        <p className="work-ts__title">{trip.title}</p>
        <p className="work-ts__meta">{trip.counts(people.length, trip.expenses.length)}</p>
        <p className="work-ts__sync">
          <span className="work-ts__sync-mark" data-done={states(TRANSFERS)} />
          <span className="work-swap">
            <span data-on={states(EXPENSES, BALANCES)}>{trip.saved}</span>
            <span data-on={states(TRANSFERS)}>{trip.synced}</span>
          </span>
        </p>
      </div>

      <div className="work-tabs" style={vars({ "--n": project.states.length })}>
        {project.states.map((s, i) => <span key={s.key} className="work-tabs__tab" data-now={states(i)}>{s.label}</span>)}
        <span className="work-tabs__bar" />
      </div>

      <div className="work-swap work-ts__panels">
        <div className="work-ts__panel">
          <p className="work-ts__total" data-on={states(EXPENSES)}>
            <span>{trip.total}</span><span className="work-num">{amount(total)}</span>
          </p>
          {trip.expenses.map((e, i) => (
            <div key={i} className="work-ts__row" data-on={states(EXPENSES)} style={vars({ "--i": i + 1 })}>
              <span className="work-ava">{people[e.payer][0]}</span>
              <span className="work-ts__what">
                <span className="work-ts__label">{e.label}</span>
                <span className="work-ts__sub">{`${people[e.payer]} paid · ${joinNames(e.split.map(p => people[p]), people.length)}`}</span>
              </span>
              <span className="work-num">{amount(e.amount)}</span>
            </div>
          ))}
        </div>

        <div className="work-ts__panel">
          {people.map((name, i) => {
            const b = balances[i];
            return (
              <div key={name} className="work-ts__bal" data-on={states(BALANCES)} data-now={states(BALANCES)} data-sign={b >= 0 ? "pos" : "neg"}
                style={vars({ "--i": i, "--w": (Math.abs(b) / max).toFixed(3) })}>
                <span className="work-ava">{name[0]}</span>
                <span className="work-ts__what">
                  <span className="work-ts__label">{name}</span>
                  <span className="work-ts__sub">{b >= 0 ? trip.getsBack : trip.owes}</span>
                </span>
                <span className="work-num">{signed(b)}</span>
                <span className="work-ts__track"><span className="work-ts__fill" /></span>
              </div>
            );
          })}
          <p className="work-ts__check" data-on={states(BALANCES)} style={vars({ "--i": people.length })}>{trip.sumCheck(sum)}</p>
        </div>

        <div className="work-ts__panel">
          <p className="work-ts__lead" data-on={states(TRANSFERS)}>{trip.transfersLead(transfers.length)}</p>
          {transfers.map((t, i) => (
            <div key={i} className="work-ts__xfer" data-on={states(TRANSFERS)} data-now={states(TRANSFERS)} style={vars({ "--i": i + 1 })}>
              <span className="work-ts__pair">
                <span className="work-ava">{people[t.from][0]}</span>
                <span className="work-ts__line" />
                <span className="work-ava work-ava--solid">{people[t.to][0]}</span>
              </span>
              <span className="work-ts__what">
                <span className="work-ts__label">{`${people[t.from]} ${trip.pays} ${people[t.to]}`}</span>
              </span>
              <span className="work-num">{amount(t.amount)}</span>
            </div>
          ))}
          <div className="work-ts__after" data-on={states(TRANSFERS)} style={vars({ "--i": transfers.length + 1 })}>
            <p className="work-ts__after-head"><span>{trip.after}</span><span>{trip.even(even)}</span></p>
            <div className="work-ts__zero">
              {people.map((name, i) => (
                <span key={name} className="work-ts__zero-cell"><span className="work-ava">{name[0]}</span><span className="work-num">{amount(after[i])}</span></span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <span className="work-ts__fab work-swap" data-on={states(EXPENSES, BALANCES)}>
        <span data-on={states(EXPENSES)}>{trip.addExpense}</span>
        <span data-on={states(BALANCES)}>{tripRun.settle}</span>
      </span>
    </div>
  );
}
