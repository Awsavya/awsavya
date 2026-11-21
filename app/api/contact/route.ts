import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Kept: 16 KB cap, 5 tries per IP per 10 minutes, the website_url honeypot, the validation rules,
// an explicit 503 when WEB3FORMS_ACCESS_KEY is missing, and Web3Forms delivery.
// Added: an elapsed_ms check (time since the form mounted, measured on the visitor's one clock with
// performance.now(), so a skewed device clock never matters); anything sent within 3s is rejected.
// The limiter is per server instance. Add a distributed one before the form is promoted.
const LIMIT = 5, WINDOW = 10 * 60 * 1000, MAX_BYTES = 16_384, MIN_FILL_MS = 3000;
const attempts = new Map<string, { count: number; reset: number }>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MSG = {
  sent: "Sent. We'll reply from awsavya@gmail.com.",
  unconfigured: "Not sent. Email delivery isn't set up on this site yet. Write to awsavya@gmail.com and we'll pick it up there.",
  undelivered: "Not sent. We couldn't deliver it. Write to awsavya@gmail.com instead.",
  limited: "Too many tries from this connection. Wait ten minutes, or write to awsavya@gmail.com.",
  invalid: "Not sent. Please check the highlighted fields.",
  tooLong: "Not sent. That's longer than we can take here. Write to awsavya@gmail.com instead.",
  tooFast: "Not sent. Please take a moment and try again.",
  blocked: "Not sent. Our spam filter stopped it.",
} as const;

type Field = "name" | "email" | "service" | "message";
function response(message: string, status: number, fields?: Field[]) {
  return NextResponse.json(fields ? { message, fields } : { message }, { status });
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > MAX_BYTES) return response(MSG.tooLong, 413);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  // Drop expired counts on every request, so an IP address is held only while its 10-minute window is open.
  for (const [key, value] of attempts) if (value.reset < now) attempts.delete(key);
  const prior = attempts.get(ip);
  const entry = prior && prior.reset > now ? prior : { count: 0, reset: now + WINDOW };
  if (entry.count >= LIMIT) return response(MSG.limited, 429);
  entry.count++;
  attempts.set(ip, entry);

  // Read the body ourselves so the cap also holds when no content-length header is sent.
  let raw: string;
  try { raw = await request.text(); } catch { return response(MSG.invalid, 400); }
  if (new TextEncoder().encode(raw).length > MAX_BYTES) return response(MSG.tooLong, 413);
  let body: Record<string, unknown>;
  try { body = JSON.parse(raw); } catch { return response(MSG.invalid, 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return response(MSG.invalid, 400);

  if (body.website_url) return response(MSG.blocked, 400);
  const elapsed = typeof body.elapsed_ms === "number" ? body.elapsed_ms : Number.NaN;
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return response(MSG.tooFast, 400);

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const bad: Field[] = [];
  if (name.length < 2 || name.length > 100) bad.push("name");
  if (!emailPattern.test(email) || email.length > 254) bad.push("email");
  if (!service || service.length > 120) bad.push("service");
  if (message.length < 10 || message.length > 5000) bad.push("message");
  if (bad.length) return response(MSG.invalid, 400, bad);

  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) return response(MSG.unconfigured, 503);

  try {
    const delivery = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: key, subject: `AWSAVYA enquiry — ${service}`, from_name: "AWSAVYA Website", replyto: email, name, email, service, message }),
      cache: "no-store",
    });
    const result = await delivery.json().catch(() => ({ success: false }));
    if (!delivery.ok || !result.success) return response(MSG.undelivered, 502);
    return response(MSG.sent, 200);
  } catch {
    return response(MSG.undelivered, 502);
  }
}
