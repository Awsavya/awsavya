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

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Unconfigured email delivery must return an explicit 503 error rather than pretending success
  if (
    !apiKey ||
    !to ||
    !from ||
    apiKey === "re_your_api_key_here" ||
    to === "your-inbox@example.com"
  ) {
    return NextResponse.json(
      {
        message:
          "The contact form is not yet connected to an active email service in deployment settings. Please configure RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL. Your message has not been sent.",
      },
      { status: 503 }
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeService = escapeHtml(service);
  const safeBudget = escapeHtml(budget || "Not provided");
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");

  const plainText = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Service: ${service}`,
    `Budget: ${budget || "Not provided"}`,
    "",
    "Project message:",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `AWSAVYA website enquiry — ${name} (${service})`,
        text: plainText,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; color: #14171a; line-height: 1.6;">
            <div style="border-bottom: 2px solid #e6e4dc; padding-bottom: 12px; margin-bottom: 20px;">
              <p style="font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #5e6673; margin: 0;">AWSAVYA WEBSITE ENQUIRY</p>
              <h2 style="font-size: 20px; font-weight: 600; margin: 6px 0 0 0;">New project conversation initiated</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tbody>
                <tr>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; color: #5e6673; width: 120px; font-size: 13px;">Name</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; font-size: 14px; font-weight: 500;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; color: #5e6673; font-size: 13px;">Email</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; color: #5e6673; font-size: 13px;">Company</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; font-size: 14px;">${safeCompany}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; color: #5e6673; font-size: 13px;">Service Area</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; font-size: 14px; font-weight: 500;">${safeService}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; color: #5e6673; font-size: 13px;">Timeline / Budget</td>
                  <td style="padding: 8px 12px; border-bottom: 1px solid #f0eee6; font-size: 14px;">${safeBudget}</td>
                </tr>
              </tbody>
            </table>
            <div style="background: #faf9f6; border: 1px solid #e6e4dc; border-radius: 8px; padding: 16px; margin-top: 16px;">
              <p style="font-size: 12px; font-weight: 600; color: #5e6673; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.08em;">Project Scope &amp; Details</p>
              <div style="font-size: 14px; color: #282d35; white-space: pre-wrap;">${safeMessage}</div>
            </div>
            <p style="font-size: 12px; color: #88909e; margin-top: 24px; border-top: 1px solid #e6e4dc; padding-top: 12px;">
              Submitted through the contact form at awsavya.in. Reply directly to this email to contact ${safeName}.
            </p>
          </div>
        `,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("Resend API rejected message delivery:", response.status, errText.slice(0, 300));
      return NextResponse.json(
        { message: "We couldn't deliver your enquiry right now. Please try again or email us directly at hello@awsavya.in." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: "Thank you for reaching out. Your enquiry has been received and we will get back to you shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email delivery network exception:", error);
    return NextResponse.json(
      { message: "We couldn't deliver your enquiry right now. Please try again or reach out at hello@awsavya.in." },
      { status: 502 }
    );
  }
}
