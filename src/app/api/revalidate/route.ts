import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json()) as { slug?: string };
  const slug = body.slug ?? "";

  const pathMap: Record<string, string[]> = {
    "coworking-space": ["/"],
    "about-us": ["/about-us"],
    services: ["/services", "/services/team-building"],
    contact: ["/contact"],
    "privacy-policy-2": ["/privacy-policy"],
  };

  const paths = pathMap[slug] ?? ["/"];

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths });
}
