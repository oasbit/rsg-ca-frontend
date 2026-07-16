export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RS Group Advance Consulting",
    url: getSiteUrl(),
    email: "info@rsg-ac.ca",
    telephone: "1-866-253-6650",
    areaServed: {
      "@type": "Continent",
      name: "North America",
    },
  };
}

export async function buildPageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}) {
  const siteUrl = getSiteUrl();

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
    },
  };
}
