"use client";

import { useEffect, useState, useId } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, CheckCircle2, LoaderCircle, Sparkles } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

type FormState = typeof initialForm;

const serviceOptions = [
  "App development",
  "Web development",
  "Custom software",
  "AI solution",
  "Automation",
  "Not sure yet",
];

const budgetOptions = [
  "Flexible / Let's discuss",
  "Focused sprint / MVP",
  "Milestone-based",
  "Advisory & guidance first",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [activeStep, setActiveStep] = useState<1 | 2>(1);

  const errorSummaryId = useId();

  // Read URL query params on mount for pre-filling service
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        const matched = serviceOptions.find(
          (s) => s.toLowerCase().includes(serviceParam.toLowerCase()) || serviceParam.toLowerCase().includes(s.toLowerCase().slice(0, 3))
        );
        if (matched) {
          setForm((f) => ({ ...f, service: matched }));
        }
      }
      const noteParam = params.get("note");
      if (noteParam) {
        setForm((f) => ({ ...f, message: `[Scope note: ${noteParam}]\n\n` }));
      }
    }
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "We couldn't send your message. Please try again.");
      }
      setStatus("success");
      setFeedback(payload.message || "Thanks — your enquiry has been sent.");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-heading">
        <span className="eyebrow"><span className="eyebrow-dot" /> PROJECT ENQUIRY</span>
        <h2>Tell us a little<br /><span>about your idea.</span></h2>
        <p>Choose your focus area and share a few details to get the conversation started.</p>
      </div>

      {/* Interactive Service Selector Pills */}
      <div className="form-field form-field-full">
        <label className="field-label-interactive">
          <span>What do you need help with? <b>*</b></span>
          <small>{form.service ? "Selected" : "Tap an option"}</small>
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

        {/* Budget Pill Selector */}
        <label className="form-field">
          <span>Budget range <small>OPTIONAL</small></span>
          <select
            name="budget"
            value={form.budget}
            onChange={(event) => updateField("budget", event.target.value)}
          >
            <option value="">Choose a range</option>
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
            placeholder="What problem are you looking to solve? What is the desired timeline or outcome?"
          />
        </label>
      </div>

      <div className="form-submit-row">
        <p>
          By submitting, you agree that AWSAVYA may contact you regarding this enquiry. See our{" "}
          <Link href="/privacy" className="form-privacy-link">Privacy Policy</Link>.
        </p>
        <button type="submit" className="button button-dark" disabled={status === "sending"}>
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
          id={errorSummaryId}
          className={`form-feedback ${status === "success" ? "is-success" : "is-error"}`}
          role="status"
          aria-live="polite"
        >
          {status === "success" && <CheckCircle2 size={18} />}
          <span>{feedback}</span>
        </div>
      )}
    </form>
  );
}
