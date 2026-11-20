# AWSAVYA project guidance for Antigravity

- Keep the visual system clean, premium, white/silver, and typography-led. Violet is an accent, not a dominant color.
- Preserve responsive behavior and accessible keyboard focus states.
- Animations run on every device by default (owner decision): do not gate motion on the OS `prefers-reduced-motion` setting. Gate it on the site's footer toggle instead — `motionOff()` / `useMotionOff()` from `lib/motion.ts` and the `html[data-motion="off"]` CSS selector. When motion is off, keep opacity fades and drop movement (slides, parallax, 3D, skew, pinning, smooth scroll). This applies to both this site and `awsavya-animated/`.
- The four portfolio entries (TripSplit, Build2Buzz, Har Apparels, QuicklyCart) are the founders' own **Built projects**, not client engagements; never present them as client work. Their interactive previews use sample data and must stay labelled as such. Do not invent clients, metrics, testimonials, partner logos, founder bios, or business claims.
- Before changing deployment or domain advice, check current hosting-provider instructions. Do not change DNS values based on guesses.
- Never put Resend API keys in client components or commit real `.env` files. Keep contact delivery server-side in `app/api/contact/route.ts`.
- If changing the contact form, confirm that unconfigured email delivery gives a clear error and does not show success. Add spam controls before promoting the public form.
- Primary content lives in `lib/site.ts`; page styles and responsive breakpoints live in `app/globals.css`.
- Keep motion purposeful, light on mobile, and avoid adding heavyweight dependencies unless a concrete interaction needs them.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
