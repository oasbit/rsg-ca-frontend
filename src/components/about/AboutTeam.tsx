"use client";

import Image from "next/image";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LineCta } from "@/components/ui/LineCta";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { BRAND } from "@/lib/wordpress/images";

interface AboutTeamProps {
  title: string;
  paragraphs: string[];
}

/**
 * Placeholder team roster. Replace with CMS-driven data when team info is available.
 * Images are in /public/images/team/ — swap for real headshots as needed.
 */
const TEAM_MEMBERS = [
  {
    firstName: "Sarah",
    lastName: "Mitchell",
    role: "Strategic Development Lead",
    specialty: "Organizational alignment, strategic planning & executive facilitation",
    image: BRAND.teamMembers.sarahMitchell,
    imageAlt: "Sarah Mitchell, Strategic Development Lead",
  },
  {
    firstName: "Marcus",
    lastName: "Thompson",
    role: "Leadership Coach",
    specialty: "Executive coaching, leadership assessment & team empowerment",
    image: BRAND.teamMembers.marcusThompson,
    imageAlt: "Marcus Thompson, Leadership Coach",
  },
  {
    firstName: "Priya",
    lastName: "Sharma",
    role: "Facilitation Specialist",
    specialty: "Workshop design, group facilitation & community engagement",
    image: BRAND.teamMembers.priyaSharma,
    imageAlt: "Priya Sharma, Facilitation Specialist",
  },
  {
    firstName: "James",
    lastName: "Okafor",
    role: "Community Engagement Director",
    specialty: "Community programs, stakeholder relations & impact strategy",
    image: BRAND.teamMembers.jamesOkafor,
    imageAlt: "James Okafor, Community Engagement Director",
  },
] as const;

export function AboutTeam({ title, paragraphs }: AboutTeamProps) {
  return (
    <SectionTransition className="relative overflow-hidden bg-black pt-6 pb-10 text-white sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-24">
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Section header */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal variant="fadeUp" className="lg:col-span-7">
            <SectionLabel light>Our Team</SectionLabel>
            <div className="mt-5 h-px w-10 bg-accent/50" />
            <h2 className="mt-4 font-display text-3xl italic leading-[0.95] text-accent sm:mt-5 sm:text-4xl md:text-6xl lg:text-7xl">
              {title}
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.1} className="lg:col-span-5">
            <div className="space-y-5 lg:pl-4">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className={
                    i === 0
                      ? "text-sm leading-8 text-white/80 md:text-base"
                      : "text-sm leading-8 text-white/55 md:text-base"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Roster */}
        <RevealStagger className="mt-10 sm:mt-12 lg:mt-20" stagger={0.1}>
          {/* Top divider */}
          <div className="h-px bg-white/10" />

          {TEAM_MEMBERS.map((member, index) => {
            const reversed = index % 2 === 1;

            return (
              <RevealStaggerItem key={member.firstName}>
                <article
                  className={`group flex items-stretch gap-0 ${reversed ? "flex-row-reverse" : ""}`}
                >
                  {/* Portrait */}
                  <div className="relative w-[88px] flex-shrink-0 overflow-hidden sm:w-[120px] lg:w-[180px]">
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 110px, (max-width: 1024px) 140px, 180px"
                    />
                    {/* Seamless blend into background */}
                    <div
                      aria-hidden
                      className={`absolute inset-y-0 ${reversed ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l"} w-16 from-black to-transparent`}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent"
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex flex-1 flex-col justify-center py-5 sm:py-6 lg:py-10 ${
                      reversed ? "pr-4 sm:pr-6 lg:pr-10 items-end text-right" : "pl-4 sm:pl-6 lg:pl-10 items-start text-left"
                    }`}
                  >
                    <p className="text-[0.6rem] tracking-[0.32em] text-accent/60 uppercase">
                      {String(index + 1).padStart(2, "0")} &mdash;&ensp;{member.role}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl leading-[0.95] italic text-white transition-colors duration-300 group-hover:text-accent sm:mt-2 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                      {member.firstName}
                      <br />
                      {member.lastName}
                    </h3>
                    <p className="mt-4 max-w-xs text-xs leading-6 text-white/40 lg:max-w-sm lg:text-sm lg:leading-7">
                      {member.specialty}
                    </p>
                  </div>
                </article>

                {/* Row divider */}
                <div className="h-px bg-white/10" />
              </RevealStaggerItem>
            );
          })}
        </RevealStagger>

        {/* CTA panel */}
        <Reveal variant="fadeUp" delay={0.1} className="mt-10 sm:mt-12 lg:mt-20">
          <div className="pt-8 sm:pt-10 lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-lg">
              <p className="text-xs tracking-[0.3em] text-accent/70 uppercase">Partner with us</p>
              <h3 className="mt-4 font-display text-3xl italic leading-tight text-white md:text-4xl">
                Work with our team
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/55">
                Whether you&apos;re strengthening leadership, aligning your
                organization, or planning for sustainable growth — we&apos;re
                ready to partner with you.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:shrink-0">
              <LineCta href="/contact" light>
                Start a conversation
              </LineCta>
            </div>
          </div>
        </Reveal>

      </div>
    </SectionTransition>
  );
}
