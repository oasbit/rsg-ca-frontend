export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
  };
}

export interface WPPillar {
  title: string;
  description: string;
}

export interface WPServicePreview {
  title: string;
  tagline: string;
  slug?: string;
}

export interface WPProcessStep {
  title: string;
  description: string;
}

export interface WPServiceBlock {
  title: string;
  tagline: string;
  body: string;
  bullets: string[];
  image_id?: number;
}

export interface WPApproachBlock {
  title: string;
  body: string;
  bullets?: string[];
  closing?: string;
}

export interface WPSocialLink {
  platform: string;
  url: string;
}

export interface HomeACF {
  hero_eyebrow?: string;
  hero_headline?: string;
  hero_headline_emphasis?: string;
  hero_body?: string;
  editorial_headline?: string;
  editorial_body?: string;
  about_teaser_title?: string;
  about_teaser_body?: string;
  pillars?: WPPillar[];
  services_preview?: WPServicePreview[];
  process_steps?: WPProcessStep[];
  cta_title?: string;
  cta_body?: string;
  gallery_image_ids?: number[];
}

export interface AboutACF {
  story_eyebrow?: string;
  story_headline?: string;
  story_body?: string;
  story_paragraphs?: string[];
  who_we_are_eyebrow?: string;
  who_we_are_headline?: string;
  who_we_are_paragraphs?: string[];
  founder_name?: string;
  founder_title?: string;
  founder_bio?: string;
  founder_bio_paragraphs?: string[];
  community_headline_lead?: string;
  community_headline_emphasis?: string;
  approach_blocks?: WPApproachBlock[];
  approach_bullets?: string[];
  approach_closing?: string;
  focus_bullets?: string[];
  focus_closing?: string;
  vision?: string;
  team?: string;
  team_paragraphs?: string[];
}

export interface ServicesACF {
  intro?: string;
  quote?: string;
  quote_author?: string;
  quote_role?: string;
  service_blocks?: WPServiceBlock[];
}

export interface ContactACF {
  headline?: string;
  phone?: string;
  email?: string;
  address?: string;
  social_links?: WPSocialLink[];
}

export interface PrivacyACF {
  body?: string;
}

export type PageACF = HomeACF &
  AboutACF &
  ServicesACF &
  ContactACF &
  PrivacyACF;

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  acf?: PageACF;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
}

export interface NavItem {
  label: string;
  href: string;
}
