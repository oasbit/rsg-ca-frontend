"use client";

import Image from "next/image";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { BRAND } from "@/lib/wordpress/images";

interface AboutVisionProps {
  title: string;
  body: string;
}

export function AboutVision({ title, body }: AboutVisionProps) {
  return (
    <SectionTransition className="relative overflow-hidden bg-black pt-10 pb-6 text-white sm:pt-12 lg:pt-24 lg:pb-10">
      <Image
        src={BRAND.about.communityPanel}
        alt=""
        fill
        unoptimized
        className="object-cover object-center opacity-55"
        sizes="100vw"
        aria-hidden
      />
      {/* Vignette — stronger at edges, open at centre */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,rgba(0,0,0,0.65)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90"
      />
      <GrainOverlay />

      <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-10">

        {/* Top rule with centred label */}
        <Reveal variant="fade">
          <div className="flex items-center gap-6">
            <span className="h-px flex-1 bg-white/12" />
            <SectionLabel light>{title}</SectionLabel>
            <span className="h-px flex-1 bg-white/12" />
          </div>
        </Reveal>

        {/* Vision statement — AP-scale italic display */}
        <Reveal variant="fadeUp" delay={0.12}>
          <blockquote className="mt-8 sm:mt-10 lg:mt-20">
            <p className="font-display text-2xl italic leading-[1.2] text-white/90 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              &ldquo;{body}&rdquo;
            </p>
          </blockquote>
        </Reveal>

        {/* AP-style attribution block */}
        <Reveal variant="fadeUp" delay={0.22}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 lg:mt-20">
            <span className="h-px w-12 bg-accent/50" />
            <p className="text-xs tracking-[0.35em] text-white/55 uppercase">
              RS Group Advance Consulting
            </p>
          </div>
        </Reveal>

        {/* Bottom rule */}
        <Reveal variant="fade" delay={0.28}>
          <div className="mt-8 h-px w-full bg-white/10 sm:mt-10 lg:mt-20" />
        </Reveal>
      </div>
    </SectionTransition>
  );
}
