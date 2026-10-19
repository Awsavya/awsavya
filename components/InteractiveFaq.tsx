"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "What is your typical project timeline?",
    a: "Most focused MVP releases or core feature builds take between 3 to 6 weeks. Larger product overhauls or multi-system software suites typically run 8 to 12 weeks. We set clear week-by-week milestones so you always know what is coming next.",
  },
  {
    q: "How do you handle scope and milestones?",
    a: "We agree on fixed, unambiguous deliverables for each milestone before beginning. You get access to live staging environments and weekly progress checkpoints, eliminating surprise handoffs or scope creep.",
  },
  {
    q: "Can you collaborate with our existing team or codebase?",
    a: "Yes. We frequently augment existing engineering teams, modernize legacy frontends (e.g. migrating to Next.js or React 19), or add dedicated AI and automation pipelines to established databases and APIs.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You do. Upon project completion, all source code, design files, architectural documentation, and production assets are 100% yours with zero vendor lock-in.",
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
