import type {
  ContactACF,
  HomeACF,
  ServicesACF,
  WPPage,
  WPServiceBlock,
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
    | "process_intro"
  >
> & {
  pillars: NonNullable<HomeACF["pillars"]>;
  services_preview: NonNullable<HomeACF["services_preview"]>;
  home_service_blocks: WPServiceBlock[];
  process_steps: NonNullable<HomeACF["process_steps"]>;
  gallery_image_ids: number[];
} {
  const acf = page?.acf ?? {};

  return {
    hero_eyebrow: acf.hero_eyebrow ?? "What We Do",
    hero_headline:
      acf.hero_headline ?? "IDENTIFYING NEEDS, DEVELOPING SOLUTIONS,",
    hero_headline_emphasis: acf.hero_headline_emphasis ?? "FACILITATING CHANGE.",
    hero_body:
      acf.hero_body ??
      "We support individuals, organizations, corporations, and Indigenous communities in the areas of: Education, Leadership, Strategic Planning, Advancement, and Development.",
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
      { title: "Empowerment", description: "Encourage & empower" },
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
    home_service_blocks: acf.home_service_blocks ?? [
      {
        title: "Strategic Planning",
        tagline: "Chart Your Course",
        body: "We help organizations create clear, effective strategies for sustainable growth. Through analysis, collaboration, and guided planning, we support teams in defining goals, improving processes, and building strong action plans for long-term success.",
        bullets: [
          "Define clear goals and achievable objectives",
          "Develop customized strategic plans tailored to your needs",
          "Facilitate workshops, interviews, and community forums",
          "Establish a strong vision, mission, and organizational direction",
          "Create short-, medium-, and long-term action plans",
          "Encourage collaboration while integrating community input",
        ],
      },
      {
        title: "Leadership Development",
        tagline: "Empower Positive Change",
        body: "We help organizations strengthen leadership skills through structured training and development programs designed to build confident and effective leaders.",
        bullets: [
          "Develop customized leadership development plans",
          "Engage staff, members, and community stakeholders",
          "Organize workshops, meetings, and leadership events",
          "Strengthen teamwork, communication, and decision-making",
          "Prepare participants to lead effectively within organizations and communities",
        ],
      },
      {
        title: "Team Building",
        tagline: "Develop Cohesive Teams",
        detailHref: "/services/team-building",
        body: "Team-building can often be considered one of the most important challenges in an organization's long term development and success, yet so many stakeholders express dissatisfaction, and even frustration with their past experiences in this regard. We believe the right facilitator can make all the difference in the world!",
        bullets: [
          "Foster the development of essential team and leadership skills, while maximizing participation",
          "Engage participants in the learning and development process, and equip them with essential knowledge and confidence in team environments",
          "Promote positive, healthy, active organizations, and creatively facilitate positive connections and relations",
        ],
      },
      {
        title: "Facilitation",
        tagline: "Efficiency, Accountability, Synergy",
        body: "We understand the critical role of facilitation in today\u2019s organizations. Our tailored workshops and processes help make strategic planning and restructuring sessions more effective and productive. Whether working with collaborative teams or challenging dynamics, we adapt to any situation, build consensus, and deliver successful outcomes.",
        bulletsLead: "There are a variety of definitions for a Facilitator:",
        quoteBullets: true,
        bullets: [
          "\u201cAn individual who enables departments to work more effectively; to collaborate and achieve efficiency, accountability, synergy\u201d - Doyle",
          "\u201cOne who contributes structure and process to interactions so groups are able to function effectively and deliver high-quality programs/services.\u201d - Bens",
        ],
      },
    ],
    process_intro:
      acf.process_intro ??
      "We work closely with organizations and communities to understand their needs, develop effective strategies, and implement practical solutions that strengthen leadership and teamwork.",
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
      heroSubtitle:
        acf.story_hero_subtitle ?? "About RS Group Advance Consulting",
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
  hero_subtitle: string;
  hero_body: string;
  service_blocks: NonNullable<ServicesACF["service_blocks"]>;
} {
  const acf = page?.acf ?? {};

  return {
    hero_subtitle:
      acf.hero_subtitle ??
      "Strategic Planning · Leadership · Team Building · Facilitation",
    hero_body:
      acf.hero_body ??
      "We are committed to working with our growing list of clients in devising innovative solutions that creatively address expressed and assessed need.",
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
        body: "An organization's strategy for sustainable growth involves evaluating its current environment, processes, procedures, and practices. This information helps guide strategic planning to improve operations and management. Implementing necessary changes increases accountability, enhances efficiency, and supports long-term success in achieving departmental and community goals.",
        bullets: [
          "Ensure that your strategic planning process is progressive, inclusive, efficient, and effective",
          "Help you establish goals and objectives for your process that are meaningful and achievable.",
          "Customize a process and plan to match your specific need, desire, & unique circumstances.",
          "Effectively lead interviews, community forums, sessions, activities, and workshops, while guiding progress with energy and skill.",
          "Guide your team through the process of establishing a clear vision, mission, & mandate, while making constructive recommendations in establishing a confident organizational structure.",
          "Accomplish strategic direction, while considering short, medium, & long range action plans.",
          "Maximize interdepartmental collaboration and support, while allowing for community input and maintaining administrative/management direction.",
        ],
      },
      {
        title: "Leadership Development",
        tagline: "Empower Positive Change",
        body: "Leadership is a powerful tool that can create competitive advantages. We believe that intentional training and development help strengthen leadership skills and should be part of every responsible organizational culture.",
        paragraphs: [
          "Working closely with designated authorities, our team develops a tailored leadership development plan that actively involves staff, members, and community stakeholders. Through a mix of meetings, special events, workshops, and community forums, we help build strong teams and prepare participants to lead effectively within the organization and the wider community.",
        ],
        bulletsLead: "There are a variety of definitions for leadership:",
        quoteBullets: true,
        bullets: [
          'Leadership is "organizing a group of people to achieve a common goal."',
          "Leadership is the \"process of social influence in which one person can enlist the aid and support of others in the accomplishment of a common task\".",
          '"Leadership is ultimately about creating a way for people to contribute to making something extraordinary happen." Alan Keith',
          '"Effective leadership is the ability to successfully integrate and maximize available resources within the internal and external environment for the attainment of organizational or societal goals." Ken Ogbonnia',
        ],
      },
      {
        title: "Team Building",
        tagline: "Develop Cohesive Teams",
        detailHref: "/services/team-building",
        body: "Team-building is essential for an organization's long-term development and success, yet many stakeholders feel dissatisfied with past experiences. We believe the right facilitator can make all the difference.",
        paragraphs: [
          "Our team-building activities promote positive and active organizations while strengthening leadership and soft skills. Participants are encouraged to build strong connections and collaborate effectively. Through this program, individuals support their personal and professional growth and can immediately apply what they learn within the organization and beyond.",
        ],
        bulletsLead:
          "Our creative collection of Team-building activities and challenges will:",
        bullets: [
          "Foster the development of essential team and leadership skills, while maximizing participation",
          "Engage participants in the learning and development process, and equip them with essential knowledge and confidence in team environments",
          "Promote positive, healthy, active organizations, and creatively facilitate positive connections and relations",
          "Maximize leadership development skills and competencies",
          "Provide guidance, assistance, and assurance to participants, in the process of building community and capacity.",
        ],
      },
      {
        title: "Facilitation",
        tagline: "Efficiency, Accountability, Synergy",
        body: "We understand the essential role of a facilitator in today's world, and can provide your group with the highest quality process and experience that promises to help make your strategic planning and corporate restructuring sessions as effective and productive as possible. Whether it is a cohesive and cooperative group, or a reluctant and dysfunctional team, we have identified effective workshops, activities, & processes for virtually every scenario, and can adapt our programs to any circumstances, while building consensus and successfully accomplishing the task at hand.",
        bulletsLead: "There are a variety of definitions for a Facilitator:",
        quoteBullets: true,
        bullets: [
          '"An individual who enables departments to work more effectively; to collaborate and achieve efficiency, accountability, synergy" - Doyle',
          '"One who contributes structure and process to interactions so groups are able to function effectively and deliver high-quality programs/services." - Bens',
          "\"The facilitator's job is to support everyone to do their best thinking and practice. To do this, the facilitator encourages full participation, promotes mutual understanding and cultivates shared responsibility.",
          "By supporting everyone to do their best thinking, a facilitator enables group members to search for inclusive solutions and build sustainable skills and programs\" - Kaner",
        ],
      },
    ],
  };
}

export function resolveContactContent(page: WPPage | null): Required<
  Pick<ContactACF, "headline" | "phone" | "email" | "address">
> & {
  hero_subtitle: string;
  hero_body: string;
  social_links: NonNullable<ContactACF["social_links"]>;
} {
  const acf = page?.acf ?? {};

  return {
    headline: acf.headline ?? "We'd Love to Hear From You!",
    hero_subtitle: acf.hero_subtitle ?? "Reach Out to Our Team",
    hero_body:
      acf.hero_body ??
      "Whether you're looking to strengthen your leadership, align your team, or develop a strategic plan—we're here to help. Reach out and let's start the conversation.",
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
