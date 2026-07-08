import { stripHtml } from "@/lib/utils";
import type {
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

export function resolveAboutContent(page: WPPage | null) {
  const acf = page?.acf ?? {};

  const storyParagraphs = acf.story_paragraphs ?? [
    "RS Advanced Group Consulting was founded on a simple principle: the same strategies that build strong individuals and communities can transform organizations.",
    "With over 25 years of proven impact through leadership development and community programming, we bring tested, real-world frameworks into the corporate environment—helping organizations strengthen culture, align teams, and drive sustainable performance.",
  ];

  const whoWeAreParagraphs = acf.who_we_are_paragraphs ?? [
    "RS Advanced Group Consulting partners with organizations, institutions, and leadership teams to unlock growth through people.",
    "Our approach is rooted in decades of experience in community engagement, leadership development, and high-performance coaching. What sets us apart is our ability to translate these proven methods into practical, scalable strategies for businesses.",
    "Originating from the success of Rising Stars Athletics & Education, our foundation is built on delivering measurable impact—developing leaders, strengthening teams, and creating environments where individuals and organizations thrive.",
    "We don't just advise—we implement, guide, and elevate.",
  ];

  const founderBioParagraphs = acf.founder_bio_paragraphs ?? [
    "Dr. Andrew Peters is an executive advisor, educator, and founder with over two decades of experience in leadership, performance, and team development.",
    "As the driving force behind Rising Stars and RS Advanced Group Consulting, Dr. Peters has built a reputation for transforming teams and organizations by strengthening culture, improving accountability, and elevating performance.",
    "Holding a Ph.D. in Education and a background in high-level athletics, he brings a unique blend of academic insight and real-world execution. His methodology is rooted in high-performance principles—focusing on leadership alignment, team cohesion, and sustainable growth.",
    "Today, Dr. Peters works with organizations across industries, helping them implement proven systems that increase engagement, boost morale, and drive measurable results.",
  ];

  const approachBullets = acf.approach_bullets ?? [
    "Deeply understanding your organization's structure, culture, and challenges",
    "Designing tailored strategies aligned with your business goals",
    "Delivering high-impact workshops, leadership training, and team development sessions",
    "Embedding systems that drive accountability, engagement, and measurable performance",
  ];

  const focusBullets = acf.focus_bullets ?? [
    "Leadership Development & Executive Coaching",
    "Team Alignment & Culture Building",
    "Employee Engagement & Retention",
    "Diversity, Equity & Inclusion (DEI)",
    "Workplace Communication & Collaboration",
  ];

  const teamParagraphs = acf.team_paragraphs ?? [
    "Our team is made up of experienced leaders, educators, and facilitators with backgrounds in high-performance coaching, organizational development, and community leadership.",
    "What unites us is a shared commitment to one outcome: helping organizations unlock the full potential of their people.",
  ];

  return {
    story: {
      eyebrow: acf.story_eyebrow ?? "Our Story",
      headline: acf.story_headline ?? "Building Strong Organizations and Communities",
      paragraphs: storyParagraphs,
      body:
        acf.story_body ??
        storyParagraphs.join(" "),
    },
    whoWeAre: {
      eyebrow: acf.who_we_are_eyebrow ?? "Introduction",
      headline: acf.who_we_are_headline ?? "Who We Are",
      paragraphs: whoWeAreParagraphs,
    },
    founder: {
      name: acf.founder_name ?? "Dr. Andrew Peters, BA, MA, PhD",
      title: acf.founder_title ?? "Managing Director",
      paragraphs: founderBioParagraphs,
      bio: acf.founder_bio ?? founderBioParagraphs.join(" "),
    },
    communityJourney: {
      headlineLead: acf.community_headline_lead ?? "From Community Experience",
      headlineEmphasis: acf.community_headline_emphasis ?? "to Strategic Impact",
    },
    approach: {
      title: acf.approach_blocks?.[0]?.title ?? "Our Approach",
      intro:
        acf.approach_blocks?.[0]?.body ??
        "We bring proven leadership and development strategies from community-based success into the corporate environment—where performance, alignment, and culture matter most.",
      executionLead: "Our approach is built on execution, not theory:",
      bullets: approachBullets,
      closing:
        acf.approach_closing ??
        acf.approach_blocks?.[0]?.closing ??
        "We work alongside your team—not just as consultants, but as partners—ensuring every initiative is practical, scalable, and results-driven.",
    },
    focusAreas: {
      title: acf.approach_blocks?.[1]?.title ?? "Our Focus Areas",
      intro:
        acf.approach_blocks?.[1]?.body ??
        "We help organizations strengthen the core drivers of performance:",
      bullets: focusBullets,
      closing:
        acf.focus_closing ??
        acf.approach_blocks?.[1]?.closing ??
        "Our strategies are designed to improve how teams operate, how leaders lead, and how organizations grow.",
    },
    vision: {
      title: "Our Vision",
      body:
        acf.vision ??
        "To be a trusted partner for organizations seeking to elevate performance through stronger leadership, aligned teams, and a high-impact culture.",
    },
    team: {
      title: "Our Team",
      paragraphs: teamParagraphs,
      body: acf.team ?? teamParagraphs.join(" "),
    },
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
