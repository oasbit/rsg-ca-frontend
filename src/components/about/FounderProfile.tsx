"use client";

import Image from "next/image";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTransition } from "@/components/motion/SectionTransition";

interface FounderProfileProps {
  name: string;
  title: string;
  paragraphs: string[];
  imageUrl: string | null;
  imageAlt: string;
}

export function FounderProfile({
  name,
  title,
  paragraphs,
  imageUrl,
  imageAlt,
}: FounderProfileProps) {
  const [leadParagraph, ...bodyParagraphs] = paragraphs;

  return (
    <SectionTransition className="relative overflow-hidden bg-black pt-6 pb-10 text-white sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-20">
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* ── Nameplate header — full width ── */}
        <Reveal variant="fadeUp">
          <SectionLabel light>Principal Facilitator</SectionLabel>
          <div className="mt-5 h-px w-10 bg-accent/50" />
          <h2 className="mt-4 font-display text-3xl leading-[0.92] text-white sm:mt-5 sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
            {name}
          </h2>
          <div className="mt-6 flex items-center gap-4">
            <span className="h-px w-10 shrink-0 bg-accent/55" />
            <p className="text-xs tracking-[0.28em] text-accent uppercase">{title}</p>
          </div>
        </Reveal>

        {/* Full-width divider */}
        <Reveal variant="fade" delay={0.1}>
          <div className="mt-10 h-px bg-white/10" />
        </Reveal>

        {/* ── Content row — bio left, portrait right ── */}
        <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-12 lg:gap-16 lg:items-stretch">

          {/* Bio column */}
          <Reveal variant="fadeUp" delay={0.12} className="lg:col-span-7 xl:col-span-8">
            {leadParagraph ? (
              <p className="text-base leading-8 text-white/85 md:text-lg">
                {leadParagraph}
              </p>
            ) : null}
            {bodyParagraphs.length > 0 ? (
              <div className="mt-6 space-y-5">
                {bodyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-sm leading-8 text-white/55 md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </Reveal>

          {/* Portrait column — constrained, deliberately cropped at base */}
          {imageUrl ? (
            <Reveal
              variant="fade"
              delay={0.18}
              className="hidden lg:col-span-5 lg:block xl:col-span-4"
            >
              <div className="relative h-full min-h-[320px] w-full overflow-hidden">
                {/* Subtle warm glow behind the figure */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_70%,rgba(241,236,220,0.07)_0%,transparent_70%)]"
                />
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-contain object-top"
                  sizes="35vw"
                />
                {/* Bottom crop fade — intentionally cuts the lower figure */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/60 to-transparent"
                />
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* Mobile portrait strip */}
        {imageUrl ? (
          <Reveal variant="fadeIn" delay={0.14} className="lg:hidden">
            <div className="relative mt-8 h-[200px] overflow-hidden sm:mt-10 sm:h-[240px]">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_50%_60%,rgba(241,236,220,0.06)_0%,transparent_70%)]"
              />
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-contain object-top"
                sizes="80vw"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent"
              />
            </div>
          </Reveal>
        ) : null}

      </div>
    </SectionTransition>
  );
}
