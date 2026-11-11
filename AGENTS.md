# AWSAVYA project guidance for Antigravity

- Keep the visual system clean, premium, white/silver, and typography-led. Violet is an accent, not a dominant color.
- Preserve responsive behavior and accessible keyboard focus states. Respect `prefers-reduced-motion` for all new movement.
- Describe the four portfolio entries as **built projects**. Do not present them as client engagements. Keep interactive preview numbers and content clearly labelled as sample data. Do not invent clients, metrics, testimonials, partner logos, founder bios, or business claims.
- Before changing deployment or domain advice, check current hosting-provider instructions. Do not change DNS values based on guesses.
- Contact delivery uses Web3Forms. Do not commit real `.env` files or put access keys in client components. Keep contact delivery server-side in `app/api/contact/route.ts`.
- If changing the contact form, confirm that unconfigured email delivery gives a clear error and does not show success. Add spam controls before promoting the public form.
- Primary content lives in `lib/site.ts`; page styles and responsive breakpoints live in `app/globals.css`.
- Keep motion purposeful, light on mobile, and avoid adding heavyweight dependencies unless a concrete interaction needs them.
