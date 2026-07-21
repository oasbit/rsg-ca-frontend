import Image from "next/image";
import { ListCheckMark } from "@/components/icons/ListCheckMark";
import { ListCrossMark } from "@/components/icons/ListCrossMark";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LineCta } from "@/components/ui/LineCta";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { buildPageMetadata } from "@/lib/seo";
import { BRAND } from "@/lib/wordpress/images";
import { ValuesBand } from "@/components/ui/ValuesBand";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Team Building",
    description:
      "Engaging team-building workshops, interactive group activities, and motivational keynotes that build strong, cohesive teams—and develop effective leaders.",
    path: "/services/team-building",
  });
}

const WHAT_WE_DO = [
  "Engaging team-building activities, workshops, and conferences",
  "Interactive group development and collaboration exercises",
  "Inspirational and motivational keynote presentations",
  "Staff, student, and community-based programs",
];

const WHY_US = [
  {
    title: "Experiential Learning",
    subtitle: "Activity-based approach",
    body: "Our activity-based approach encourages participants to interact with others. Motivational and inspirational activities develop confidence, foster trust, and provide unique opportunities for teams to learn together.",
    image: BRAND.teamBuilding.outdoor,
    imageAlt: "Corporate team outdoor team-building activity",
  },
  {
    title: "Holistic Activities",
    subtitle: "Focus on the whole team",
    body: "Our unique approach to team building engages the whole person, while providing meaningful experiences that strengthen collaboration, communication, and shared accountability across the group.",
    image: BRAND.teamBuilding.workshop,
    imageAlt: "Team workshop and collaboration session",
  },
  {
    title: "Connected Teams",
    subtitle: "Built on shared values",
    body: "Participants experience a meaningful and relevant approach to working together. The support and participation of organizational leaders ensures that locally valued virtues and skills are fully integrated into every program.",
    image: BRAND.teamBuilding.coaching,
    imageAlt: "Team coaching and collaboration session",
  },
  {
    title: "Employability Skills",
    subtitle: "Workplace prep",
    body: "This team-building initiative directly addresses and reinforces the development of interpersonal, personal and group management, and critical-thinking skills—while preparing participants to lead when the moment calls for it.",
    image: BRAND.teamBuilding.keynote,
    imageAlt: "Corporate team-building keynote presentation",
  },
];

export default function TeamBuildingPage() {
  return (
    <>
      <PageHero
        eyebrow="Team Building"
        headline="Team Building & Leadership Workshops & Events"
        headlineEmphasis="Develop Cohesive Teams"
        bodyParagraphs={[
          "Team-oriented departments are the glue that holds organizations, operations, and communities together. Our interactive workshops strengthen collaboration, trust, and communication—while preparing participants to lead effectively at every organizational level.",
        ]}
        imageUrl={BRAND.teamBuilding.hero}
        imageAlt="RS Group Advance Consulting team-building session"
        cta={{ href: "/contact", label: "Start a conversation" }}
      />

      <ValuesBand />

      {/* What we do — split layout with workshop image */}
      <SectionTransition className="bg-surface py-10 text-white sm:py-14 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:gap-10 lg:grid-cols-12 lg:gap-0 lg:px-10">
          {/* Left: headline + quote */}
          <div className="lg:col-span-5 lg:pr-12">
            <Reveal variant="fadeUp">
              <SectionLabel light>What We Do</SectionLabel>
              <h2 className="mt-3 font-display text-2xl text-accent sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
                Build Teams That Work Together
              </h2>
              <p className="mt-6 text-sm leading-8 text-white/80 md:text-base">
                We believe strong teams are built through shared experience—and
                that collaboration is the best teacher. Our motivational and
                inspirational team-building program is progressive and designed
                with interactive, engaging activities that bring people together
                and develop leadership naturally along the way.
              </p>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.12}>
              <blockquote className="mt-6 border-l border-accent/50 pl-4 sm:mt-8 sm:pl-6">
                <p className="font-display text-lg leading-relaxed text-white/90 md:text-xl">
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
              <ul className="mt-6 space-y-4 sm:mt-8 sm:space-y-6">
                {WHAT_WE_DO.map((item, index) => (
                  <RevealStaggerItem key={item}>
                    <li className="flex items-start gap-4 border-b border-white/10 pb-4 sm:gap-5 sm:pb-6">
                      <span className="font-display text-2xl text-accent/70">
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
            <Reveal variant="fadeIn" delay={0.16} className="mt-6 sm:mt-10">
              <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10 sm:h-64 md:h-72">
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
        <div className="relative h-[42vh] min-h-[240px] w-full overflow-hidden sm:min-h-[300px] lg:h-[65vh] lg:min-h-[380px]">
          <Image
            src={BRAND.teamBuilding.keynote}
            alt="Corporate team-building keynote presentation"
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
            <div className="mx-auto w-full max-w-7xl px-6 pb-5 sm:pb-6 lg:px-10 lg:pb-8">
              <Reveal variant="fadeUp">
                <SectionLabel light>Interactive &amp; Engaging Development</SectionLabel>
                <h2 className="mt-2 font-display text-2xl text-accent sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl">
                  Not Just Another Team-Building Exercise
                </h2>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Lead + matching tiles */}
        <GrainOverlay />
        <div className="relative mx-auto max-w-7xl px-6 pt-4 pb-10 sm:pt-5 sm:pb-12 lg:px-10 lg:pt-6 lg:pb-20">
          <Reveal variant="fadeUp">
            <p className="max-w-3xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8 md:text-lg">
              Our collection of interactive workshops is designed to build
              strong, connected teams and prepare participants for the variety
              of opportunities that come with working together effectively.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
            <Reveal variant="fadeUp" className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-5 sm:p-7 lg:p-8">
                <h3 className="text-sm font-medium tracking-[0.08em] text-white uppercase">
                  Leadership &amp; Team-Building — The Competitive Advantage
                </h3>

                <ul className="mt-6 space-y-5 sm:mt-7 sm:space-y-6">
                  <li className="flex gap-3 sm:gap-4">
                    <ListCheckMark className="mt-1.5" />
                    <p className="text-sm leading-7 text-white/85 md:text-base md:leading-8">
                      Creating positive and supportive workplace environments and
                      developing leadership and interpersonal skills at the
                      corporate and organizational levels allows staff to work,
                      learn, and grow within productive and supportive
                      environments.
                    </p>
                  </li>
                  <li className="flex gap-3 border-t border-white/10 pt-5 sm:gap-4 sm:pt-6">
                    <ListCrossMark className="mt-1.5" />
                    <p className="text-sm leading-7 text-white/65 md:text-base md:leading-8">
                      All too often, organizations do not take the necessary time
                      from demanding schedules for team-building and collaborative
                      activities focused on the development of leadership skills.
                    </p>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal variant="fadeUp" delay={0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-5 sm:p-7 lg:p-8">
                <h3 className="text-sm font-medium tracking-[0.08em] text-white uppercase">
                  How does the program work?
                </h3>
                <p className="mt-6 text-sm leading-7 text-white/85 sm:mt-7 md:text-base md:leading-8">
                  With the goal of supporting sustainable organizational change,
                  creating positive team environments, and strengthening leadership
                  skills, our team plans, organizes, and delivers a carefully
                  curated series of self-awareness and empowerment activities and
                  exercises. As participants complete each progressive activity,
                  they refine the communication and leadership techniques required
                  to build cohesive teams—and develop the leadership capacity that
                  emerges from doing it well.
                </p>
                <p className="mt-auto pt-6 text-xs leading-6 text-muted">
                  * We work with our community partners in devising unique programs
                  to meet expressed or assessed need.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionTransition>

      {/* Why choose us — image cards */}
      <SectionTransition className="bg-surface py-10 text-white sm:py-14 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal variant="fadeUp" className="max-w-2xl">
            <SectionLabel light>Why Choose Us</SectionLabel>
            <h2 className="mt-3 font-display text-2xl text-accent sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
              A Program Built for Real Impact
            </h2>
          </Reveal>

          <RevealStagger
            className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-14"
            stagger={0.08}
          >
            {WHY_US.map((item, index) => (
              <RevealStaggerItem key={item.title}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10">
                  {/* Card image */}
                  <div className="relative h-40 w-full overflow-hidden sm:h-48 md:h-56">
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
                    <span className="absolute top-5 left-5 font-display text-2xl text-accent/70">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col bg-black/40 p-5 sm:p-7">
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
      <SectionTransition className="relative overflow-hidden bg-black py-10 text-white sm:py-14 lg:py-32">
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
            <h2 className="mt-3 font-display text-2xl text-accent sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
              Ready to Build a Stronger Team?
            </h2>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/75 sm:mt-6 sm:leading-8 md:text-base">
              Let&apos;s design a team-building and leadership program tailored
              to your organization&apos;s unique goals, culture, and community.
            </p>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
              <LineCta href="/contact" light>
                Start a conversation
              </LineCta>
              <OutlineButton href="/services" variant="light" icon="arrow-right">
                Explore all services
              </OutlineButton>
            </div>
          </Reveal>
        </div>
      </SectionTransition>
    </>
  );
}
