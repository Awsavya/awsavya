# AWSAVYA Website

A responsive multi-page website starter for AWSAVYA, a technology studio focused on apps, web, custom software, applied AI and automation. Built for Google Antigravity / AI coding IDE workflows with Next.js App Router, TypeScript, Motion for React and Lucide icons.

## Pages included

- `/` — homepage with animated hero, capability cards, concept portfolio, process and CTA
- `/services` — five service detail sections
- `/work` — built projects by the founders (not client engagements; previews use sample data)
- `/about` — brand story and working principles
- `/contact` — validated project enquiry form
- `/api/contact` — server-side email delivery endpoint using Resend
- `/sitemap.xml` and `/robots.txt` — generated SEO routes

## 1. Run it locally in Antigravity

1. Install Node.js 20.9 or newer.
2. Extract this folder and open the `awsavya-website` folder in Antigravity.
3. Open the integrated terminal in that folder.
4. Install packages:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000` in your browser.

Before publishing, run a production build:

```bash
npm run build
```

## 2. Configure the contact form

The form is built and validated, but **email delivery is intentionally not active until you configure it**. This avoids showing a fake success message or silently losing enquiries.

1. Create an account at [Resend](https://resend.com/).
2. Verify a sender domain with Resend and create an API key.
3. Copy `.env.example` to `.env.local` for local testing.
4. Set these variables with your actual values:

   ```dotenv
   RESEND_API_KEY=re_your_real_key
   CONTACT_TO_EMAIL=the-inbox-you-check@example.com
   CONTACT_FROM_EMAIL=AWSAVYA Website <website@your-verified-domain.com>
   NEXT_PUBLIC_SITE_URL=https://awsavya.in
   ```

5. Restart `npm run dev` after changing environment values.
6. In production, add the same variables in your hosting platform's environment-variable settings. Do not commit `.env.local` or expose the Resend key in browser code.

The `CONTACT_FROM_EMAIL` address must use a sender/domain that Resend has verified. The contact form's selected budget ranges and fields are easy to edit in `components/ContactForm.tsx`.

## 3. Deploy to Vercel

1. Create a Git repository and push this project to a private or public GitHub repository.
2. Import the repository in [Vercel](https://vercel.com/).
3. Keep the default Next.js build settings. Add the contact environment variables under the project's Settings → Environment Variables.
4. Deploy and test the Vercel preview URL first, including the contact form.
5. In Vercel, add `awsavya.in` as a project domain. Add `www.awsavya.in` too if you want both forms to work.
6. Vercel will display the DNS records required for your project. Use the exact records it shows.

## 4. Connect GoDaddy DNS after deployment

The GoDaddy screenshot showed the root `A` record `@` with data `WebsiteBuilder Site`. That suggests the domain is pointed at GoDaddy's website-builder destination today.

Do not change the records until a deployment exists. Once Vercel has given you the domain-specific instructions:

1. Go to GoDaddy → Domain → DNS → DNS Records.
2. Review the existing records and take a screenshot / note them before editing.
3. Edit or replace only the conflicting website records using the **exact values Vercel shows**. Vercel commonly uses an `A` record for the apex and a `CNAME` for `www`, but follow the current dashboard instructions because values can vary.
4. Do not remove MX records or unrelated TXT records; these may support email or domain verification.
5. Wait for DNS propagation and verify the domain in Vercel. Enable/confirm HTTPS when it becomes available.

DNS changes can make an existing service unavailable. Since the site is not built yet, make the change only after a successful deployment and test the final domain afterwards.

## 5. Brand and content to personalise

- `lib/site.ts` contains service content, portfolio concepts, process steps and base metadata.
- The current portfolio entries are the founders' own **built projects**, not claimed client engagements. Add client case studies only with permission.
- Update the About page with actual founder biographies once you want to publish them.
- Add a real public contact email when you have configured one; no email address is assumed in the current design.
- The selected service and budget options are starter copy and can be changed in `components/ContactForm.tsx`.
- `app/globals.css` contains the full design system and responsive breakpoints.

## Design choices

The site uses a white/silver palette, restrained violet accents, custom CSS interface mockups, and motion-based entrances/hover states. The motion respects `prefers-reduced-motion`. No paid font, stock image or external hero image is required to render the current design.

## Before launch checklist

- [ ] Replace all placeholder project concepts with real work or keep the concept label clearly visible.
- [ ] Verify the contact form end-to-end with a real inbox.
- [ ] Add deployment environment variables.
- [ ] Check all pages on mobile and desktop.
- [ ] Check title, description and favicon.
- [ ] Add privacy policy / terms if your business, analytics or lead capture require them.
- [ ] Add spam protection (such as a honeypot, rate limiting or a CAPTCHA provider) before sharing the form publicly.
- [ ] Deploy first, then connect `awsavya.in` through the hosting provider's DNS instructions.
