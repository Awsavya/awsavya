import { NextResponse } from "next/server";

export const runtime = "nodejs";

// In-memory sliding window rate-limiter for basic abuse throttling.
// Note: In serverless environments with multiple instances, each instance maintains its own map.
// For distributed production rate limiting at scale, an external store (e.g. Upstash Redis / Vercel KV) is recommended.
const ipRequestWindow = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // Maximum 5 requests
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes window

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown-client";
}

function checkRateLimit(ip: string): boolean {
  if (ip === "unknown-client") return true;
  const now = Date.now();
  const entry = ipRequestWindow.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequestWindow.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Clean up stale IP records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipRequestWindow.entries()) {
    if (now > entry.resetAt) {
      ipRequestWindow.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref?.();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Constrain request payload size to mitigate memory exhaustion
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 32768) {
    return NextResponse.json(
      { message: "Payload too large. Please shorten your message." },
      { status: 413 }
    );
  }

  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { message: "Too many enquiries sent from this network. Please wait a few minutes before trying again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "Invalid submission data. Please check the form and try again." },
      { status: 400 }
    );
  }

  // Honeypot spam field check
  if (body.botcheck || body.honeypot || body.website_url) {
    // Spambot filled the hidden trap field
    return NextResponse.json(
      { message: "Submission flagged by spam protection." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const budget = typeof body.budget === "string" ? body.budget.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  // Field validation
  if (name.length < 2 || name.length > 100) {
    return NextResponse.json(
      { message: "Please provide a valid name between 2 and 100 characters." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json(
      { message: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (!service || service.length > 120) {
    return NextResponse.json(
      { message: "Please select a valid service area." },
      { status: 400 }
    );
  }

  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { message: "Please describe your project in between 10 and 5,000 characters." },
      { status: 400 }
    );
  }

  if (company.length > 140) {
    return NextResponse.json(
      { message: "Company name must be under 140 characters." },
      { status: 400 }
    );
  }

  if (budget.length > 120) {
    return NextResponse.json(
      { message: "Budget selection must be under 120 characters." },
      { status: 400 }
    );
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || "ee49443e-3566-4722-948f-7a54f4113e55";

  // Unconfigured email delivery must return an explicit 503 error rather than pretending success
  if (
    !accessKey ||
    accessKey === "your_web3forms_key_here"
  ) {
    return NextResponse.json(
      {
        message:
          "The contact form is not yet connected to an active email service in deployment settings. Please configure WEB3FORMS_ACCESS_KEY. Your message has not been sent.",
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `AWSAVYA website enquiry — ${name} (${service})`,
        from_name: "AWSAVYA Website",
        replyto: email,
        name,
        email,
        company: company || "Not provided",
        service,
        budget: budget || "Not provided",
        message,
        botcheck: (body.botcheck as string) || "",
      }),
      cache: "no-store",
    });

    const data = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !data.success) {
      console.error("Web3Forms API rejected message delivery:", response.status, data.message);
      return NextResponse.json(
        { message: data.message || "We couldn't deliver your enquiry right now. Please try again or email us directly at hello@awsavya.in." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: "Thank you for reaching out. Your enquiry has been received and we will get back to you shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Web3Forms delivery network exception:", error);
    return NextResponse.json(
      { message: "We couldn't deliver your enquiry right now. Please try again or reach out at hello@awsavya.in." },
      { status: 502 }
    );
  }
}
