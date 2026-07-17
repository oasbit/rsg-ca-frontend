"use client";

import Image from "next/image";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTransition } from "@/components/motion/SectionTransition";

interface AboutDetailSectionProps {
  title: string;
  intro?: string;
  paragraphs?: string[];
  executionLead?: string;
  bullets?: string[];
  closing?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
}

export function AboutDetailSection({
  title,
  intro,
  paragraphs = [],
  executionLead,
  bullets = [],
  closing,
  backgroundImage,
  backgroundPosition = "center center",
}: AboutDetailSectionProps) {
  return (
    <SectionTransition className="relative overflow-hidden bg-black py-10 text-white sm:py-14 lg:py-32">
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-55"
            style={{ objectPosition: backgroundPosition }}
            sizes="100vw"
            aria-hidden
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40"
          />
        </>
      ) : null}
      <GrainOverlay />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
        <div className="max-w-xl">
          <Reveal variant="fadeUp">
            <h2 className="font-display text-2xl text-accent sm:text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>

            {intro ? (
              <p className="mt-6 text-sm leading-8 text-white/80 md:text-base">{intro}</p>
            ) : null}

            {paragraphs.length > 0 ? (
              <div className="mt-6 space-y-6">
                {paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-sm leading-8 text-white/80 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

          {executionLead ? (
            <p className="mt-6 text-sm leading-8 text-white/85 md:text-base">
              {executionLead}
            </p>
          ) : null}

          {bullets.length > 0 ? (
            <ul className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm text-white/85 md:text-base">
                  <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {closing ? (
            <p className="mt-8 text-sm leading-8 text-white/75 md:text-base">{closing}</p>
          ) : null}
          </Reveal>
        </div>
      </div>
    </SectionTransition>
  );
}
