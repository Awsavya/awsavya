"use client";

import { useEffect, useState, useId } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, CheckCircle2, AlertCircle, LoaderCircle, Sparkles } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  botcheck: "", // Honeypot field for bot detection
};

type FormState = typeof initialForm;

const serviceOptions = [
  "App development",
  "Web development",
  "Custom software",
  "Applied AI",
  "Automation",
  "Not sure yet",
];

const budgetOptions = [
  "Flexible / Let's discuss",
  "Architecture Sprint (1–2 weeks)",
  "Focused MVP (3–6 weeks)",
  "Larger Product (8–12+ weeks)",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [attachedScope, setAttachedScope] = useState<string | null>(null);
  const feedbackId = useId();

  // Read URL query params on mount for pre-filling service or attached blueprint note
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        const matched = serviceOptions.find(
          (s) =>
            s.toLowerCase().includes(serviceParam.toLowerCase()) ||
            serviceParam.toLowerCase().includes(s.toLowerCase().slice(0, 3))
        );
        if (matched) {
          setForm((f) => ({ ...f, service: matched }));
        }
      }
      const noteParam = params.get("note");
      if (noteParam) {
        setAttachedScope(noteParam);
        setForm((f) => ({
          ...f,
          message: f.message ? f.message : `[Scope note: ${noteParam}]\n\n`,
        }));
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle" && status !== "sending") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const payload = {
        access_key: "ee49443e-3566-4722-948f-7a54f4113e55",
        subject: `AWSAVYA website enquiry — ${form.name} (${form.service})`,
        from_name: "AWSAVYA Website",
        replyto: form.email,
        name: form.name,
        email: form.email,
        company: form.company || "Not provided",
        service: form.service,
        budget: form.budget || "Not provided",
        message: form.message,
        botcheck: form.botcheck, // Web3Forms honours this field as a honeypot
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "We were unable to deliver your enquiry right now. Please try again or reach out at hello@awsavya.in."
        );
      }

      setStatus("success");
      setFeedback(
        "Thank you for reaching out. Your enquiry has been received and we will get back to you shortly."
      );
      setForm(initialForm);
      setAttachedScope(null);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your message. Please try again or email hello@awsavya.in."
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      {/* Invisible honeypot field to trap spambots */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
        value={form.botcheck}
        onChange={(e) => updateField("botcheck", e.target.value)}
      />

      <div className="form-heading">
        <span className="eyebrow"><span className="eyebrow-dot" /> PROJECT ENQUIRY</span>
        <h2>Tell us a little<br /><span>about your idea.</span></h2>
        <p>Choose your focus area and share a few details to get the conversation started.</p>
        {attachedScope && (
          <div className="attached-scope-banner">
            <span>
              <Sparkles size={13} className="text-blue" /> Configured scope attached: <strong>{attachedScope}</strong>
            </span>
            <button
              type="button"
              onClick={() => setAttachedScope(null)}
              aria-label="Dismiss scope banner"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Interactive Service Selector Pills */}
      <div className="form-field form-field-full">
        <label className="field-label-interactive">
          <span>What do you need help with? <b>*</b></span>
          <small>{form.service ? "Selected" : "Select an option"}</small>
        </label>
        <div className="service-pills-grid" role="radiogroup" aria-label="Service required">
          {serviceOptions.map((srv) => {
            const isSelected = form.service === srv;
            return (
              <button
                key={srv}
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`service-choice-pill ${isSelected ? "is-selected" : ""}`}
                onClick={() => updateField("service", srv)}
              >
                <span className="pill-check">{isSelected ? <Check size={12} /> : null}</span>
                <span>{srv}</span>
              </button>
            );
          })}
        </div>
        {/* Hidden select for standard form semantics / validation */}
        <select
          name="service"
          required
          value={form.service}
          onChange={(e) => updateField("service", e.target.value)}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
        >
          <option value="">Choose a service</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="form-grid">
        <label className="form-field">
          <span>Your name <b>*</b></span>
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Jane Smith"
          />
        </label>
        <label className="form-field">
          <span>Work email <b>*</b></span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="jane@company.com"
          />
        </label>
        <label className="form-field">
          <span>Company / Project <small>OPTIONAL</small></span>
          <input
            name="company"
            autoComplete="organization"
            maxLength={140}
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            placeholder="Your team or brand"
          />
        </label>

        {/* Budget / Timeline Option */}
        <label className="form-field">
          <span>Indicative format <small>OPTIONAL</small></span>
          <select
            name="budget"
            value={form.budget}
            onChange={(event) => updateField("budget", event.target.value)}
          >
            <option value="">Choose an indicative format</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </label>

        <label className="form-field form-field-full">
          <div className="textarea-header">
            <span>Tell us about the project <b>*</b></span>
            <small className="char-counter">{form.message.length} / 5000</small>
          </div>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="What challenge are you looking to solve? What is your target timeline or desired outcome?"
          />
        </label>
      </div>

      <div className="form-submit-row">
        <p>
          By submitting, you agree that AWSAVYA may contact you regarding this enquiry. See our{" "}
          <Link href="/privacy" className="form-privacy-link">
            Privacy Policy
          </Link>.
        </p>
        <button
          type="submit"
          className="button button-dark"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? (
            <>
              Sending <LoaderCircle className="spin-icon" size={16} />
            </>
          ) : (
            <>
              Send enquiry <ArrowUpRight size={16} />
            </>
          )}
        </button>
      </div>

      {feedback && (
        <div
          id={feedbackId}
          className={`form-feedback ${status === "success" ? "is-success" : "is-error"}`}
          role="status"
          aria-live="polite"
        >
          {status === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{feedback}</span>
        </div>
      )}
    </form>
  );
}
