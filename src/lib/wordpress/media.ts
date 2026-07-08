import { wpFetch } from "./client";
import type { WPMedia } from "./types";

export async function getMediaById(id: number): Promise<WPMedia | null> {
  if (!id) return null;

  try {
    return await wpFetch<WPMedia>(`/wp/v2/media/${id}`);
  } catch {
    return null;
  }
}

export async function getMediaByIds(ids: number[]): Promise<WPMedia[]> {
  const uniqueIds = [...new Set(ids.filter(Boolean))];
  const results = await Promise.all(uniqueIds.map((id) => getMediaById(id)));
  return results.filter((item): item is WPMedia => item !== null);
}
