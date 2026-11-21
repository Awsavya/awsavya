# AWSAVYA project guidance for Antigravity

- Keep the visual system clean, premium, white/silver/ink, and typography-led. No purple or violet anywhere (owner decision, November 2026): the accent is ink, or off-white on dark grounds.
- Preserve responsive behavior and accessible keyboard focus states.
- Animations run on every device by default (owner decision): do not gate motion on the OS `prefers-reduced-motion` setting. Gate it on the site's footer toggle instead — `motionOff()` / `useMotionOff()` from `lib/motion.ts` and the `html[data-motion="off"]` CSS selector. When motion is off, keep opacity fades and drop movement (slides, parallax, 3D, skew, pinning, smooth scroll). Animated components run their setup through `useMotionScope` from `lib/ease.ts`, which re-runs when the toggle changes.
- The four portfolio entries (TripSplit, Build2Buzz, Har Apparels, QuicklyCart) are the founders' own **Built projects**, not client engagements; never present them as client work. Their interactive previews use sample data and must stay labelled as such. Do not invent clients, metrics, testimonials, partner logos, founder bios, or business claims.
- Before changing deployment or domain advice, check current hosting-provider instructions. Do not change DNS values based on guesses.
- The contact form sends briefs from the visitor's browser straight to Web3Forms (`components/pages/BriefForm.tsx`). Their free plan refuses server-side calls (HTTP 403), and their access key is public by design, so it is passed to the form from the `WEB3FORMS_ACCESS_KEY` environment variable at build time. Never hard-code it in source, never commit real `.env` files, and never put any other key in client code.
- If changing the contact form, confirm that unconfigured email delivery gives a clear error and does not show success. Add spam controls before promoting the public form.
- Primary content lives in `lib/site.ts`, including the privacy policy (keep it in step with what the site actually collects and stores). Tokens and base styles live in `app/globals.css`; shared and page styles and their breakpoints live in `app/styles/*.css`.
- Before committing, run `npm run typecheck`, `npm run lint`, `npm test`, `npm run check:rules` and `npm run build`.
- Keep motion purposeful, light on mobile, and avoid adding heavyweight dependencies unless a concrete interaction needs them.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
