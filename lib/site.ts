export const siteConfig = {
  name: "AWSAVYA",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.awsavya.in",
  canonicalUrl: "https://www.awsavya.in",
  description:
    "AWSAVYA is a digital product studio engineering custom software, cross-platform mobile apps, modern web platforms, applied AI solutions, and automated business workflows.",
  identityStatement:
    "AWSAVYA is a digital product studio building mobile apps, web experiences, custom software, applied AI, and automation.",
  email: "hello@awsavya.in",
  releaseDate: "2026-10-31",
  keywords: [
    "AWSAVYA",
    "awsavya.in",
    "custom software development",
    "mobile app development agency",
    "React Native app developers",
    "Android Jetpack Compose",
    "Next.js web development company",
    "applied AI engineering",
    "AI workflow automation",
    "enterprise ERP software",
    "digital product studio",
    "full stack software engineering",
    "offline-first mobile apps",
    "API integration services",
  ],
};

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const services = [
  {
    number: "01",
    title: "App development",
    short: "Cross-platform mobile apps and installable PWAs built for real use.",
    description:
      "Cross-platform mobile apps built with React Native, and installable progressive web apps when a PWA is the right fit. Shaped around the people who rely on them.",
    tags: ["React Native", "iOS & Android planning", "Progressive Web Apps", "Touch ergonomics"],
    icon: "app" as const,
  },
  {
    number: "02",
    title: "Web experiences",
    short: "Thoughtful websites built to communicate clearly and turn interest into action.",
    description:
      "Fast, thoughtfully designed websites and web platforms that combine clear editorial messaging, accessible typography, and reliable Next.js architecture.",
    tags: ["Company websites", "Web platforms", "Accessible design", "Performance optimization"],
    icon: "web" as const,
  },
  {
    number: "03",
    title: "Custom software",
    short: "Systems shaped around how your business actually works.",
    description:
      "Replace disconnected spreadsheets and manual bottlenecks with custom web software, portals, and dashboards shaped around your team's real operational workflows.",
    tags: ["Operations dashboards", "Client portals", "Internal tools", "API integrations"],
    icon: "software" as const,
  },
  {
    number: "04",
    title: "Applied AI",
    short: "Practical AI features with a clear job to do.",
    description:
      "Bring practical AI into everyday workflows with source-grounded domain assistants, semantic document search, and evaluated prototype pipelines.",
    tags: ["Domain assistants", "Knowledge search", "Document workflows", "Prototype evaluation"],
    icon: "ai" as const,
  },
  {
    number: "05",
    title: "Automation",
    short: "Less repetitive work. More room for the work that matters.",
    description:
      "Connect the tools your team already uses and automate event-driven handoffs, notifications, and repeatable business processes with resilient error queues.",
    tags: ["Workflow pipelines", "API integrations", "Event webhooks", "Operational sync"],
    icon: "automation" as const,
  },
];

export const projects = [
  {
    slug: "tripsplit",
    name: "TripSplit",
    category: "Mobile App · FinTech & Debt Settlement",
    type: "Built project",
    description: "Effortless, privacy-first group expense sharing and optimal debt settlement for Android.",
    visual: "tripsplit",
    number: "01",
    outcome: "An offline-first Android application that simplifies group trip expenses and calculates the mathematically minimal cash transfers needed to settle debts.",
    services: ["Android engineering", "Jetpack Compose", "Offline-first sync", "Graph algorithms"],
    problemExplored: "Group expense apps often require intrusive accounts, lock users behind logins, and fail without cellular connectivity. TripSplit explores zero-friction onboarding, Android App Link joining, and offline-first Room database sync with Cloud Firestore.",
    demonstratedCapability: "Debt minimization algorithm, first-claim cryptographic link locking, reactive Jetpack Compose UI, and bidirectional cloud sync.",
  },
  {
    slug: "build2buzz",
    name: "Build2Buzz",
    category: "Applied AI · Workflow Automation",
    type: "Built project",
    description: "Grounding AI content generation in verified repository facts and browser demo telemetry.",
    visual: "build2buzz",
    number: "02",
    outcome: "An automated AI pipeline that inspects GitHub codebases and live browser demos to isolate factual evidence and draft verified social updates via official REST APIs.",
    services: ["Applied AI pipelines", "Headless browser automation", "Factuality validation", "REST API integration"],
    problemExplored: "Marketing and AI copy generators routinely hallucinate features and metrics. Build2Buzz separates documented facts from live runtime observations to produce verified, human-approved release communications.",
    demonstratedCapability: "SSRF-safe headless browser inspection, automated prompt grounding, human-in-the-loop review interface, and LinkedIn API publishing.",
  },
  {
    slug: "har-apparels",
    name: "Har Apparels",
    category: "Custom Software · Manufacturing ERP",
    type: "Built project",
    description: "Shop-floor operations and batch tracking software for a denim manufacturing plant.",
    visual: "har-apparels",
    number: "03",
    outcome: "A tailored Android ERP that digitizes denim roll consumption, cutting and stitching work orders, material requests, and real-time floor worker reporting.",
    services: ["Custom enterprise software", "Shop-floor Android UI", "Operations workflow", "Batch inventory tracking"],
    problemExplored: "Apparel manufacturing facilities frequently bottleneck at paper-based fabric logs and manual shift handoffs. This system replaces fragmented paper slips with role-based mobile workflows for cutting, stitching, and finishing stages.",
    demonstratedCapability: "Denim roll lifecycle management, role-segregated worker/admin views, defect logging, and automated end-of-shift production reconciliation.",
  },
  {
    slug: "quicklycart",
    name: "QuicklyCart",
    category: "Web Experiences · Multi-Vendor Commerce",
    type: "Built project",
    description: "Local commerce marketplace connecting customers, multi-vendor stores, and delivery riders.",
    visual: "quicklycart",
    number: "04",
    outcome: "A full-stack commerce engine coordinating four distinct user roles through automated order lifecycles, store catalog management, and last-mile rider dispatch.",
    services: ["Full-stack web architecture", "Multi-role authentication", "Order state machines", "Dispatch workflows"],
    problemExplored: "Local commerce requires strict coordination across customers, merchant stock, rider dispatch, and platform governance. QuicklyCart models state-safe checkout flows, vendor payouts, and rider route tracking in one coherent system.",
    demonstratedCapability: "Role-based permission gating, real-time order state progression, multi-vendor product catalogues, and responsive customer-to-rider delivery tracking.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Understand",
    body: "We get clear on the people, problem, constraints and outcome before picking a solution.",
  },
  {
    number: "02",
    title: "Shape",
    body: "We map the experience, prioritise the essentials and agree on what the first release needs to do.",
  },
  {
    number: "03",
    title: "Build",
    body: "We turn the plan into a considered, responsive product and keep decisions visible along the way.",
  },
  {
    number: "04",
    title: "Improve",
    body: "We test the details, learn from real use and identify the next most valuable improvements.",
  },
];

export const deliveryTimelines = [
  {
    id: "architecture",
    phase: "Phase 01",
    label: "Architecture Sprint",
    duration: "approximately 1–2 weeks",
    durationShort: "1–2 weeks",
    summary: "Technical feasibility audit, interactive prototype, and execution roadmap before committing to full development.",
    deliverables: [
      "Interactive Figma prototype",
      "System architecture & schema design",
      "Milestone-based execution roadmap",
    ],
  },
  {
    id: "mvp",
    phase: "Phase 02",
    label: "Focused MVP",
    duration: "approximately 3–6 weeks",
    durationShort: "3–6 weeks",
    summary: "Production-ready launch of core features for mobile apps, web platforms, or bespoke operational software.",
    deliverables: [
      "Type-safe, maintainable codebase",
      "Automated CI/CD and deployment configuration",
      "Staging environment and launch handover",
    ],
  },
  {
    id: "product",
    phase: "Phase 03",
    label: "Larger Product",
    duration: "approximately 8–12 weeks or longer",
    durationShort: "8–12+ weeks",
    summary: "End-to-end product suites, multi-system integrations, or dedicated feature sprints tailored to scope.",
    deliverables: [
      "Multi-service API & database architecture",
      "Deep workflow automation & applied AI",
      "Comprehensive handover & operational documentation",
    ],
  },
] as const;

export const timelineDisclaimer =
  "Timelines are indicative estimates based on typical sprint velocity. The final schedule depends on scope, third-party integrations, complexity, feedback cadence, and client dependencies. Project schedules are confirmed after scoping.";

export const studioDifferentiators = [
  {
    title: "Direct principal engagement",
    description:
      "Work directly with senior designers and engineers who write the code and shape the interface. No layers of nontechnical intermediaries.",
  },
  {
    title: "Clear, milestone-based scope",
    description:
      "Defined sprint deliverables with working code and staging environments visible each week, keeping decisions transparent.",
  },
  {
    title: "Type-safe, maintainable software",
    description:
      "Clean TypeScript codebases built on modern standards so your team can comfortably maintain, scale, and extend the system.",
  },
  {
    title: "Documented handover & IP ownership",
    description:
      "Full handover of project-specific code and assets governed by the project agreement, with third-party components under standard open licenses.",
  },
];
