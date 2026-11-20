# AWSAVYA live website inventory — 11 November 2026

## Scope and evidence

This inventory covers the public site at `https://www.awsavya.in` on 11 November 2026. I fetched every route in its sitemap, followed the internal links in the rendered HTML, inspected interactive views in a browser, checked the apex domain, and reviewed the current local source separately. The machine-readable HTTP capture is in `awsavya_live_snapshot.json`; it includes the default server-rendered text, links, forms, metadata, and response headers for each route. Interactive tab content is summarized below because it is not all present in the initial server response.

The current local checkout contains many uncommitted changes and does not exactly match the deployed site. All page descriptions below refer to the **live site** unless labelled “local source.” No real contact enquiry was sent. There was no 375 px, 768 px, or 1440 px visual pass, no axe audit, and no measured Core Web Vitals run; those cannot be inferred from the checks below.

**Owner clarification and follow-up:** The four named items are real built projects, not client engagements or merely proposed studies. Their interactive preview numbers are sample data, and Web3Forms is the intended form processor. The live labels recorded in this snapshot remain historical observations. Commit `0241904` on `codex/fix-work-projects` updates the stable source to say “Built project” and fixes the Work page deep links; it has not been deployed as part of this audit.

## Site map and navigation

| Route | HTTP | Live title | Main purpose |
| --- | ---: | --- | --- |
| `/` | 200 | AWSAVYA — Apps, Web, Software, AI & Automation | Studio positioning, capabilities, concept previews, process, scope estimator |
| `/services` | 200 | Services & Capabilities — AWSAVYA | Five interactive service descriptions, differentiators, indicative sprint formats |
| `/work` | 200 | Work & Case Studies — AWSAVYA | Four interactive **Concept study** entries |
| `/about` | 200 | About — AWSAVYA | Brand name explanation, disciplines, values |
| `/contact` | 200 | Contact — AWSAVYA | Project enquiry form and FAQ |
| `/privacy` | 200 | Privacy Policy — AWSAVYA | Data practices and contact rights |
| `/robots.txt` | 200 | — | Allows `/`, disallows `/api/`, points to sitemap |
| `/sitemap.xml` | 200 | — | Lists the six public pages above |
| `/site.webmanifest` | 200 | — | PWA name, colors, start URL, icons |
| Unknown route | 404 | Default site title | Branded “This page took a wrong turn” page |

`https://awsavya.in/` redirects to `https://www.awsavya.in/`. The header links are Services, Work, About, and Start a project; the footer adds Contact, Privacy, `hello@awsavya.in`, and Back to top. Each page includes a Skip to content link. No public links to social accounts, phone numbers, address, or external project demos appeared in the captured navigation.

## Brand, visual system, and main messages

- Positioning: a digital product studio for apps, websites, custom software, applied AI, and automation. The homepage lead is “Technology for your next move.”
- Design: white and light silver background, dark typography, selective blue/violet accents, editorial scale, fine borders, custom interface mockups, and motion. The site emphasizes direct collaboration, maintainable engineering, accessibility, and handover.
- Primary conversion: Start a project / Start a conversation links to `/contact`. Secondary paths lead to capability details, concept work, and About.
- The homepage has an illustrative AI assistant with three prompt tabs, simulated telemetry controls, a five-tab service explorer, four concept cards, a four-tab process explorer, four studio differentiators, and a capability/timeline scope estimator.
- The shared footer says “Something good starts with a conversation” and “Digital products, custom software, AI and automated systems made with intention.”

## Five capabilities

The interactive selector appears on both Home and Services. Each selection shows the problem, engineering highlights, recommended stack, capability standard, indicative deliverables, and a contact CTA.

### 1. App development

Cross-platform React Native apps and installable PWAs, with offline-aware caching, safe-area geometry, touch ergonomics, and native device capabilities. Recommended stack: React Native, Expo, TypeScript, Next.js, Tailored CSS. Indicative deliverables: Figma design system and component library, type-safe mobile client or PWA, and store deployment preparation. Tags include iOS/Android planning and Progressive Web Apps.

### 2. Web experiences

Fast company sites and platforms with server-rendered Next.js, accessible typography/contrast, semantic hierarchy, and structured metadata. Recommended stack: Next.js 16, React 19, Motion, vanilla CSS, Vercel. Indicative deliverables: responsive design system, production Next.js app, SEO metadata, sitemap, and Open Graph cards.

### 3. Custom software

Portals, operations backends, and internal tools for specialized workflows. Highlights: role-based access, audited sessions, sortable/filterable/exportable data tables, database migrations. Recommended stack: Node.js, PostgreSQL, Prisma ORM, REST/GraphQL, Docker. Indicative deliverables: schema/API documentation, administrative dashboard and operations portal, staging and automated deployment.

### 4. Applied AI

Domain assistants, document search, and source-grounded answers with fallback guardrails. Highlights: retrieval-augmented generation, citation tracking, low-certainty fallback, streamed responses. Recommended stack: OpenAI and Anthropic APIs, vector indexes, Python/FastAPI, TypeScript. Indicative deliverables: ingestion and semantic index, conversational UI and prompt templates, usage/latency/failure monitoring.

### 5. Automation

Connected workflows and event integrations to reduce manual handoffs. Highlights: webhook listeners with retries/error queues, multi-service synchronization with idempotency, email/chat/SMS alerts. Recommended stack: Node.js microservices, webhook handlers, Zapier/Make, event queues. Indicative deliverables: workflow map/integration specification, production handlers and sync routines, automated error alerting.

## Work: four concept studies

All four are explicitly marked **Concept study** on the Work page and homepage. The Work page says “ALL FOUR STUDIES TESTABLE LIVE,” but the live controls operate illustrative sample interfaces within the site; they are not links to deployed products.

| Study | Focus | In-page demo controls | Architecture and stated stack |
| --- | --- | --- | --- |
| TripSplit | Android group expenses, offline use, debt settlement | Trip selection, graph optimization toggle, Record Settle | Room caching, Firestore sync, Android App Links, graph-based debt minimization; Kotlin 2.0, Jetpack Compose M3, Room, Firestore, Coroutines |
| Build2Buzz | Grounded AI release/social content | Switch Repo, Verify Demo | Separates README facts, browser observations, and generated claims; SSRF-protected Playwright/Chromium, Python 3.12, Anthropic/OpenAI APIs, LinkedIn REST API, PySide/Qt |
| Har Apparels | Denim manufacturing operations and batch tracking | Worker/Admin modes, Advance Stage | Role-separated shop-floor ERP and batch state machine; Kotlin Android SDK, Material Design, Room/local storage, REST backend |
| QuicklyCart | Multi-vendor commerce and rider dispatch | Store status and order lifecycle controls | Four-role authorization, idempotent order transitions, inventory and routing; Django/Python, PostgreSQL, REST API, Bootstrap 5 |

The work page also states four engineering standards: performance-minded builds, end-to-end type safety, ergonomics and accessibility targeting WCAG 2.2 AA, and code handover governed by the client agreement. All numerical values inside the previews (for example balances, store counts, latency, and order values) are presented in sample/demo interfaces. They should remain clearly labelled as illustrative.

## Process, engagement, and About

The four interactive process phases are:

1. **Understand:** 1–2 discovery sessions; problem/constraint brief, user flow map, technical feasibility check.
2. **Shape:** bi-weekly visual checkpoints; clickable wireframes, design tokens, API/data model schema.
3. **Build:** weekly demos and asynchronous updates; staging, type-safe code, deployment pipelines.
4. **Improve:** post-launch warranty/evolution plan; performance report, telemetry/error logs, iteration backlog.

Three indicative engagement formats appear on Services and in the homepage estimator: Architecture Sprint (about 1–2 weeks), Focused MVP (about 3–6 weeks), and Larger Product (about 8–12+ weeks). The site expressly says final schedules depend on scope, integrations, complexity, feedback cadence, and client dependencies, and are agreed after scoping.

Four published differentiators are direct principal engagement, clear milestone-based scope, type-safe maintainable software, and documented handover/IP ownership subject to project agreement and third-party licences.

About expands the name as Apps, Web, Software, AI, **V and Y for founders Vivek and Yash**, and Automation. Its interactive anatomy describes the five technical disciplines plus a Founders panel promising direct work with builders/decision-makers. The four stated principles are Start with the why, Clarity over complexity, Build with care, and Keep improving. There are no detailed biographies on the page.

## Contact and privacy

The contact page invites a rough idea or clear brief and warns visitors not to include passwords, private API keys, or sensitive credentials. The form contains a honeypot input; required service, name, work email, and project message; optional company/project and indicative format. Service options are App development, Web development, Custom software, Applied AI, Automation, and Not sure yet. Format options are Flexible/Let's discuss, Architecture Sprint (1–2 weeks), Focused MVP (3–6 weeks), and Larger Product (8–12+ weeks). The message field shows a 5,000-character counter. The submission notice links to Privacy.

An empty submission was blocked by native required-field validation; no success message appeared. A service link for App development preselected that option. A Web experiences link mapped to Web development. A homepage blueprint link preselected App development and inserted its scope note into the message field. **No valid enquiry was submitted**, so production email delivery and the server error path were not verified.

The four FAQs cover indicative timelines, scope/milestones, collaboration with existing teams/codebases, and code/IP ownership. The answers say final scope is agreed before development, staging/checkpoints are available, existing-team augmentation is possible, and project-specific ownership follows the client agreement.

The Privacy page (last updated October 2026) says it collects voluntarily submitted name, work email, optional company, and project details; uses them for enquiry/project correspondence; does not sell contact details or use advertising trackers; and may have standard hosting logs. It names **Web3Forms** as the server-side form processor, says HTTPS is used, and offers access, correction, deletion, and communication-pause requests through `hello@awsavya.in`. These are published policy statements; this audit did not independently verify retention, inbox routing, or processor configuration.

## Search, assets, and platform

- Each public route has one H1, a route-specific title and description, canonical URL, Open Graph and Twitter card metadata, and indexing/following directives. The site uses shared keyword metadata, `en_US` Open Graph locale, and a 1200×630 generated Open Graph image URL.
- The sitemap lists all six public routes with fixed `lastmod` of 31 October 2026. Robots allows the site and excludes `/api/`.
- The manifest identifies AWSAVYA, a standalone display mode, `#f8f9fb` background, `#191B22` theme, and 192/512 px PNG icons.
- Responses identify Vercel hosting. Observed headers include HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, and a camera/microphone/geolocation Permissions-Policy.
- The current source and live service text indicate Next.js 16, React 19, TypeScript, Motion, custom CSS, and Vercel. This is a description of the website stack; the other listed stacks are service recommendations or concept-study descriptions.
- At the available 714 px browser viewport, all six pages had one H1, no horizontal document overflow, no broken `<img>` elements, and no captured console errors. The mobile navigation, capability tabs, concept tabs, and FAQ expanders responded. This is a smoke check, not a full accessibility, performance, or visual regression audit.

## Findings to address

1. **Work deep links do not select their study.** The homepage QuicklyCart card navigated to `/work#quicklycart`, but the Work page still selected TripSplit. The fragment stayed in the URL. The same mechanism is used for all four homepage study cards, so this likely affects the other cards too; only QuicklyCart was directly exercised.
2. **Work metadata can overstate the evidence.** The live title is “Work & Case Studies” and the description calls them “real engineering studies,” while all four entries are labelled Concept study. Keep the explicit concept framing in titles, descriptions, and card previews so search snippets cannot read like client case studies.
3. **Some public claims merit owner verification.** The site names Vivek and Yash as founders, describes direct senior/principal engagement, says all four studies are “testable live,” and shows strong sample prototype claims such as “zero hallucination,” “100% Grounded in Evidence,” and a 280 ms render. Confirm the business claims and keep illustrative numbers unmistakably tied to sample data.
4. **Local contact implementation conflicts with project guidance.** The local `app/api/contact/route.ts` currently uses Web3Forms with a hardcoded fallback access key, whereas `AGENTS.md` requires server-side Resend delivery and a clear failure when delivery is unconfigured. The deployed privacy page also names Web3Forms. This is a source/policy consistency finding; I did not submit a live form or prove which server code is deployed. The key value is intentionally omitted from this report.
5. **Full QA remains open.** Test actual contact delivery with a controlled inbox, the unconfigured failure path, keyboard focus/order, reduced-motion behavior, 375/768/1440 px layouts, accessibility rules, and real Web Vitals. No screenshot baseline was available, so visual regression is inconclusive.

## Files

- `awsavya_live_snapshot.json`: raw public-page capture, including response headers, rendered default text, form structure, links, and SEO metadata.
- `audit_awsavya_live.py`: repeatable read-only crawler for public routes and links. It does not submit forms.
