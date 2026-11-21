# AWSAVYA website

The AWSAVYA site (www.awsavya.in): a run of light, typographic posters. Each one starts unresolved and settles, the way the four products take a messy situation to a clear end state.

This edition replaced the classic site in November 2026. The classic site is kept in git history at the tag `classic-site-final`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

Pages: `/`, `/work`, `/work/[slug]` (four builds), `/services`, `/services/[slug]` (four services), `/about`, `/contact`, `/privacy`, plus the 404. Generated: `/sitemap.xml`, `/robots.txt`, `/opengraph-image` (the share card), `/icon.png`, `/apple-icon.png`.

| Script | What it checks |
|---|---|
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript) |
| `npm test` | `lib/settle.ts` maths: the hero seeds, the TripSplit sample, balance invariants (`node --experimental-strip-types --test`) |
| `npm run check:rules` | House rules in `app/`, `components/`, `lib/`: banned imports, eases, durations, words, styles (`scripts/check-rules.mjs`) |
| `npm run build` | Production build; check route sizes in the output |

## Stack

- **Next.js 16.4.6** App Router, **React 19.3** (`<ViewTransition>` page transitions, no config).
- **GSAP 3.15** core + **CustomEase** (two house curves). **ScrollTrigger** is imported only by the home hero.
- **Lenis 1.3** smooth wheel scrolling on fine pointers with motion on. Its package CSS is not imported; the four rules it needs are in `app/styles/chrome.css`.
- Fonts via `next/font/google` only: **Archivo** variable (wdth 62–125, wght 100–900) for every word, **Martian Mono** variable for live data only. About 126 KB in total.
- No 3D or animation-library dependencies beyond GSAP and Lenis; `check:rules` bans importing `three`, `@react-three/*` and `motion/react`.

## Where things live

- `lib/site.ts`: every visible string and all content data, including the privacy policy. Product facts come only from the classic site's `lib/site.ts` and `lib/project-studies.ts` (tag `classic-site-final`), in modest wording.
- `app/globals.css`: reset, `:root` tokens, `[data-ground]` maps, focus, selection, the Motion Off rule. `app/styles/chrome.css`: shared classes. `home.css`, `work.css`, `pages.css`: unit styles (`home-`, `work-`, `pg-` prefixes).
- `components/chrome/*`: header, menu, footer, motion toggle, page transition, fitted type, DONE stamp, bar buttons and links, close row.
- `lib/motion.ts` (Motion preference), `lib/ease.ts` (curves, durations, `useMotionScope`), `lib/fit.ts` (measured poster fitting), `lib/settle.ts` (settle-up maths).

## Motion rules

- **On by default, on every device.** Motion is never gated on the operating system's reduced-motion setting. The one opt-out is the **Motion: On | Off** toggle in the footer and the menu. It applies live (no reload) and is remembered per browser (`localStorage["awsavya-motion"]`), restored before first paint by the head script.
- **Motion Off** (`html[data-motion="off"]`): opacity fades (0.18s) and colour changes only. Nothing moves, no physics, no scroll scrubs or pins, no floods, no smooth scrolling. Every end state and all content stay visible.
- Two curves only: **SETTLE** `cubic-bezier(.2,.9,.25,1.12)` for arriving, **DRIVE** `cubic-bezier(.66,0,.12,1)` for travelling (GSAP names `"settle"` / `"drive"`). Five durations only: 0.18, 0.36, 0.54, 0.72, 1.08s.
- Every animated component runs its setup through `useMotionScope(ref, off => …)`, which reverts and re-runs when the toggle changes.
- Page transitions (**DELIVER**): every internal link is a `DeliverLink`. The destination floods out of the clicked row in 0.54s; project names morph into the next page's H1. Back/forward and Motion Off use a 0.18s crossfade. Browsers without View Transitions navigate instantly.

## Poster fitting

Poster words are sized from advances measured in Archivo (wght 860, wdth 62), so `font-size = k × 100cqi` is exact at every width with no measuring after hydration. Two-line posters share one size; a line indented to the A4 column gets 55% of the measure.

| Poster | Lines (indent) | k |
|---|---|---|
| Services H1 | "What we" (a1) / "take on." (a4) | .1641 |
| Contact H1 | "Start a" (a1) / "brief." (a4) | .2378 |
| 404 | "Nothing to" (a1) / "deliver." (a4) | .1630, × 0.9 |
| Mobile apps | one line | .1989 |
| Websites and web platforms | "Websites and" / "web platforms" | .1575 |
| Custom software | "Custom" / "software" | .2420 |
| Applied AI and automation | "Applied AI and" / "automation" | .1731 |
| VIVEK / YASH | two lines, a1 | .4483 (capped) |
| Project names | single line | .98 / advance |

A word missing from `POSTER_ADV` in `lib/fit.ts` falls back to a conservative estimate and warns in development; measure it and add it.

## Contact form

Delivery is server-side only, in `app/api/contact/route.ts`, through Web3Forms. Set `WEB3FORMS_ACCESS_KEY` in the server environment (never in client code, never in a committed `.env`).

- Without the key the endpoint returns **503** with a clear "Not sent" message, and the form never shows success. Success (and the one violet flood on the site) happens only on HTTP 200.
- Spam controls: a honeypot field (`hp_field` in the form, sent as `website_url`), a minimum time-on-form check (the form sends `elapsed_ms`, measured with `performance.now()` on the visitor's own clock, so a skewed device clock never blocks a real brief; under 3 s is rejected), a 16 KB size cap, and an in-memory limit of 5 per IP per 10 minutes.
- Every failure message ends with the email address. The form posts with `method="post"`, so a submit before hydration never puts fields in the URL; without JavaScript the button is hidden and the email is the way in.
- **Before promoting the form publicly, add a distributed rate limiter** suited to the host. The in-memory limit does not hold across serverless instances.

## SEO and sharing

- Every page sets its own canonical URL and share text through `pageMetadata()` in `lib/meta.ts`. The base address is fixed to `https://www.awsavya.in` in `lib/site.ts` (as on the classic site), so previews and local builds still name the production address.
- `app/layout.tsx` adds Organization structured data built only from `lib/site.ts`. `app/privacy/page.tsx` adds a breadcrumb.
- `app/opengraph-image.tsx` draws the share card for every route.
- `next.config.ts` sends security headers (HSTS, frame, referrer, permissions), redirects `awsavya.in` to `www.awsavya.in`, and redirects old URLs (`/animated/*` and the previous service slugs).
- The privacy policy (`privacy` in `lib/site.ts`) describes exactly what the site does today: the brief form's fields, Web3Forms delivery, the in-memory spam limit and the one `localStorage` key. Update it when any of those change.

## Deploy (Vercel)

1. The Vercel project builds this repository's root with the default Next.js settings. No `vercel.json` is needed.
2. In the project's **Settings → Environment Variables** (not the separate "Environments" page), add `WEB3FORMS_ACCESS_KEY` as type **Secret** for Production and Preview. Web3Forms delivers briefs to the email address the key was created for. Without the key, the contact form says "Not sent" and points people to the email address. A `NEXT_PUBLIC_SITE_URL` variable, if one exists, is no longer read.
3. Check the preview deployment first, including sending a real brief, then promote it to production.
4. Domains and DNS: use the exact records Vercel shows for `awsavya.in` and `www.awsavya.in`. Don't remove MX or unrelated TXT records; they may carry email or verification.

## Honesty rules

- The four products are labelled **Built project**: designed and built by Vivek and Yash, not client work.
- Every product interface on the site is redrawn in code with **sample data**, and says so. A number appears only if it is counted (four builds, two founders) or computed live from sample data.
- No invented clients, testimonials, metrics, logos, bios or availability claims.
