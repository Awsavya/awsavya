"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import gsap from "gsap";
import { BarButton } from "@/components/chrome/Bar";
import { FitText } from "@/components/chrome/FitText";
import { D, DRIVE, registerEases } from "@/lib/ease";
import { motionOff, useMotionOff } from "@/lib/motion";
import { contact, site } from "@/lib/site";

type Stage = "draft" | "sending" | "sent" | "failed";
type Field = "name" | "email" | "today";
type Values = { name: string; email: string; service: string; today: string; end: string };

const EMPTY: Values = { name: "", email: "", service: contact.chips[contact.chips.length - 1], today: "", end: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // the same rule the server applies
const FIELDS: readonly Field[] = ["name", "email", "today"];
const MAX = { name: 100, email: 254, today: 3000, end: 1800 } as const; // message stays under the server's 5000

function check(v: Values): Record<Field, string> {
  return {
    name: v.name.trim().length >= 2 ? "" : contact.errors.name,
    email: EMAIL.test(v.email.trim()) && v.email.trim().length <= MAX.email ? "" : contact.errors.email,
    today: v.today.trim().length >= 10 ? "" : contact.errors.today,
  };
}

/** Server field names → the field that shows the error. "message" is built from the "today" box. */
const SERVER_FIELD: Record<string, Field | undefined> = { name: "name", email: "email", message: "today" };

/** Puts a real mailto link wherever the address appears in a message. */
function withMailto(text: string) {
  const parts = text.split(site.email);
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<a key={i} className="inline-link" href={`mailto:${site.email}`}>{site.email}</a>, part]));
}

/** A failure message always ends with a way forward: the email address. */
function withFallback(text: string) {
  if (!text) return `${contact.notSent}. ${contact.fallback}`;
  return text.includes(site.email) ? text : `${text} ${contact.fallback}`;
}

/**
 * The brief ticket. Wired to /api/contact: success shows only after a real HTTP 200, then the section
 * floods Stamp (the site's one earned flood) and the ticket gives way to a SENT poster, the message and
 * "Send another brief". Anything else is "Not sent", with the server's words and the email fallback; the
 * visitor's text is kept. The rail is real: DRAFT fills one tick per valid required field, SENDING ticks
 * only while the request is pending. The bot check sends elapsed time from one clock (performance.now),
 * so a visitor whose device clock is off is never turned away.
 */
export function BriefForm() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const off = useMotionOff();
  const form = useRef<HTMLFormElement>(null);
  const flood = useRef<HTMLDivElement>(null);
  const status = useRef<HTMLParagraphElement>(null);
  const startedAt = useRef(0);
  const request = useRef<AbortController | null>(null);
  const floodAnim = useRef<gsap.core.Timeline | null>(null);
  const flooded = useRef(false);
  const focusName = useRef(false);

  const [values, setValues] = useState<Values>(EMPTY);
  const [stage, setStage] = useState<Stage>("draft");
  const [shown, setShown] = useState<Record<Field, boolean>>({ name: false, email: false, today: false });
  const [serverErr, setServerErr] = useState<Partial<Record<Field, boolean>>>({});
  const [message, setMessage] = useState("");
  const [tick, setTick] = useState(0);

  const errors = check(values);
  const validCount = FIELDS.filter(f => !errors[f]).length;
  const errorFor = (f: Field) => (shown[f] || serverErr[f]) && errors[f] ? errors[f] : serverErr[f] ? contact.errors[f] : "";
  const sending = stage === "sending";

  // The 3-second bot check counts from when the form was ready, not from when the page was built.
  useEffect(() => { startedAt.current = performance.now(); }, []);
  useEffect(() => () => { request.current?.abort(); floodAnim.current?.kill(); }, []);

  // SENDING: hop across four ticks for as long as the request is pending (TRACK, 0.18s hops). Off: no hops.
  useEffect(() => {
    if (!sending || off) return;
    const timer = window.setInterval(() => setTick(t => (t + 1) % 4), D.d2 * 1000);
    return () => { window.clearInterval(timer); setTick(0); };
  }, [sending, off]);

  // Success and failure both move focus to the message, so it is read and seen where the visitor is.
  // "Send another brief" brings the ticket back and puts focus in its first field.
  useEffect(() => {
    if (stage === "sent" || stage === "failed") status.current?.focus({ preventScroll: false });
    else if (stage === "draft" && focusName.current) {
      focusName.current = false;
      form.current?.querySelector<HTMLElement>('[name="name"]')?.focus();
    }
  }, [stage, message]);

  const update = (k: keyof Values, v: string) => {
    setValues(prev => ({ ...prev, [k]: v }));
    if (k in serverErr) setServerErr(prev => ({ ...prev, [k]: false }));
    if (stage === "failed") setStage("draft"); // editing after a failure starts a new draft
  };
  const again = () => {
    startedAt.current = performance.now();
    focusName.current = true;
    setMessage("");
    setStage("draft"); // the section keeps its Stamp ground: the flood is not replayed
  };
  const reveal = (f: Field) => { if (values[f].trim()) setShown(prev => ({ ...prev, [f]: true })); };

  function floodSection() {
    const section = form.current?.closest<HTMLElement>("section[data-ground]");
    const layer = flood.current;
    if (!section || flooded.current) return;
    flooded.current = true;
    const ground = () => {
      section.setAttribute("data-ground", "stamp");
      window.dispatchEvent(new Event("awsavya-ground"));
    };
    // Off: the ground swaps and the global Motion Off rule fades its colours in 0.18s.
    if (motionOff() || !layer) { ground(); return; }
    registerEases();
    const tl = gsap.timeline({ onComplete: () => { floodAnim.current = null; } });
    tl.set(layer, { display: "block", opacity: 1, clipPath: "inset(100% 0% 0% 0%)" })
      // the stamp's bar lands first (0.54s), then the sheet rises over the whole section
      .to(layer, { clipPath: "inset(0% 0% 0% 0%)", duration: D.d3, ease: DRIVE }, D.d3)
      .add(ground)
      .to(layer, { opacity: 0, duration: D.d1, ease: DRIVE })
      .set(layer, { display: "none", clearProps: "clipPath,opacity" });
    floodAnim.current = tl;
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const errs = check(values);
    const bad = FIELDS.filter(f => errs[f]);
    if (bad.length) {
      setShown({ name: true, email: true, today: true });
      form.current?.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }

    const honeypot = (form.current?.elements.namedItem("hp_field") as HTMLInputElement | null)?.value ?? "";
    const today = values.today.trim();
    const end = values.end.trim();
    const body = {
      name: values.name.trim(),
      email: values.email.trim(),
      service: values.service,
      message: end ? `How it works today:\n${today}\n\nWhat has to work at the end:\n${end}` : `How it works today:\n${today}`,
      website_url: honeypot,
      elapsed_ms: Math.round(performance.now() - startedAt.current),
    };

    request.current?.abort();
    const ctrl = new AbortController();
    request.current = ctrl;
    setStage("sending");
    setMessage("");
    setServerErr({});

    let code = 0;
    let text = "";
    let fields: string[] = [];
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body), signal: ctrl.signal,
      });
      code = res.status;
      const data: unknown = await res.json().catch(() => null);
      if (data && typeof data === "object") {
        const d = data as { message?: unknown; fields?: unknown };
        if (typeof d.message === "string") text = d.message;
        if (Array.isArray(d.fields)) fields = d.fields.filter((x): x is string => typeof x === "string");
      }
    } catch {
      if (ctrl.signal.aborted) return; // unmounted
    }
    request.current = null;

    if (code === 200) {
      setValues(EMPTY);
      setShown({ name: false, email: false, today: false });
      startedAt.current = performance.now();
      setMessage(text || contact.sent);
      setStage("sent");
      floodSection();
      return;
    }

    const flagged: Partial<Record<Field, boolean>> = {};
    for (const f of fields) { const k = SERVER_FIELD[f]; if (k) flagged[k] = true; }
    setServerErr(flagged);
    setMessage(withFallback(text));
    setStage("failed");
  }

  const field = (f: Field, label: string, input: (describedBy: string | undefined, invalid: boolean) => React.ReactNode) => {
    const err = errorFor(f);
    return (
      <div className="pg-field">
        <label className="t-label pg-field__label" htmlFor={id(f)}>{label}</label>
        {input(err ? id(`${f}-err`) : undefined, Boolean(err))}
        {err && <p id={id(`${f}-err`)} className="t-small pg-err">{err}</p>}
      </div>
    );
  };

  const sentNow = stage === "sent";
  const failed = stage === "failed";
  const reached = { draft: true, sending: stage !== "draft", end: sentNow || failed };

  return (
    <form ref={form} className="pg-brief" data-stage={stage} method="post" noValidate onSubmit={submit}>
      <div className="pg-brief__pair">
        {field("name", contact.name, (desc, invalid) => (
          <input id={id("name")} name="name" className="pg-input" type="text" autoComplete="name" required maxLength={MAX.name}
            value={values.name} readOnly={sending} aria-invalid={invalid || undefined} aria-describedby={desc}
            onChange={e => update("name", e.target.value)} onBlur={() => reveal("name")} />
        ))}
        {field("email", contact.email, (desc, invalid) => (
          <input id={id("email")} name="email" className="pg-input" type="email" inputMode="email" autoComplete="email" required maxLength={MAX.email}
            spellCheck={false} value={values.email} readOnly={sending} aria-invalid={invalid || undefined} aria-describedby={desc}
            onChange={e => update("email", e.target.value)} onBlur={() => reveal("email")} />
        ))}
      </div>

      <fieldset className="pg-field">
        <legend className="t-label pg-chips__legend">{contact.kind}</legend>
        <div className="pg-chips">
          {contact.chips.map(chip => (
            <label key={chip} className="pg-chip">
              <input className="pg-chip__input" type="radio" name="service" value={chip}
                checked={values.service === chip} onChange={() => update("service", chip)} />
              <span className="pg-chip__face">{chip}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {field("today", contact.today, (desc, invalid) => (
        <textarea id={id("today")} name="today" className="pg-input" required rows={6} maxLength={MAX.today}
          placeholder={contact.todayHint} value={values.today} readOnly={sending}
          aria-invalid={invalid || undefined} aria-describedby={desc}
          onChange={e => update("today", e.target.value)} onBlur={() => reveal("today")} />
      ))}

      <div className="pg-field">
        <label className="t-label pg-field__label" htmlFor={id("end")}>
          {contact.end} <span className="t-small fg-2 pg-field__hint">{contact.endHint}</span>
        </label>
        <textarea id={id("end")} name="end" className="pg-input" rows={4} maxLength={MAX.end}
          value={values.end} readOnly={sending} onChange={e => update("end", e.target.value)} />
      </div>

      {/* Honeypot: people never see or reach it, and its name and label give autofill nothing to match.
          Anything typed here is rejected by the server (sent as website_url). */}
      <div className="pg-hp" aria-hidden="true">
        <label>Leave this empty <input name="hp_field" type="text" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
      </div>

      <div className="pg-brief__actions">
        <div className="pg-rail" aria-hidden="true">
          <div className="pg-rail__seg" data-on="">
            <span className="t-label pg-rail__name">{contact.rail[0]}</span>
            <span className="pg-rail__ticks">
              {FIELDS.map((f, i) => <span key={f} className="pg-tick" data-on={i < (reached.sending ? 3 : validCount) ? "" : undefined} />)}
            </span>
          </div>
          <div className="pg-rail__seg pg-rail__seg--send" data-on={reached.sending ? "" : undefined}>
            <span className="t-label pg-rail__name">{contact.rail[1]}</span>
            <span className="pg-rail__ticks">
              {[0, 1, 2, 3].map(i => <span key={i} className="pg-tick" data-on={reached.end ? "" : undefined} />)}
              {sending && (
                <span className="pg-rail__cursor" data-snap={tick === 0 ? "" : undefined} style={{ "--pg-i": tick } as CSSProperties} />
              )}
            </span>
          </div>
          <div className="pg-rail__seg pg-rail__seg--end" data-on={reached.end ? "" : undefined} data-failed={failed ? "" : undefined}>
            <span className="t-label pg-rail__name">{failed ? contact.notSent : contact.rail[2]}</span>
            <span className="pg-rail__ticks"><span className="pg-tick" /></span>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{sending ? `${contact.sending}` : ""}</p>

        <BarButton type="submit" className="pg-brief__submit" label={sending ? contact.sending : contact.submit} aria-disabled={sending || undefined} />

        {sentNow && (
          <div className="pg-brief__sent" aria-hidden="true"><FitText as="span" lines={contact.sentWord} size="xl" /></div>
        )}
        <p ref={status} role="status" tabIndex={-1} className={sentNow ? "t-statement t-statement--strong pg-brief__status" : "t-body pg-brief__status"}
          data-tone={failed ? "failed" : undefined}>
          {message ? withMailto(message) : null}
        </p>
        {sentNow && <BarButton tone="line" className="pg-brief__again" label={contact.again} onClick={again} />}
      </div>

      <div ref={flood} className="pg-flood" aria-hidden="true" />
    </form>
  );
}
