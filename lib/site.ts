export const siteConfig = {
  name: "AWSAVYA",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.awsavya.in",
  canonicalUrl: "https://www.awsavya.in",
  description:
    "AWSAVYA builds apps, websites, custom software, AI solutions, and automations that help businesses solve real problems.",
  email: "hello@awsavya.in",
  releaseDate: "2026-10-20",
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
    slug: "lumen-finance",
    name: "Lumen",
    category: "Product design · Web app",
    type: "Concept study",
    description: "A calmer way to understand everyday money decisions.",
    visual: "lumen",
    number: "01",
    outcome: "A finance dashboard concept built around clarity, useful summaries and approachable data visualisation.",
    services: ["Product thinking", "Dashboard UI", "Responsive design"],
    problemExplored: "Most financial dashboards overwhelm users with excessive tabular noise. This concept demonstrates how progressive disclosure and calm typography reduce cognitive fatigue.",
    demonstratedCapability: "Interactive timeframe bucketing, accessible SVG charts, and responsive financial data hierarchy.",
  },
  {
    slug: "relay-ai",
    name: "Relay AI",
    category: "Applied AI · Knowledge tools",
    type: "Concept study",
    description: "A searchable workspace that helps teams find the signal in their notes.",
    visual: "relay",
    number: "02",
    outcome: "An AI-assisted knowledge workspace concept focused on source-aware answers and a simple search experience.",
    services: ["AI product concept", "Interaction design", "Workflow mapping"],
    problemExplored: "AI tools often output answers without verifiable context. Relay AI explores strict citation attribution and source grounding for institutional trust.",
    demonstratedCapability: "Conversational UI paired with cited source snippet coordination and contextual filtering.",
  },
  {
    slug: "flowline-ops",
    name: "Flowline",
    category: "Automation · Operations",
    type: "Concept study",
    description: "A clearer view of the small processes that keep a business moving.",
    visual: "flowline",
    number: "03",
    outcome: "An operations dashboard concept for visualising handoffs, status and repeatable workflows.",
    services: ["Process mapping", "Dashboard concept", "Automation planning"],
    problemExplored: "Operations teams spend hours tracking task handoffs across siloed tools. Flowline centralizes event triggers and surface actionable alarms.",
    demonstratedCapability: "Simulated multi-node webhook pipeline execution, visual status tracking, and event flow monitoring.",
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
