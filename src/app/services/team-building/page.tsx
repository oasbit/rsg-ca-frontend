import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LineCta } from "@/components/ui/LineCta";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";
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
    image: BRAND.teamBuilding.outdoor,
    imageAlt: "Corporate team outdoor leadership activity",
  },
  {
    title: "Holistic Activities",
    subtitle: "Focus on the whole person",
    body: "Our unique approach to leadership development engages the whole person, while providing meaningful experiences to prepare them for successful leadership both within and beyond the primary work environment.",
    image: BRAND.teamBuilding.workshop,
    imageAlt: "Team workshop and collaboration session",
  },
  {
    title: "Global Leadership",
    subtitle: "Local virtues",
    body: "Participants experience a meaningful and relevant approach to leadership. The support and participation of organizational leadership ensures that locally valued virtues and skills are fully integrated into the program.",
    image: BRAND.teamBuilding.coaching,
    imageAlt: "One-on-one executive coaching session",
  },
  {
    title: "Employability Skills",
    subtitle: "Workplace prep",
    body: "This leadership and team-building initiative directly addresses and reinforces the development of interpersonal, personal and group management, and critical-thinking skills.",
    image: BRAND.teamBuilding.keynote,
    imageAlt: "Corporate leadership keynote presentation",
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
      <SectionTransition className="border-y border-white/10 bg-black py-8 text-white">
        <RevealStagger
          className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 lg:px-10"
          stagger={0.07}
        >
          {PROGRAM_VALUES.map((value) => (
            <RevealStaggerItem key={value}>
              <span className="text-xs font-light tracking-[0.35em] text-white/70 uppercase">
                {value}
              </span>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </SectionTransition>

      {/* What we do — split layout with workshop image */}
      <SectionTransition className="bg-surface py-24 text-white lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:gap-0 lg:px-10">
          {/* Left: headline + quote */}
          <div className="lg:col-span-5 lg:pr-12">
            <Reveal variant="fadeUp">
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
            </Reveal>

            <Reveal variant="fadeUp" delay={0.12}>
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
          </div>

          {/* Right: program offerings + workshop image */}
          <div className="lg:col-span-7 lg:pl-10">
            <RevealStagger stagger={0.07}>
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

            {/* Workshop image */}
            <Reveal variant="fadeIn" delay={0.16} className="mt-10">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-72">
                <Image
                  src={BRAND.teamBuilding.workshop}
                  alt="Corporate team workshop and collaboration session"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </SectionTransition>

      {/* Keynote / Action — full-bleed cinematic section */}
      <SectionTransition className="relative overflow-hidden bg-black py-0 text-white">
        <div className="relative h-[55vh] min-h-[380px] w-full overflow-hidden lg:h-[65vh]">
          <Image
            src={BRAND.teamBuilding.keynote}
            alt="Corporate leadership keynote presentation"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"
          />

          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-14 lg:px-10 lg:pb-20">
              <Reveal variant="fadeUp">
                <SectionLabel light>Interactive &amp; Engaging Development</SectionLabel>
                <h2 className="mt-3 font-display text-3xl italic text-accent md:text-4xl lg:text-5xl">
                  Not Just Another Leadership Initiative
                </h2>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Body copy below the image */}
        <GrainOverlay />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
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
      </SectionTransition>

      {/* Why choose us — image cards */}
      <SectionTransition className="bg-surface py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal variant="fadeUp" className="max-w-2xl">
            <SectionLabel light>Why Choose Us</SectionLabel>
            <h2 className="mt-4 font-display text-3xl italic text-accent md:text-4xl lg:text-5xl">
              A Program Built for Real Impact
            </h2>
          </Reveal>

          <RevealStagger
            className="mt-14 grid gap-6 sm:grid-cols-2"
            stagger={0.08}
          >
            {WHY_US.map((item, index) => (
              <RevealStaggerItem key={item.title}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10">
                  {/* Card image */}
                  <div className="relative h-52 w-full overflow-hidden sm:h-56">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
                    />
                    <span className="absolute top-5 left-5 font-display text-2xl text-accent/70 italic">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col bg-black/40 p-7">
                    <h3 className="text-sm tracking-[0.14em] text-white uppercase">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs tracking-[0.12em] text-accent uppercase">
                      {item.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-white/75">
                      {item.body}
                    </p>
                  </div>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>
      </SectionTransition>

      {/* CTA — outdoor team image */}
      <SectionTransition className="relative overflow-hidden bg-black py-24 text-white lg:py-32">
        <Image
          src={BRAND.teamBuilding.outdoor}
          alt=""
          fill
          className="object-cover object-center opacity-15"
          sizes="100vw"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"
        />
        <GrainOverlay />

        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Reveal variant="fadeUp">
            <SectionLabel light className="justify-center">
              Get Started
            </SectionLabel>
            <h2 className="mt-4 font-display text-3xl italic text-accent md:text-4xl lg:text-5xl">
              Ready to Build a Stronger Team?
            </h2>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/75 md:text-base">
              Let&apos;s design a leadership and team-building program tailored
              to your organization&apos;s unique goals, culture, and community.
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <LineCta href="/contact" light>
                Start a conversation
              </LineCta>
              <LineCta href="/services" light className="text-white/55 hover:text-accent">
                Explore all services
              </LineCta>
            </div>
          </Reveal>
        </div>
      </SectionTransition>
    </>
  );
}
