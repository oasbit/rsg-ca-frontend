import { wpFetch } from "./client";
import { rewriteToLocal } from "./images";
import type { WPPage } from "./types";

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const pages = await wpFetch<WPPage[]>(
      `/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed&acf_format=standard`,
    );
    return pages[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAllPages(): Promise<WPPage[]> {
  try {
    return await wpFetch<WPPage[]>(
      "/wp/v2/pages?per_page=100&status=publish&_fields=id,slug,modified",
    );
  } catch {
    return [];
  }
}

export function getFeaturedImage(page: WPPage | null): string | null {
  const media = page?._embedded?.["wp:featuredmedia"]?.[0];
  const url = media?.source_url ?? null;
  return url ? rewriteToLocal(url) : null;
}

export function getFeaturedAlt(page: WPPage | null): string {
  const media = page?._embedded?.["wp:featuredmedia"]?.[0];
  return media?.alt_text || stripTitle(page);
}

function stripTitle(page: WPPage | null): string {
  return page?.title?.rendered?.replace(/<[^>]*>/g, "") ?? "RS Group";
}
