import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { buildPageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/wordpress/images";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Team Building",
    description:
      "Interactive leadership development, engaging team-building workshops, and motivational keynotes that build strong, cohesive teams and effective leaders.",
    path: "/services/team-building",
  });
}

const PROGRAM_VALUES = ["Inspiration", "Development", "Influence", "Action"];

const WHAT_WE_DO = [
  "Interactive leadership development",
  "Engaging team-building activities, workshops, and conferences",
  "Inspirational and motivational keynote presentations",
  "Staff, student, and community-based programs",
];

const WHY_US = [
  {
    title: "Experiential Learning",
    subtitle: "Activity-based approach",
    body: "Our activity-based approach encourages participants to interact with others. Motivational and inspirational activities develop confidence, foster trust, and provide unique opportunities for learning.",
  },
  {
    title: "Holistic Activities",
    subtitle: "Focus on the whole person",
    body: "Our unique approach to leadership development engages the whole person, while providing meaningful experiences to prepare them for successful leadership both within and beyond the primary work environment.",
  },
  {
    title: "Global Leadership",
    subtitle: "Local virtues",
    body: "Participants experience a meaningful and relevant approach to leadership. The support and participation of organizational leadership ensures that locally valued virtues and skills are fully integrated into the program.",
  },
  {
    title: "Employability Skills",
    subtitle: "Workplace prep",
    body: "This leadership and team-building initiative directly addresses and reinforces the development of interpersonal, personal and group management, and critical-thinking skills.",
  },
];

export default function TeamBuildingPage() {
  return (
    <>
      <PageHero
        eyebrow="Team Building"
        headline="Leadership & Team Building Workshops & Events"
        headlineEmphasis="Develop Cohesive Teams"
        bodyParagraphs={[
          "Team-oriented departments are the glue that holds organizations, operations, and communities together. Our interactive workshops build strong teams and prepare participants to lead effectively at every organizational level.",
        ]}
        imageUrl={BRAND.teamBuilding.hero}
        imageAlt="RS Group Advance Consulting team-building session"
        cta={{ href: "/contact", label: "Start a conversation" }}
      />

      {/* Program values band */}
      <section className="border-y border-white/10 bg-black py-8 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 lg:px-10">
          {PROGRAM_VALUES.map((value) => (
            <span
              key={value}
              className="text-xs font-light tracking-[0.35em] text-white/70 uppercase"
            >
              {value}
            </span>
          ))}
        </div>
      </section>

      {/* What we do + Discover your inner leader */}
      <section className="bg-surface py-24 text-white lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
          <Reveal variant="fadeUp" className="lg:col-span-5">
            <SectionLabel light>What We Do</SectionLabel>
            <h2 className="mt-4 font-display text-3xl italic text-accent md:text-4xl lg:text-5xl">
              Discover Your Inner Leader
            </h2>
            <p className="mt-6 text-sm leading-8 text-white/80 md:text-base">
              We believe that leadership can be learned—and that experience is
              the best teacher. Our motivational and inspirational leadership
              development program is progressive and designed with interactive,
              engaging activities.
            </p>
            <blockquote className="mt-8 border-l border-accent/50 pl-6">
              <p className="font-display text-lg leading-relaxed text-white/90 italic md:text-xl">
                &ldquo;Leadership is so much more than holding a position in a
                school, community, or organization. Leadership is working well
                with other people to make a positive difference in the world
                around you.&rdquo;
              </p>
              <cite className="mt-4 block text-xs tracking-[0.22em] text-muted uppercase not-italic">
                Dr. Andrew Peters — Principal Facilitator
              </cite>
            </blockquote>
          </Reveal>

          <RevealStagger className="lg:col-span-7 lg:pl-8" stagger={0.08}>
            <RevealStaggerItem>
              <p className="text-sm font-medium tracking-[0.06em] text-white/90 md:text-base">
                Our programs combine four core offerings:
              </p>
            </RevealStaggerItem>
            <ul className="mt-8 space-y-6">
              {WHAT_WE_DO.map((item, index) => (
                <RevealStaggerItem key={item}>
                  <li className="flex items-start gap-5 border-b border-white/10 pb-6">
                    <span className="font-display text-2xl text-accent/70 italic">
                      0{index + 1}
                    </span>
                    <span className="pt-1 text-sm leading-7 text-white/85 md:text-base">
                      {item}
                    </span>
                  </li>
                </RevealStaggerItem>
              ))}
            </ul>
          </RevealStagger>
        </div>
      </section>

      {/* Interactive & engaging development */}
      <section className="relative overflow-hidden bg-black py-24 text-white lg:py-32">
        <Image
          src={BRAND.teamBuilding.action}
          alt=""
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black"
        />
        <GrainOverlay />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal variant="fadeUp" className="max-w-2xl">
            <SectionLabel light>Interactive &amp; Engaging Development</SectionLabel>
            <h2 className="mt-4 font-display text-3xl italic text-accent md:text-4xl lg:text-5xl">
              Not Just Another Leadership Initiative
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="fadeUp">
              <p className="text-sm leading-8 text-white/80 md:text-base">
                Through continual effort, clear mandates, and special
                initiatives, staff are able to work, learn, and grow in
                positive, healthy, and productive environments. Too often,
                organizations do not take the necessary time from demanding
                schedules for team-building and the development of leadership
                capacity. Our collection of interactive workshops is designed to
                build strong teams and prepare participants for the variety of
                opportunities to lead effectively.
              </p>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.1}>
              <h3 className="text-sm font-medium tracking-[0.08em] text-white uppercase">
                How does the program work?
              </h3>
              <p className="mt-5 text-sm leading-8 text-white/80 md:text-base">
                With the goal of supporting sustainable organizational growth,
                inspiring positive team environments, and encouraging effective
                leadership, our team plans, organizes, and delivers a carefully
                crafted combination of awareness and empowerment activities and
                challenges. As participants complete each progressive activity,
                they refine the essential skills, tools, and techniques required
                to build cohesive teams through effective leadership.
              </p>
              <p className="mt-6 text-xs leading-6 text-muted italic">
                * We work with our community partners in devising unique programs
                to meet expressed or assessed need.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-surface py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal variant="fadeUp" className="max-w-2xl">
            <SectionLabel light>Why Choose Us</SectionLabel>
            <h2 className="mt-4 font-display text-3xl italic text-accent md:text-4xl lg:text-5xl">
              A Program Built for Real Impact
            </h2>
          </Reveal>

          <RevealStagger
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.08}
          >
            {WHY_US.map((item, index) => (
              <RevealStaggerItem key={item.title}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-black/30 p-7">
                  <span className="font-display text-3xl text-accent/60 italic">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-sm tracking-[0.14em] text-white uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs tracking-[0.12em] text-accent uppercase">
                    {item.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/75">
                    {item.body}
                  </p>
                </div>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </section>
    </>
  );
}
