// All visible copy and content data. Product facts come only from the owner's
// D:\awsavya-website\lib\site.ts and lib\project-studies.ts, in modest wording.
export type Ground = "paper" | "silver" | "ink";
export type ProjectSlug = "tripsplit" | "build2buzz" | "har-apparels" | "quicklycart";
export type ServiceSlug = "mobile-apps" | "websites-and-web-platforms" | "custom-software" | "applied-ai-and-automation";

export const site = {
  name: "AWSAVYA",
  email: "hello@awsavya.in",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.awsavya.in",
  title: "AWSAVYA — mobile apps, websites, custom software and applied AI",
  description: "AWSAVYA is Vivek and Yash, a two-person studio that designs and builds mobile apps, websites and web platforms, custom software, and applied AI and automation. See four products we built ourselves.",
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
] as const;
export const cta = { label: "Start a brief", href: "/contact" } as const;

export type Founder = { name: string; initial: string; role: string; note: string | null };
export const founders: readonly Founder[] = [
  { name: "Vivek", initial: "V", role: "Co-founder", note: null }, // note: founder-written paragraph; null = section hidden
  { name: "Yash", initial: "Y", role: "Co-founder", note: null },
];

export type ProjectState = { key: string; label: string; line: string };
export type StackItem = { name: string; usedFor: string };
export type Project = {
  slug: ProjectSlug; name: string; label: "Built project"; platform: string; frame: "android" | "browser";
  lineupGround: Ground; endWord: string; oneLine: string; caption: string; question: string; tangle: string;
  states: readonly ProjectState[]; stack: readonly StackItem[]; services: readonly ServiceSlug[];
};

export const projects: readonly Project[] = [
  {
    slug: "tripsplit", name: "TripSplit", label: "Built project", platform: "Android · offline-first", frame: "android",
    lineupGround: "ink", endWord: "Settled",
    oneLine: "An Android app that splits a group's expenses, keeps working offline, and reduces what the group owes to fewer transfers.",
    caption: "Android, offline-first group expenses. Built project.",
    question: "Who owes whom?",
    tangle: "On a trip, one person pays for fuel and another for dinner, and the totals end up in a chat thread. Group expense apps often want everyone signed up first, and a network. TripSplit lets people join from a link without a mandatory account, and keeps working offline.",
    states: [
      { key: "expenses", label: "Expenses", line: "Each expense is saved on the phone first, so adding one works offline." },
      { key: "balances", label: "Balances", line: "TripSplit works out what each person is owed or owes." },
      { key: "transfers", label: "Transfers", line: "It reduces the group's debts to fewer transfers, and syncs the group when the phone is back online." },
    ],
    stack: [
      { name: "Kotlin", usedFor: "The app itself." },
      { name: "Jetpack Compose", usedFor: "The interface." },
      { name: "Room (SQLite)", usedFor: "Keeps the group's data on the phone, so it works offline." },
      { name: "Firebase Firestore", usedFor: "Syncs the group between phones." },
      { name: "Coroutines", usedFor: "Background work, off the main thread." },
    ],
    services: ["mobile-apps"],
  },
  {
    slug: "build2buzz", name: "Build2Buzz", label: "Built project", platform: "AI pipeline · Python", frame: "browser",
    lineupGround: "paper", endWord: "Grounded",
    oneLine: "An AI pipeline that drafts release posts from facts in a project's repository and what it observes in the live demo, for a person to review.",
    caption: "An AI pipeline that drafts release posts from repo facts and the live demo. Built project.",
    question: "Which sentences are true?",
    tangle: "AI writing tools can describe features that don't exist, because nothing ties a sentence to the code. Build2Buzz keeps three things apart: what the repository documents, what the live demo shows, and what the AI writes. A person reviews the draft with the evidence beside it.",
    states: [
      { key: "facts", label: "Repo facts", line: "Facts are read from the repository's documentation." },
      { key: "observed", label: "Demo seen", line: "A headless browser opens the live demo and records what it actually sees." },
      { key: "draft", label: "Draft", line: "The draft is written from those two lists, and each sentence points to its evidence." },
      { key: "review", label: "Review", line: "A person reviews the draft, with a character limit and the evidence beside each sentence." },
    ],
    stack: [
      { name: "Python", usedFor: "The pipeline." },
      { name: "Playwright (Chromium)", usedFor: "Opens the live demo and records what it sees." },
      { name: "LLM APIs (Anthropic, OpenAI)", usedFor: "Write the draft from the collected evidence." },
      { name: "PySide (Qt)", usedFor: "The review screen." },
      { name: "LinkedIn REST API", usedFor: "Publishes a post once it's approved." },
    ],
    services: ["applied-ai-and-automation"],
  },
  {
    slug: "har-apparels", name: "Har Apparels", label: "Built project", platform: "Android · shop floor", frame: "android",
    lineupGround: "silver", endWord: "Tracked",
    oneLine: "An Android app for the shop floor, built for a denim manufacturing plant. Each batch is tracked from the denim roll through cutting and sewing to final QC.",
    caption: "An Android shop-floor app for a denim manufacturing plant. Built project.",
    question: "Where is this batch?",
    tangle: "On a garment shop floor, fabric use, material requests and handoffs between shifts are easy to lose track of on paper. Har Apparels gives each role on the floor a simple screen for its part of a batch, with large buttons and clear status.",
    states: [
      { key: "roll", label: "Roll", line: "A denim roll is issued to the batch and the length used is logged." },
      { key: "cutting", label: "Cutting", line: "The cutting master logs the cut." },
      { key: "sewing", label: "Sewing", line: "The batch moves to sewing on the floor." },
      { key: "qc", label: "Final QC", line: "The batch reaches its final quality check." },
    ],
    stack: [
      { name: "Kotlin", usedFor: "The app itself." },
      { name: "Android SDK, Material Design", usedFor: "A high-contrast interface with large touch targets." },
      { name: "Room (local storage)", usedFor: "Keeps the floor's data on the phone." },
      { name: "REST backend", usedFor: "The server the app talks to." },
    ],
    services: ["mobile-apps", "custom-software"],
  },
  {
    slug: "quicklycart", name: "QuicklyCart", label: "Built project", platform: "Web platform · Django", frame: "browser",
    lineupGround: "ink", endWord: "Delivered",
    oneLine: "A local commerce platform where customers, stores, riders and admins each see the same order from their side.",
    caption: "Local commerce for customers, stores and delivery riders. Built project.",
    question: "Where is my order?",
    tangle: "A local order passes through a customer, a store and a rider, with an admin keeping the platform running. If each works from a different channel, nobody is sure what state the order is in. QuicklyCart keeps one order and moves it one step at a time, and a repeated step doesn't move it twice.",
    states: [
      { key: "placed", label: "Placed", line: "The customer places the order." },
      { key: "store", label: "At store", line: "The store confirms it and packs it." },
      { key: "rider", label: "With rider", line: "A verified rider is assigned and picks it up." },
      { key: "delivered", label: "Delivered", line: "The rider confirms delivery." },
    ],
    stack: [
      { name: "Django (Python)", usedFor: "The platform and its four portals." },
      { name: "PostgreSQL", usedFor: "Orders, stores and stock." },
      { name: "REST API", usedFor: "The order and store endpoints." },
      { name: "Bootstrap 5, CSS and JavaScript", usedFor: "The interfaces." },
    ],
    services: ["websites-and-web-platforms", "custom-software"],
  },
];
export const projectBySlug = (slug: string) => projects.find(p => p.slug === slug);
export const nextProject = (slug: ProjectSlug) => projects[(projects.findIndex(p => p.slug === slug) + 1) % projects.length];

export type Service = {
  slug: ServiceSlug; name: string; short: string; lede: string; lines: readonly string[]; // lines = H1 poster split (all a1)
  questions: readonly [string, string, string]; proof: readonly ProjectSlug[]; thisSite: boolean;
  stack: readonly { name: string; usedFor: string; where: string }[]; also: readonly string[]; formChip: string;
};
export const services: readonly Service[] = [
  {
    slug: "mobile-apps", name: "Mobile apps", lines: ["Mobile apps"],
    short: "Android apps for people away from a desk: on a trip with patchy coverage, on a factory floor.",
    lede: "We build Android apps for people who use them away from a desk. Both of our mobile builds were made for that: one for group trips, one for a factory floor.",
    questions: ["Does it have to work offline?", "Who installs it: your team, or the public?", "Android only, or iPhone too?"],
    proof: ["tripsplit", "har-apparels"], thisSite: false,
    stack: [
      { name: "Kotlin", usedFor: "The apps themselves", where: "TripSplit, Har Apparels" },
      { name: "Jetpack Compose", usedFor: "Interface", where: "TripSplit" },
      { name: "Room", usedFor: "Data kept on the phone", where: "TripSplit, Har Apparels" },
      { name: "Firebase Firestore", usedFor: "Sync between phones", where: "TripSplit" },
      { name: "Material Design", usedFor: "Large, high-contrast controls", where: "Har Apparels" },
    ],
    also: ["Cross-platform apps with React Native, when that fits better", "Installable web apps (PWAs)", "Offline-first apps that sync when they can"],
    formChip: "Mobile app",
  },
  {
    slug: "websites-and-web-platforms", name: "Websites and web platforms", lines: ["Websites and", "web platforms"],
    short: "Websites that say plainly what you do, and platforms where several kinds of user share one system.",
    lede: "A website has one job: make clear what you do and get the right people in touch. A platform has a harder one: several kinds of user, one system, nothing contradicting itself.",
    questions: ["Who are the different people who'll log in, and what does each need to see?", "What should a visitor do before they leave?", "Who updates the content after launch?"],
    proof: ["quicklycart"], thisSite: true,
    stack: [
      { name: "Django", usedFor: "The platform", where: "QuicklyCart" },
      { name: "PostgreSQL", usedFor: "Orders, stores and stock", where: "QuicklyCart" },
      { name: "REST API", usedFor: "Endpoints", where: "QuicklyCart" },
      { name: "Next.js and GSAP", usedFor: "This site and its motion", where: "This website" },
    ],
    also: ["Company and product websites", "Web platforms with several kinds of user", "Accessible, fast pages"],
    formChip: "Website or web platform",
  },
  {
    slug: "custom-software", name: "Custom software", lines: ["Custom", "software"],
    short: "Software shaped around how one operation actually runs.",
    lede: "Off-the-shelf tools make you work their way. Custom software follows the way your operation already runs, and records each step where it happens.",
    questions: ["What runs this today: paper, a spreadsheet or another tool?", "Who enters the data, and who needs to read it?", "What has to happen at the end of a shift, a day or a month?"],
    proof: ["har-apparels", "quicklycart"], thisSite: false,
    stack: [
      { name: "Kotlin, Android SDK", usedFor: "The shop-floor app", where: "Har Apparels" },
      { name: "Django, PostgreSQL", usedFor: "Order handling for several stores", where: "QuicklyCart" },
      { name: "REST backend", usedFor: "The server behind the floor app", where: "Har Apparels" },
    ],
    also: ["Operations dashboards", "Client portals", "Internal tools", "API integrations"],
    formChip: "Custom software",
  },
  {
    slug: "applied-ai-and-automation", name: "Applied AI and automation", lines: ["Applied AI and", "automation"],
    short: "AI that writes from evidence, and automations that take repeat work off people.",
    lede: "We use AI where its output can be checked. Build2Buzz drafts only from facts in a repository and what it sees in a live demo, and a person reviews the draft before it goes anywhere.",
    questions: ["What should the AI be allowed to say, and where does it get that from?", "Who checks the output before it goes anywhere?", "Which repeat task takes the most hours each week?"],
    proof: ["build2buzz"], thisSite: false,
    stack: [
      { name: "Python", usedFor: "The pipeline", where: "Build2Buzz" },
      { name: "Playwright", usedFor: "Reading a live demo", where: "Build2Buzz" },
      { name: "LLM APIs (Anthropic, OpenAI)", usedFor: "Drafting from collected evidence", where: "Build2Buzz" },
      { name: "PySide (Qt)", usedFor: "The review screen", where: "Build2Buzz" },
    ],
    also: ["Assistants that answer from your own documents", "Search across your documents", "Workflow automation between the tools you already use", "Webhooks and scheduled jobs"],
    formChip: "AI or automation",
  },
];
export const serviceBySlug = (slug: string) => services.find(s => s.slug === slug);
export const nextService = (slug: ServiceSlug) => services[(services.findIndex(s => s.slug === slug) + 1) % services.length];

export const home = {
  h1: "We design and build mobile apps, websites, custom software, and applied AI and automation.",
  lede: "We're Vivek and Yash. Tell us how something works today, and we'll build the version that settles it.",
  // Readouts are set in mixed case (screen readers say "IOUs") and uppercased in CSS. Totals are sums of the sample amounts.
  readoutBefore: (ious: number, owed: string) => `${ious} IOUs · ${owed} owed · sample data`,
  readoutAfter: (transfers: number, moved: string) => `${transfers} transfers · ${moved} moved · sample data`,
  liveBefore: (ious: number) => `Tangled again: ${ious} new sample IOUs. Press Settle up.`,
  liveAfter: (ious: number, owed: string, transfers: number, moved: string) => `Settled. ${ious} sample IOUs (${owed}) became ${transfers} transfers (${moved}).`,
  caption: "Sample IOUs strung between our letters. Settle up runs the maths live and cuts them down to a few transfers.",
  settle: "Settle up", settling: "Settling…", retangle: "Tangle it again",
  hintFine: "Drag a letter", hintCoarse: "Hold a letter to drag it",
  tableCaption: "Sample IOUs between the letters of AWSAVYA, and the transfers that settle them",
  letterNames: ["first A", "W", "S", "second A", "V", "Y", "last A"],
  lineupTitle: "Four builds. All ours.",
  lineupStatement: "No client logos yet. These are four products we designed and built ourselves, redrawn here in code with sample data.",
  lineupMore: "How each one works",
  takeOnTitle: "What we take on.", takeOnMore: "All four services",
  vyStatement: "Two of these letters write the code.",
  vyBody: "Vivek and Yash. You talk to the two people who design and build it.", vyLink: "About us",
} as const;

export const work = {
  h1: "Four builds.",
  statement: "Two Android apps, an AI pipeline and a web platform. Designed and built by us, shown with sample data.",
  label: "Built project · not client work",
  facts: { platform: "Platform", stack: "Stack", builtBy: "Built by", status: "Status" },
  builtBy: "Vivek and Yash", status: "Built project · not client work",
  statesTitle: (endWord: string) => `How it gets to ${endWord.toLowerCase()}`,
  tryTitle: {
    tripsplit: "Settle a sample trip", build2buzz: "Drop a source", "har-apparels": "Log a sample batch", quicklycart: "Move a sample order",
  } satisfies Record<ProjectSlug, string>,
  tryNote: "Sample data. A simplified version of the idea, not the app's production code.",
  builtWithTitle: "Stack",
  real: "What's real here: the product, its stack and the way it works. What isn't: every name, number and order on this page. That's sample data, redrawn in code.",
  screenNote: "Interface redrawn in code for this site. Not a screenshot. Sample data.",
  next: "Next build", proofLink: (name: string) => `See how ${name} works`,
} as const;

export const servicesPage = {
  h1Lines: ["What we", "take on."],
  statement: "Four kinds of work. Each one is backed by something we built.",
  stackLabel: "Typical stack",
  crossTitle: "Which build shows what.",
  crossCaption: "Which of our builds shows each kind of work",
  crossLegend: "A bar means the build is that kind of work. A dash means it isn't that kind of product.",
  crossEmpty: "Not that kind of product", thisWebsite: "This website",
  askTitle: "What we'd ask first.", proof: "Proof", stackTitle: "Typical stack", alsoTitle: "We also build", next: "Next service",
} as const;

export const about = {
  lead: "There's a V and a Y in AWSAVYA.", h1: "Vivek and Yash", smallLine: "AWSA··A",
  howTitle: "How we work.",
  how: [
    { title: "You talk to the people who write the code.", body: "No account managers in between. The two of us scope it, design it and build it." },
    { title: "Scope comes in milestones.", body: "Each milestone ends with working software you can open and try." },
    { title: "Code your team can keep.", body: "Typed, readable code, and the notes to run it." },
    { title: "A documented handover.", body: "You get the project's code and documentation, under the terms of the project agreement." },
  ],
  wontTitle: "What we won't do.",
  wont: ["Show logos of clients we don't have.", "Put a number on this site we can't back up.", "Ship an AI feature that can't show where its answer came from."],
  phasesTitle: "How a first project usually runs.", ownWordsTitle: "In our own words.",
} as const;
export const phases = [
  { label: "Architecture sprint", duration: "About 1–2 weeks", summary: "A feasibility check, an interactive prototype and a plan, before full development starts." },
  { label: "Focused MVP", duration: "About 3–6 weeks", summary: "The core features of a mobile app, web platform or internal tool, ready to launch." },
  { label: "Larger product", duration: "About 8–12 weeks or longer", summary: "Bigger products, several systems working together, or feature sprints shaped to scope." },
] as const;
export const timelineDisclaimer = "Timelines are indicative estimates based on typical sprint velocity. The final schedule depends on scope, third-party integrations, complexity, feedback cadence, and client dependencies. Project schedules are confirmed after scoping.";

export const contact = {
  h1Lines: ["Start a", "brief."],
  statement: "Tell us how it works today and what has to work at the end. One of us replies from hello@awsavya.in.",
  aside: "Prefer email? Write to hello@awsavya.in. We read every brief ourselves.",
  name: "Your name", email: "Email", kind: "What kind of work?",
  chips: ["Mobile app", "Website or web platform", "Custom software", "AI or automation", "Not sure yet"],
  today: "How does it work today?", todayHint: "Warts and all: the spreadsheet, the paper, the group chat.",
  end: "What has to work at the end?", endHint: "Optional.",
  submit: "Send brief", sending: "Sending…", rail: ["Draft", "Sending", "Sent"], sentWord: "Sent",
  sent: "Sent. We'll reply from hello@awsavya.in.", notSent: "Not sent", fallback: "Write to hello@awsavya.in instead.",
  again: "Send another brief",
  errors: {
    name: "Add your name (at least 2 characters).",
    email: "Add an email we can reply to.",
    today: "Tell us a little about how it works today (at least 10 characters).",
  },
} as const;

export const notFound = {
  lines: ["Nothing to", "deliver."], sr: "Nothing to deliver.",
  statement: "There's no page at this address. These letters won't settle either.",
  home: "Take me home", work: "See the four builds",
} as const;

export const closeRow = {
  title: "Send us the messy version.",
  body: "The workaround that runs it today is enough to start.",
  button: "Start a brief",
} as const;

export const footer = {
  signoff: (year: number) => `Built by Vivek and Yash. © ${year} AWSAVYA.`,
  end: "End of page",
  motion: { legend: "Motion", on: "On", off: "Off", offNote: "Motion off. Everything's already settled.", onNote: "Motion on." },
  menuNote: "Built by Vivek and Yash.",
} as const;

export const pageMeta = {
  work: { title: "Four builds", description: "Two Android apps, an AI pipeline and a web platform, designed and built by Vivek and Yash. Shown with sample data." },
  services: { title: "Services", description: "Mobile apps, websites and web platforms, custom software, and applied AI and automation. Each one backed by something we built." },
  about: { title: "About", description: "AWSAVYA is Vivek and Yash. You talk to the two people who design and build it." },
  contact: { title: "Start a brief", description: "Tell us how it works today and what has to work at the end. Or write to hello@awsavya.in." },
} as const;
