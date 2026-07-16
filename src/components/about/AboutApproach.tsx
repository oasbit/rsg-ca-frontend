"use client";

import Image from "next/image";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { BRAND } from "@/lib/wordpress/images";

interface AboutApproachProps {
  title: string;
  intro: string;
  executionLead?: string;
  bullets: string[];
  closing?: string;
}

export function AboutApproach({
  title,
  intro,
  executionLead,
  bullets,
  closing,
}: AboutApproachProps) {
  return (
    <SectionTransition className="relative overflow-hidden bg-black py-10 text-white sm:py-12 lg:py-24">
      <Image
        src={BRAND.about.approachBg}
        alt=""
        fill
        className="object-cover object-center opacity-55"
        sizes="100vw"
        aria-hidden
      />
      {/* Directional gradient — content reads left-to-right */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/80"
      />
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Two-column grid */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20">

          {/* Left — editorial headline column */}
          <Reveal variant="fadeUp" className="flex flex-col justify-between">
            <div>
              <SectionLabel light>Our Approach</SectionLabel>
              <div className="mt-5 h-px w-10 bg-accent/50" />
              <h2 className="mt-4 font-display text-3xl italic leading-[0.95] text-accent sm:mt-6 sm:text-4xl md:text-6xl lg:text-7xl">
                {title}
              </h2>
              <p className="mt-8 text-sm leading-8 text-white/80 md:text-base">
                {intro}
              </p>
              {executionLead ? (
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px w-6 bg-accent/40" />
                  <p className="text-xs tracking-[0.22em] text-white/50 uppercase">
                    {executionLead}
                  </p>
                </div>
              ) : null}
            </div>

            {closing ? (
              <blockquote className="mt-8 border-l-2 border-accent/50 pl-4 sm:mt-10 sm:pl-6 lg:mt-0">
                <p className="font-display text-base italic leading-8 text-white/75 md:text-lg">
                  {closing}
                </p>
              </blockquote>
            ) : null}
          </Reveal>

          {/* Right — numbered execution steps */}
          <RevealStagger stagger={0.09}>
            <ul className="divide-y divide-white/10">
              {bullets.map((bullet, index) => (
                <RevealStaggerItem key={bullet}>
                  <li className="flex gap-5 py-5 sm:gap-7 sm:py-6">
                    <span className="shrink-0 font-display text-4xl leading-none text-accent/35 italic select-none lg:text-5xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-2 text-sm leading-7 text-white/80 md:text-base">
                      {bullet}
                    </p>
                  </li>
                </RevealStaggerItem>
              ))}
            </ul>
          </RevealStagger>
        </div>
      </div>
    </SectionTransition>
  );
}
