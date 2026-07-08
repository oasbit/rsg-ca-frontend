const WP_API = process.env.WORDPRESS_API_URL ?? "https://rsg-ac.ca";

export function getWordPressApiUrl(): string {
  return WP_API.replace(/\/$/, "");
}

export async function wpFetch<T>(
  path: string,
  options?: { revalidate?: number | false },
): Promise<T> {
  const base = getWordPressApiUrl();
  const url = `${base}/wp-json${path}`;

  const res = await fetch(url, {
    next: { revalidate: options?.revalidate ?? 3600 },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error ${res.status} for ${path}`);
  }

  return res.json() as Promise<T>;
}
