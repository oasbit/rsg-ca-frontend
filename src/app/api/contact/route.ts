import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  /** Honeypot — bots fill this; real users never see it. */
  company?: string;
}

const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";

    // Honeypot — silently succeed so bots think they worked
    if (body.company) {
      return NextResponse.json({ ok: true });
    }

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const wpBase = (process.env.WORDPRESS_API_URL ?? "https://rsg-ac.ca").replace(/\/$/, "");
    const secret = process.env.REVALIDATE_SECRET ?? "";

    const wpResponse = await fetch(`${wpBase}/wp-json/rsg/v1/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RSG-Secret": secret,
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
      }),
    });

    const data = (await wpResponse.json()) as { ok?: boolean; error?: string };

    if (!wpResponse.ok) {
      return NextResponse.json(
        { error: data.error ?? "Unable to send message." },
        { status: wpResponse.status },
      );
    }

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
