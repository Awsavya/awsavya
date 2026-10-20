export const siteConfig = {
  name: "AWSAVYA",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://awsavya.in",
  description:
    "AWSAVYA builds apps, websites, custom software, AI-powered products and automation for ambitious businesses.",
  email: "hello@awsavya.in",
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
    short: "Useful, intuitive experiences people want to come back to.",
    description:
      "From the first user flow to the final release, we shape mobile and web apps around the people who rely on them.",
    tags: ["Product strategy", "UI/UX", "iOS & Android planning", "Web apps"],
    icon: "app" as const,
  },
  {
    number: "02",
    title: "Web experiences",
    short: "Fast, thoughtful websites built to turn interest into action.",
    description:
      "Brand websites, product pages and web platforms that combine clear messaging, considered design and reliable engineering.",
    tags: ["Company websites", "Web platforms", "Landing pages", "Performance"],
    icon: "web" as const,
  },
  {
    number: "03",
    title: "Custom software",
    short: "Systems shaped around how your business actually works.",
    description:
      "Replace disconnected tools and repetitive work with software designed around your team's real process.",
    tags: ["Dashboards", "Portals", "Internal tools", "Integrations"],
    icon: "software" as const,
  },
  {
    number: "04",
    title: "Applied AI",
    short: "Practical AI features with a clear job to do.",
    description:
      "Bring AI into workflows where it can assist people, help surface knowledge and make complex tasks easier to manage.",
    tags: ["AI assistants", "Knowledge search", "Document workflows", "Prototyping"],
    icon: "ai" as const,
  },
  {
    number: "05",
    title: "Automation",
    short: "Less repetitive work. More room for the work that matters.",
    description:
      "Connect the tools you already use and automate handoffs, notifications and repeatable business processes.",
    tags: ["Workflow automation", "API integrations", "Data sync", "Operational flows"],
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
