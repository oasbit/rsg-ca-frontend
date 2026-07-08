import { stripHtml } from "@/lib/utils";
import type {
  AboutACF,
  ContactACF,
  HomeACF,
  ServicesACF,
  WPPage,
} from "@/lib/wordpress/types";

export function resolveHomeContent(page: WPPage | null): Required<
  Pick<
    HomeACF,
    | "hero_eyebrow"
    | "hero_headline"
    | "hero_headline_emphasis"
    | "hero_body"
    | "editorial_headline"
    | "editorial_body"
    | "about_teaser_title"
    | "about_teaser_body"
    | "cta_title"
    | "cta_body"
  >
> & {
  pillars: NonNullable<HomeACF["pillars"]>;
  services_preview: NonNullable<HomeACF["services_preview"]>;
  process_steps: NonNullable<HomeACF["process_steps"]>;
  gallery_image_ids: number[];
} {
  const acf = page?.acf ?? {};

  return {
    hero_eyebrow: acf.hero_eyebrow ?? "What We Do",
    hero_headline:
      acf.hero_headline ?? "IDENTIFYING NEEDS, DEVELOPING SOLUTIONS,",
    hero_headline_emphasis: acf.hero_headline_emphasis ?? "FACILITATING CHANGE",
    hero_body:
      acf.hero_body ??
      (stripHtml(page?.excerpt?.rendered ?? "") ||
        "We support individuals, organizations, corporations, and Indigenous communities in the areas of education, leadership, strategic planning, advancement, and development."),
    editorial_headline:
      acf.editorial_headline ??
      "Connected and Collaborative Organizations and Communities",
    editorial_body:
      acf.editorial_body ??
      "We support organizations and communities through strategic planning, leadership development, and team-building programs designed for sustainable growth.",
    about_teaser_title: acf.about_teaser_title ?? "Who We Are",
    about_teaser_body:
      acf.about_teaser_body ??
      "We work with organizations, teams, and community leaders to strengthen strategy, leadership, and collaboration. Through customized planning, training programs, and workshops, we help organizations achieve meaningful and sustainable results.",
    cta_title: acf.cta_title ?? "Connect with Dr. Andrew Peters",
    cta_body:
      acf.cta_body ??
      "Start a conversation about strengthening your team, leadership, and organizational performance.",
    pillars: acf.pillars ?? [
      { title: "Leadership", description: "Leadership development" },
      { title: "Empowerment", description: "Encourage and empower" },
      { title: "Awareness", description: "Develop social awareness" },
      { title: "Development", description: "Develop capacity and growth" },
    ],
    services_preview: acf.services_preview ?? [
      {
        title: "Strategic Planning",
        tagline: "Chart Your Course",
        slug: "strategic-planning",
      },
      {
        title: "Leadership Development",
        tagline: "Empower Positive Change",
        slug: "leadership",
      },
      {
        title: "Team Building",
        tagline: "Develop Cohesive Teams",
        slug: "team-building",
      },
      {
        title: "Facilitation",
        tagline: "Efficiency, Accountability, Synergy",
        slug: "facilitation",
      },
    ],
    process_steps: acf.process_steps ?? [
      {
        title: "Assess",
        description:
          "Understand your organization's needs, challenges, and goals.",
      },
      {
        title: "Plan",
        description:
          "Develop a tailored strategy aligned with your vision and objectives.",
      },
      {
        title: "Implement",
        description:
          "Deliver workshops, training, and facilitation to support your team.",
      },
      {
        title: "Support",
        description:
          "Provide ongoing guidance to ensure sustainable results.",
      },
    ],
    gallery_image_ids: acf.gallery_image_ids ?? [],
  };
}

export function resolveAboutContent(page: WPPage | null): Required<
  Pick<
    AboutACF,
    | "story_eyebrow"
    | "story_headline"
    | "story_body"
    | "founder_name"
    | "founder_title"
    | "founder_bio"
    | "vision"
    | "team"
  >
> & {
  approach_blocks: NonNullable<AboutACF["approach_blocks"]>;
} {
  const acf = page?.acf ?? {};

  return {
    story_eyebrow: acf.story_eyebrow ?? "Our Story",
    story_headline:
      acf.story_headline ?? "Building Strong Organizations and Communities",
    story_body:
      acf.story_body ??
      (stripHtml(page?.excerpt?.rendered ?? "") ||
        "RS Advanced Group Consulting was founded on a simple principle: the same strategies that build strong individuals and communities can transform organizations."),
    founder_name: acf.founder_name ?? "Dr. Andrew Peters, BA, MA, PhD",
    founder_title: acf.founder_title ?? "Managing Director",
    founder_bio:
      acf.founder_bio ??
      "Dr. Andrew Peters is an executive advisor, educator, and founder with over two decades of experience in leadership, performance, and team development.",
    vision:
      acf.vision ??
      "To be a trusted partner for organizations seeking to elevate performance through stronger leadership, aligned teams, and a high-impact culture.",
    team:
      acf.team ??
      "Our team is made up of experienced leaders, educators, and facilitators with backgrounds in high-performance coaching, organizational development, and community leadership.",
    approach_blocks: acf.approach_blocks ?? [
      {
        title: "Our Approach",
        body: "We bring proven leadership and development strategies from community-based success into the corporate environment—where performance, alignment, and culture matter most.",
      },
      {
        title: "Our Focus Areas",
        body: "Leadership development, team alignment, employee engagement, DEI, and workplace communication—designed to improve how teams operate and organizations grow.",
      },
    ],
  };
}

export function resolveServicesContent(page: WPPage | null): Required<
  Pick<ServicesACF, "intro" | "quote" | "quote_author" | "quote_role">
> & {
  service_blocks: NonNullable<ServicesACF["service_blocks"]>;
} {
  const acf = page?.acf ?? {};

  return {
    intro:
      acf.intro ??
      "We are committed to working with our growing list of clients in devising innovative solutions that creatively address expressed and assessed need.",
    quote:
      acf.quote ??
      "We are committed to working with our growing list of clients in devising innovative solutions that creatively address expressed and/or assessed need.",
    quote_author: acf.quote_author ?? "Dr. Andrew Peters",
    quote_role: acf.quote_role ?? "Managing Director",
    service_blocks: acf.service_blocks ?? [
      {
        title: "Strategic Planning",
        tagline: "Chart Your Course",
        body: "An organization's strategy for sustainable growth involves evaluating its current environment, processes, procedures, and practices.",
        bullets: [
          "Define clear goals and achievable objectives",
          "Develop customized strategic plans tailored to your needs",
          "Facilitate workshops, interviews, and community forums",
          "Establish a strong vision, mission, and organizational direction",
        ],
      },
      {
        title: "Leadership Development",
        tagline: "Empower Positive Change",
        body: "Leadership is a powerful tool that can create competitive advantages through intentional training and development.",
        bullets: [
          "Develop customized leadership development plans",
          "Engage staff, members, and community stakeholders",
          "Organize workshops, meetings, and leadership events",
          "Prepare participants to lead effectively",
        ],
      },
      {
        title: "Team Building",
        tagline: "Develop Cohesive Teams",
        body: "Team-building is essential for long-term development and success. The right facilitator can make all the difference.",
        bullets: [
          "Foster essential team and leadership skills",
          "Engage participants in the learning process",
          "Promote positive, healthy, active organizations",
          "Maximize leadership development competencies",
        ],
      },
      {
        title: "Facilitation",
        tagline: "Efficiency, Accountability, Synergy",
        body: "We provide high-quality facilitation for strategic planning and corporate restructuring sessions.",
        bullets: [
          "Adapt programs to any circumstances",
          "Build consensus across teams",
          "Guide progress with energy and skill",
          "Deliver successful outcomes",
        ],
      },
    ],
  };
}

export function resolveContactContent(page: WPPage | null): Required<
  Pick<ContactACF, "headline" | "phone" | "email" | "address">
> & {
  social_links: NonNullable<ContactACF["social_links"]>;
} {
  const acf = page?.acf ?? {};

  return {
    headline: acf.headline ?? "We'd Love to Hear From You",
    phone: acf.phone ?? "+1 905 518 7522",
    email: acf.email ?? "info@rsg-ac.ca",
    address:
      acf.address ?? "Dominate the Plate, 92 Grand St., Brantford, ON",
    social_links: acf.social_links ?? [],
  };
}

export function resolvePrivacyContent(page: WPPage | null): {
  title: string;
  body: string;
} {
  const acf = page?.acf ?? {};

  return {
    title: page?.title?.rendered?.replace(/<[^>]*>/g, "") ?? "Privacy Policy",
    body: acf.body ?? page?.content?.rendered ?? "",
  };
}
