import type { WPPage } from "./types";

const WP_UPLOADS = "https://rsg-ac.ca/wp-content/uploads";

/** Transparent PNG assets from the live WordPress media library. */
export const BRAND = {
  colors: {
    primary: "#000000",
    secondary: "#232323",
    accent: "#F1ECDC",
    light: "#DFDECD",
    body: "#49685E",
    cream: "#FEFDF0",
    muted: "#8C8C8C",
  },
  logos: {
    main: `${WP_UPLOADS}/2026/03/RS-Group_black_high-res.png`,
    inverse: `${WP_UPLOADS}/2026/03/RS-Group_white_high-res.png`,
  },
  /** Full-bleed hero backgrounds (photographic — not subject cutouts). */
  heroBackgrounds: {
    home: `${WP_UPLOADS}/2026/03/financial-services-features-hero-scaled-1.webp`,
    contact: `${WP_UPLOADS}/2026/03/financial-services-features-hero-scaled-1.webp`,
    privacy: `${WP_UPLOADS}/2026/03/financial-services-contact-hero-scaled-1.webp`,
    about: `${WP_UPLOADS}/2026/04/rs-group-group-pic.jpg`,
    services: `${WP_UPLOADS}/2026/03/Generated-Image-March-18-2026-10_21AM.jpg`,
    /** Live site Elementor container a24e4f4 — "Connected and Collaborative" band. */
    editorial: `${WP_UPLOADS}/2026/03/coworking-space-hero-scaled-1.webp`,
  },
  /** Transparent PNG illustrations and portraits only. */
  transparent: {
    founder: `${WP_UPLOADS}/2026/04/Dr-Andrew-Peters-RS-Consulting.png`,
    connectCta: `${WP_UPLOADS}/2026/03/Andrew-Peters-RS-Consulting-Photo.png`,
    illustrationA: `${WP_UPLOADS}/2026/03/48ff7237-3361-4d44-8bec-a4e6079f2c9e-e1773926200763.png`,
    illustrationB: `${WP_UPLOADS}/2026/03/88aacc57-6bde-4853-9b80-1a39b81a89c7.png`,
    editorial: [
      `${WP_UPLOADS}/2026/03/48ff7237-3361-4d44-8bec-a4e6079f2c9e-e1773926200763.png`,
      `${WP_UPLOADS}/2026/03/88aacc57-6bde-4853-9b80-1a39b81a89c7.png`,
      `${WP_UPLOADS}/2026/04/Dr-Andrew-Peters-RS-Consulting.png`,
      `${WP_UPLOADS}/2026/03/Andrew-Peters-RS-Consulting-Photo.png`,
    ],
    serviceBlocks: [
      `${WP_UPLOADS}/2026/03/48ff7237-3361-4d44-8bec-a4e6079f2c9e-e1773926200763.png`,
      `${WP_UPLOADS}/2026/03/88aacc57-6bde-4853-9b80-1a39b81a89c7.png`,
      `${WP_UPLOADS}/2026/04/Dr-Andrew-Peters-RS-Consulting.png`,
      `${WP_UPLOADS}/2026/03/Andrew-Peters-RS-Consulting-Photo.png`,
    ],
  },
  /** Services page — photographic and illustration assets per block (live site order). */
  servicePageBlocks: {
    strategicPlanning: `${WP_UPLOADS}/2026/04/Andrew-Peters-1.jpeg`,
    leadershipDevelopment: `${WP_UPLOADS}/2026/03/48ff7237-3361-4d44-8bec-a4e6079f2c9e-e1773926200763.png`,
    teamBuilding: `${WP_UPLOADS}/2026/03/pexels-yankrukov-7693708-scaled.jpg`,
    facilitation: `${WP_UPLOADS}/2026/03/88aacc57-6bde-4853-9b80-1a39b81a89c7.png`,
  },
  /** Home services tabs — photographic assets where specified. */
  serviceTabs: {
    strategicPlanning: `${WP_UPLOADS}/2026/04/Andrew-Peters-1.jpeg`,
    leadershipDevelopment: `${WP_UPLOADS}/2026/04/leadership.jpg`,
    teamBuilding: `${WP_UPLOADS}/2026/04/rs-group-group-pic.jpg`,
    facilitation: `${WP_UPLOADS}/2026/04/8-glp-1-roi.webp`,
  },
  about: {
    overlay: `${WP_UPLOADS}/2026/03/119dc_Overlays-About-Us-BG-3.webp`,
    communityPanel: `${WP_UPLOADS}/2026/03/286dc_Brew-Bloom-Gallery-Image-2.webp`,
    approachBg: `${WP_UPLOADS}/2026/04/leadership.jpg`,
    focusBg: `${WP_UPLOADS}/2026/04/istockphoto-2181859726-612x612-1.jpg`,
    teamBg: `${WP_UPLOADS}/2026/04/rs-group-group-pic.jpg`,
    iconA: `${WP_UPLOADS}/2026/03/coworking-space-icon-6.webp`,
    iconB: `${WP_UPLOADS}/2026/03/coworking-space-icon-5.webp`,
    ascendGallery: [
      `${WP_UPLOADS}/2026/04/Ascend-Journey-Image-1.webp`,
      `${WP_UPLOADS}/2026/04/Ascend-Journey-Image-2.webp`,
      `${WP_UPLOADS}/2026/04/Ascend-Journey-Image-3.webp`,
      `${WP_UPLOADS}/2026/04/Ascend-Journey-Image-4.webp`,
      `${WP_UPLOADS}/2026/04/Ascend-Journey-Image-5.webp`,
      `${WP_UPLOADS}/2026/04/Ascend-Journey-Image-6.webp`,
    ],
  },
} as const;

export type SiteImage = { src: string; alt: string };

const THUMBNAIL_PATTERN = /[-_]\d+x\d+\.(webp|jpg|jpeg|png)$/i;
const LOGO_PATTERN = /RS-Group|Advance-Consulting|logo-\d+/i;

/** True for transparent PNG cutouts (excludes logos and photographic backgrounds). */
export function isTransparentAsset(url: string): boolean {
  const normalized = url.split("?")[0].toLowerCase();
  return normalized.endsWith(".png") && !LOGO_PATTERN.test(normalized);
}

/** Extract image URLs from WordPress HTML; optionally restrict to transparent PNGs. */
export function extractContentImages(
  html: string,
  options?: { transparentOnly?: boolean },
): string[] {
  const matches =
    html.match(/https:\/\/rsg-ac\.ca\/wp-content\/uploads\/[^"'\s)]+/g) ?? [];
  const seen = new Set<string>();
  const result: string[] = [];

  for (const url of matches) {
    const normalized = url.split("?")[0];
    if (THUMBNAIL_PATTERN.test(normalized)) continue;
    if (LOGO_PATTERN.test(normalized)) continue;
    if (options?.transparentOnly && !isTransparentAsset(normalized)) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }

  return result;
}

function siteImage(src: string, alt: string): SiteImage {
  return { src, alt };
}

function altFromUrl(src: string, fallback: string): string {
  if (src.includes("Andrew") || src.includes("Peters")) {
    return "Dr. Andrew Peters";
  }
  return fallback;
}

function assignUniqueImages(
  fromPage: string[],
  fallbacks: readonly string[],
  count: number,
): string[] {
  const used = new Set<string>();
  const result: string[] = [];

  for (const url of fromPage) {
    if (result.length >= count) break;
    if (!isTransparentAsset(url)) continue;
    if (used.has(url)) continue;
    used.add(url);
    result.push(url);
  }

  for (const url of fallbacks) {
    if (result.length >= count) break;
    if (used.has(url)) continue;
    used.add(url);
    result.push(url);
  }

  return result;
}

export function resolveHomeHeroImage(page: WPPage | null): SiteImage {
  const fromContent = extractContentImages(page?.content?.rendered ?? "").find(
    (url) => url.includes("hero") || url.includes("financial-services-features"),
  );

  return siteImage(
    fromContent ?? BRAND.heroBackgrounds.home,
    "RS Group Advance Consulting",
  );
}

export function resolveContactHeroImage(): SiteImage {
  return siteImage(BRAND.heroBackgrounds.contact, "RS Group Advance Consulting");
}

export function resolvePrivacyHeroImage(): SiteImage {
  return siteImage(BRAND.heroBackgrounds.privacy, "RS Group Advance Consulting");
}

export function resolveAboutHeroImage(page: WPPage | null): SiteImage {
  void page;
  return siteImage(
    BRAND.heroBackgrounds.about,
    "RS Group Advance Consulting",
  );
}

export function resolveFounderImage(page: WPPage | null): SiteImage {
  const fromContent = extractContentImages(page?.content?.rendered ?? "", {
    transparentOnly: true,
  }).find((url) => url.includes("Dr-Andrew-Peters"));

  return siteImage(
    fromContent ?? BRAND.transparent.founder,
    "Dr. Andrew Peters, Managing Director",
  );
}

export function resolveEditorialImages(
  galleryMedia: Array<{ source_url: string; alt_text: string }>,
): SiteImage[] {
  const fromGallery = galleryMedia
    .map((media) => media.source_url)
    .filter(isTransparentAsset);

  if (fromGallery.length >= 4) {
    return fromGallery.slice(0, 4).map((src, index) => ({
      src,
      alt: galleryMedia[index]?.alt_text || altFromUrl(src, "RS Group Advance Consulting"),
    }));
  }

  const assigned = assignUniqueImages(fromGallery, BRAND.transparent.editorial, 4);

  return assigned.map((src) =>
    siteImage(src, altFromUrl(src, "RS Group Advance Consulting")),
  );
}

export function resolveServicesHeroImage(page: WPPage | null): SiteImage {
  void page;
  return siteImage(BRAND.heroBackgrounds.services, "RS Group services");
}

export function resolveServiceBlockImages(page: WPPage | null): string[] {
  void page;
  return [
    BRAND.servicePageBlocks.strategicPlanning,
    BRAND.servicePageBlocks.leadershipDevelopment,
    BRAND.servicePageBlocks.teamBuilding,
    BRAND.servicePageBlocks.facilitation,
  ];
}

/** Images for homepage service tabs (pinned photos from live site). */
export function resolveHomeServiceTabImages(page: WPPage | null): string[] {
  void page;
  return [
    BRAND.serviceTabs.strategicPlanning,
    BRAND.serviceTabs.leadershipDevelopment,
    BRAND.serviceTabs.teamBuilding,
    BRAND.serviceTabs.facilitation,
  ];
}

export function resolveConnectCtaImage(): SiteImage {
  return siteImage(
    BRAND.transparent.connectCta,
    "Dr. Andrew Peters, Managing Director",
  );
}

export function resolveEditorialBackgroundImage(): SiteImage {
  return siteImage(
    BRAND.heroBackgrounds.editorial,
    "Collaborative workspace at RS Group Advance Consulting",
  );
}
