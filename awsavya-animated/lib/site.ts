export const site = {
  name: "AWSAVYA",
  email: "hello@awsavya.in",
  description: "AWSAVYA explores digital experiences through web, applications, software, AI and emerging technology.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.awsavya.in",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  { id: "web-experiences", number: "01", title: "Web Experiences", short: "Sites and platforms that invite people in.", description: "High-performance websites, sophisticated interfaces, and immersive web applications built to be useful as well as memorable.", tags: ["Web platforms", "Interactive interfaces", "Accessibility", "Performance"], form: "mesh" },
  { id: "application-development", number: "02", title: "Application Development", short: "Digital products shaped around real use.", description: "Modern applications with considered workflows, clear interaction patterns, and a strong foundation for change.", tags: ["Mobile products", "Product systems", "Interaction design", "Prototyping"], form: "orbit" },
  { id: "software-engineering", number: "03", title: "Software Engineering", short: "Systems with structure beneath the surface.", description: "Custom software, scalable services, and tailored operational tools that connect people, data, and decisions.", tags: ["Custom software", "APIs", "Internal tools", "Architecture"], form: "stack" },
  { id: "artificial-intelligence", number: "04", title: "Artificial Intelligence", short: "Intelligence with a clear purpose.", description: "Practical AI features, automation, and machine learning integrations designed around evidence, evaluation, and human control.", tags: ["Applied AI", "Knowledge systems", "Automation", "Evaluation"], form: "network" },
  { id: "emerging-technologies", number: "05", title: "Emerging Technologies", short: "A space to explore what comes next.", description: "Prototypes and experimental interfaces that test new ways to interact with digital systems.", tags: ["Creative technology", "3D interaction", "Prototyping", "R&D"], form: "wave" },
] as const;

export const projects = [
  { id: "tripsplit", number: "01", name: "TripSplit", category: "Application · Concept study", summary: "An offline-first group expense experience that explores a simpler way to settle shared costs.", challenge: "How might a group settle expenses with less setup and reliable access when connectivity is limited?", approach: "Explore a focused Android flow with local persistence, clear balances, and a graph-based settlement model.", technologies: ["Kotlin", "Jetpack Compose", "Room", "Graph algorithms"], theme: "amber" },
  { id: "build2buzz", number: "02", name: "Build2Buzz", category: "Applied AI · Concept study", summary: "A grounded content workflow that separates verified project facts from generated language.", challenge: "AI generated release copy can blur evidence and assumption.", approach: "Separate source material, observed behavior, and draft claims, then put a human review step before publishing.", technologies: ["Python", "Playwright", "LLM APIs", "Review UI"], theme: "blue" },
  { id: "har-apparels", number: "03", name: "Har Apparels", category: "Software · Concept study", summary: "A shop floor workflow study for batch tracking, material requests, and shift handoffs.", challenge: "Paper based production handoffs can fragment information across a manufacturing floor.", approach: "Model clear role based actions and batch states from material intake through quality checks.", technologies: ["Android", "Workflow design", "Local storage", "REST API"], theme: "green" },
  { id: "quicklycart", number: "04", name: "QuicklyCart", category: "Web platform · Concept study", summary: "A multi role local commerce system coordinating storefronts, orders, and delivery.", challenge: "Multiple participants need one understandable order lifecycle.", approach: "Explore explicit order states and distinct interfaces for shoppers, stores, riders, and administrators.", technologies: ["Django", "PostgreSQL", "REST API", "Responsive UI"], theme: "violet" },
] as const;

export const universe = [
  { name: "Interfaces", detail: "The layer people touch: responsive, legible, and considered." },
  { name: "Systems", detail: "The architecture that makes complex work feel simple." },
  { name: "Intelligence", detail: "Useful automation grounded in evidence and human judgment." },
  { name: "Experiments", detail: "Small, purposeful prototypes for uncertain ideas." },
  { name: "Motion", detail: "Movement that explains, orients, and rewards exploration." },
];
