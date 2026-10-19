import { NextResponse } from "next/server";

export const runtime = "nodejs";

function escapeHtml(value: string) {
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

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Please submit the form again with valid details." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const budget = typeof body.budget === "string" ? body.budget.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !service || service.length > 120 || message.length < 10 || message.length > 5000 || company.length > 140 || budget.length > 120) {
    return NextResponse.json({ message: "Please check the required fields and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from || apiKey === "re_your_api_key_here") {
    return NextResponse.json(
      { message: "The contact form hasn't been connected to email yet. Configure RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in the deployment settings before going live. Your message has not been sent." },
      { status: 503 },
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
    "Message:",
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
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#20232b"><p style="font-size:12px;letter-spacing:.12em;color:#68708a">AWSAVYA WEBSITE ENQUIRY</p><h2>New project enquiry</h2><table style="border-collapse:collapse;width:100%"><tbody><tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;color:#697080">Name</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safeName}</td></tr><tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;color:#697080">Email</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safeEmail}</td></tr><tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;color:#697080">Company</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safeCompany}</td></tr><tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;color:#697080">Service</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safeService}</td></tr><tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;color:#697080">Budget</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safeBudget}</td></tr></tbody></table><h3>Project details</h3><p style="line-height:1.65">${safeMessage}</p></div>`,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const providerMessage = await response.text().catch(() => "");
      console.error("Email provider rejected contact submission", response.status, providerMessage.slice(0, 500));
      return NextResponse.json({ message: "We couldn't deliver your enquiry just now. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ message: "Thanks for reaching out. Your enquiry has been sent." }, { status: 200 });
  } catch (error) {
    console.error("Contact email delivery failed", error);
    return NextResponse.json({ message: "We couldn't send your enquiry right now. Please try again later." }, { status: 502 });
  }
}
