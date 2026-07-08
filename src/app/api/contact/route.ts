import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  company?: string;
}

const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";

    if (body.company) {
      return NextResponse.json({ ok: true });
    }

    if (!isValidPayload(body)) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const recipient = process.env.CONTACT_EMAIL ?? "info@rsg-ac.ca";
    const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      console.info("Contact form submission", {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
      });

      return NextResponse.json({
        ok: true,
        message: "Message received. Email delivery is not configured yet.",
      });
    }

    const resend = new Resend(resendKey);
    await resend.emails.send({
      from,
      to: recipient,
      replyTo: body.email,
      subject: `RS Group inquiry from ${body.name}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || "Not provided"}`,
        "",
        body.message,
      ].join("\n"),
    });

    rateLimit.set(ip, Date.now());
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: "Unable to send message." }, { status: 500 });
  }
}

function isValidPayload(body: ContactPayload): boolean {
  return Boolean(
    body?.name?.trim() &&
      body?.email?.trim() &&
      body?.message?.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email),
  );
}

function isRateLimited(ip: string): boolean {
  const lastRequest = rateLimit.get(ip);
  if (!lastRequest) return false;
  return Date.now() - lastRequest < RATE_LIMIT_WINDOW_MS;
}
