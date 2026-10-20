"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "What is your typical project timeline?",
    a: "Our indicative timelines typically follow three sprint formats: approximately 1–2 weeks for an architecture & prototype sprint, approximately 3–6 weeks for a focused MVP release, and approximately 8–12 weeks or longer for larger product suites. Because every system is different, the final schedule depends on scope, integrations, and feedback cadence, and is confirmed during scoping.",
  },
  {
    q: "How do you handle scope and milestones?",
    a: "We agree on defined sprint deliverables before development begins. You receive regular checkpoint updates with access to live staging environments, so decisions and progress remain completely transparent throughout the engagement.",
  },
  {
    q: "Can you collaborate with our existing team or codebase?",
    a: "Yes. We frequently augment existing product teams, modernize frontend architectures (e.g. migrating to Next.js or React), or build dedicated AI and automation pipelines connected to existing APIs and databases.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "Project-specific ownership and handover are governed by the applicable client agreement. Upon project completion, all custom source code, documentation, and design assets developed for your project are transferred to your team. Third-party libraries, fonts, and platform services remain governed by their respective open-source or vendor licences.",
  },
];

export default function InteractiveFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(idx: number) {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  }

  return (
    <div className="interactive-faq-wrap">
      <div className="faq-heading">
        <span className="eyebrow"><span className="eyebrow-dot" /> FREQUENTLY ASKED QUESTIONS</span>
        <h3>Answers to common questions.</h3>
      </div>

      <div className="faq-list">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <ChevronDown size={18} className="faq-chevron" />
              </button>
              {isOpen && (
                <div className="faq-answer-panel">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
