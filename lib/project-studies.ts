interface ProjectStudy {
  architecturePattern: string;
  interfaceParadigm: string;
  problemHypothesis: string;
  architecturalDecisions: string[];
  techStack: string[];
  takeaway: string;
}
export const projectStudies: Record<string, ProjectStudy> = {
  tripsplit: {
    architecturePattern: "Offline-first Room caching and graph-based debt minimization",
    interfaceParadigm: "Ergonomic Android Jetpack Compose with zero-friction App Links",
    problemHypothesis: "Most group expense apps force participants through tedious account registration and break without cellular coverage. TripSplit explores frictionless deep-link claiming, offline Room SQLite persistence, and bidirectional Firestore sync.",
    architecturalDecisions: ["Dynamic Android App Links for joining without mandatory credentials", "First-claim invite protection in Firestore", "Graph-based settlement to reduce group debts to fewer transfers", "Local Room cache for offline creation, calculation and balance viewing"],
    techStack: ["Kotlin 2.0", "Jetpack Compose (M3)", "Room Database (SQLite)", "Firebase Firestore", "Coroutines"],
    takeaway: "The study explores reducing signup friction and supporting offline use in a consumer utility app.",
  },
  build2buzz: {
    architecturePattern: "Evidence-isolated LLM ingestion and headless browser telemetry",
    interfaceParadigm: "Human-reviewed publishing with evidence attribution",
    problemHypothesis: "Commercial AI marketing agents produce confident hallucinations because they rely purely on prompt assumptions. Build2Buzz isolates README documentation from live headless browser observations before synthesizing verified release announcements.",
    architecturalDecisions: ["SSRF-protected Playwright inspection of demonstration environments", "Separate documented facts, observed behavior and generated claims", "Human review with character limits and evidence references", "LinkedIn REST API integration with OAuth 2.0 token management"],
    techStack: ["Python 3.12", "Playwright / Chromium", "Anthropic / OpenAI API", "LinkedIn REST API", "PySide / Qt UI"],
    takeaway: "The study explores grounding AI-generated release communications in verifiable evidence.",
  },
  "har-apparels": {
    architecturePattern: "Role-separated industrial ERP and shop-floor batch state machine",
    interfaceParadigm: "High-contrast, glove-friendly mobile UI for factory-floor workers",
    problemHypothesis: "Apparel and denim manufacturing facilities lose productivity through handwritten fabric consumption sheets, lost material requisitions, and disjointed shift handoffs. Har Apparels digitizes the entire floor lifecycle from raw denim roll to finished garment.",
    architecturalDecisions: ["Role-based access for supervisors, cutting masters and floor workers", "Denim roll consumption ledger with yardage tracking", "Batch states from cutting through sewing to final QC", "Shift-end reconciliation reporting"],
    techStack: ["Kotlin", "Android SDK", "Material Design", "Room / Local Storage", "RESTful Backend"],
    takeaway: "The study explores factory-floor software with large touch targets, few taps and clear status feedback.",
  },
  quicklycart: {
    architecturePattern: "Four-role state machine and coordinated marketplace dispatch",
    interfaceParadigm: "Responsive multi-portal commerce for shoppers, merchants and riders",
    problemHypothesis: "Local multi-vendor commerce struggles with brittle order states when merchants, customers, and delivery riders operate on separate channels. QuicklyCart unifies product catalogs, checkout, vendor fulfillment, and rider dispatch into an idempotent state machine.",
    architecturalDecisions: ["Role-based authorization for customers, sellers, riders and admins", "Idempotent order transitions", "Merchant stock availability and vendor balance ledgers", "Rider verification, route assignment and delivery confirmation"],
    techStack: ["Django / Python", "PostgreSQL", "Tailored CSS & JavaScript", "REST API", "Bootstrap 5"],
    takeaway: "The study explores predictable order state and operational handoffs across marketplace roles.",
  },
} as const;
