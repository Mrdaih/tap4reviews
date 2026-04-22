import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const { name, email, business, message } = body as Record<string, string>;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX ?? "hello@tap4reviews.com";

  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY missing; payload:", { name, email, business });
    return NextResponse.json({ ok: true, queued: true });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Tap4Reviews <noreply@tap4reviews.com>",
    to: [inbox],
    replyTo: email,
    subject: `New enquiry from ${name}${business ? ` (${business})` : ""}`,
    text: `From: ${name} <${email}>\nBusiness: ${business ?? "-"}\n\n${message}`,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
