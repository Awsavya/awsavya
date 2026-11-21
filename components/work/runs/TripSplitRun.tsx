"use client";

import { useId, useState } from "react";
import { BarButton } from "@/components/chrome/Bar";
import { SampleTag } from "@/components/chrome/SampleTag";
import type { Expense } from "@/lib/settle";
import { amount, joinNames, signed, trip, tripRun, tripSettle } from "../sample-data";
import { vars } from "../vars";
import { useLive } from "./useLive";

type Row = Expense & { added?: boolean };
const PEOPLE = trip.people;
const EVERYONE = PEOPLE.map((_, i) => i);

/**
 * TripSplit Sample Run: add an expense, then settle up. Balances and transfers are computed live with
 * lib/settle.ts. Native radios, checkboxes and buttons; results in a polite live region and real tables.
 */
export function TripSplitRun() {
  const uid = useId();
  const [rows, setRows] = useState<readonly Row[]>(trip.expenses);
  const [payer, setPayer] = useState(1);
  const [amt, setAmt] = useState<number>(tripRun.amounts[1]);
  const [split, setSplit] = useState<readonly number[]>(EVERYONE);
  const [settled, setSettled] = useState(false);
  const [live, say] = useLive(trip.counts(PEOPLE.length, trip.expenses.length));

  const { balances, transfers, total } = tripSettle(rows);
  const max = Math.max(1, ...balances.map(b => Math.abs(b)));
  const full = rows.length >= tripRun.max;
  const forText = (s: readonly number[]) => joinNames(s.map(p => PEOPLE[p]), PEOPLE.length);

  const add = () => {
    if (full) { say(tripRun.limit(tripRun.max)); return; }
    if (!split.length) { say(tripRun.pickOne); return; }
    const next = [...rows, { payer, label: tripRun.addedLabel, amount: amt, split: [...split].sort((a, b) => a - b), added: true }];
    setRows(next);
    setSettled(false);
    say(tripRun.added(PEOPLE[payer], amt, forText(split), next.length));
  };
  const settle = () => { setSettled(true); say(tripRun.settled(rows.length, transfers.length)); };
  const reset = () => { setRows(trip.expenses); setSplit(EVERYONE); setSettled(false); say(tripRun.resetDone(trip.expenses.length)); };
  const toggle = (p: number) => setSplit(s => (s.includes(p) ? s.filter(x => x !== p) : [...s, p]));

  return (
    <div className="grid7 work-run">
      <form className="work-run__controls" aria-labelledby={`${uid}-legend`} onSubmit={e => { e.preventDefault(); add(); }}>
        <p id={`${uid}-legend`} className="t-label work-run__legend">{tripRun.legend}</p>

        <fieldset className="work-field">
          <legend className="t-label fg-2 work-field__legend">{tripRun.paidBy}</legend>
          <div className="work-chips">
            {PEOPLE.map((p, i) => (
              <label key={p} className="work-chip">
                <input className="work-chip__input" type="radio" name={`${uid}-payer`} value={i} checked={payer === i} onChange={() => setPayer(i)} />
                <span className="work-chip__face">{p}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="work-field">
          <legend className="t-label fg-2 work-field__legend">{tripRun.amount}</legend>
          <div className="work-chips">
            {tripRun.amounts.map(a => (
              <label key={a} className="work-chip">
                <input className="work-chip__input" type="radio" name={`${uid}-amount`} value={a} checked={amt === a} onChange={() => setAmt(a)} />
                <span className="work-chip__face work-num">{amount(a)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="work-field" aria-describedby={split.length ? undefined : `${uid}-pick`}>
          <legend className="t-label fg-2 work-field__legend">{tripRun.forWho}</legend>
          <div className="work-chips">
            {PEOPLE.map((p, i) => (
              <label key={p} className="work-chip">
                <input className="work-chip__input" type="checkbox" checked={split.includes(i)} onChange={() => toggle(i)} />
                <span className="work-chip__face"><span className="work-chip__box" aria-hidden="true" />{p}</span>
              </label>
            ))}
          </div>
          {!split.length && <p id={`${uid}-pick`} className="t-small work-field__error">{tripRun.pickOne}</p>}
        </fieldset>

        <div className="work-run__actions">
          <BarButton type="submit" label={tripRun.add} tone="line" aria-disabled={full || !split.length || undefined} />
          <BarButton label={tripRun.settle} onClick={settle} />
          <BarButton label={tripRun.reset} tone="line" onClick={reset} />
        </div>
      </form>

      <div className="work-run__out">
        <p className="t-body work-run__live" aria-live="polite">{live}</p>
        <div className="work-run__panel">
          <div className="work-run__bar"><h3 className="t-label">{trip.title}</h3><SampleTag /></div>
          <table className="work-table">
            <caption className="sr-only">{tripRun.listTitle}</caption>
            <thead>
              <tr>
                <th scope="col">{tripRun.columns.what}</th>
                <th scope="col">{tripRun.columns.paid}</th>
                <th scope="col">{tripRun.columns.forWho}</th>
                <th scope="col" className="work-table__num">{tripRun.columns.amount}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e, i) => (
                <tr key={i} className="work-table__row" data-new={e.added ? "" : undefined}>
                  <td>{e.label}</td>
                  <td>{PEOPLE[e.payer]}</td>
                  <td>{forText(e.split)}</td>
                  <td className="work-table__num work-num">{amount(e.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colSpan={3}>{trip.total}</th>
                <td className="work-table__num work-num">{amount(total)}</td>
              </tr>
            </tfoot>
          </table>

          {settled ? (
            <div className="work-run__result">
              <div className="work-run__block">
                <h3 className="t-label fg-2">{tripRun.balancesTitle}</h3>
                <ul className="work-bals">
                  {PEOPLE.map((p, i) => {
                    const b = balances[i];
                    return (
                      <li key={p} className="work-bals__row" data-sign={b >= 0 ? "pos" : "neg"} style={vars({ "--i": i, "--w": (Math.abs(b) / max).toFixed(3) })}>
                        <span>{p}</span>
                        <span className="work-bals__word fg-2">{b >= 0 ? trip.getsBack : trip.owes}</span>
                        <span className="work-num work-table__num">{signed(b)}</span>
                        <span className="work-bals__track" aria-hidden="true"><span className="work-bals__fill" /></span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="work-run__block">
                <h3 className="t-label fg-2">{tripRun.transfersTitle}</h3>
                <ol className="work-xfers">
                  {transfers.map((t, i) => (
                    <li key={i} className="work-xfers__row" style={vars({ "--i": i + PEOPLE.length })}>
                      <span>{`${PEOPLE[t.from]} ${trip.pays} ${PEOPLE[t.to]}`}</span>
                      <span className="work-num">{amount(t.amount)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <p className="t-small fg-2 work-run__pending">{tripRun.notSettled}</p>
          )}
        </div>
      </div>
    </div>
  );
}
