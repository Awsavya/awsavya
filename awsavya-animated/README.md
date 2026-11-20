# AWSAVYA Animated

A standalone experimental Next.js website in this folder. The existing parent website is untouched.

## Run

```bash
cd awsavya-animated
npm install
npm run dev
```

The opening sculpture uses Three.js, React Three Fiber, drei lighting and distortion, and an original GPU particle shader. It falls back to a CSS object when WebGL2 is unavailable or reduced motion is requested. GSAP ScrollTrigger coordinates pinned, reversible scene changes, while Lenis synchronizes desktop wheel scrolling. Motion for React powers magnetic links and project tilt.

The contact endpoint has validation, a honeypot, and basic in-memory throttling. Set `WEB3FORMS_ACCESS_KEY` server-side for delivery. Without it, the endpoint returns a clear `503` and the form never reports success. For a public deployment, use a distributed rate limiter appropriate to the hosting platform.

Portfolio entries are explicitly labelled **Concept study**. No client outcomes are claimed.
