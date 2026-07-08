"use client";

import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND } from "@/lib/wordpress/images";

interface WhoWeAreSectionProps {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
}

export function WhoWeAreSection({
  eyebrow,
  headline,
  paragraphs,
}: WhoWeAreSectionProps) {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-full w-72 bg-[length:380px_auto] bg-left bg-no-repeat opacity-40 lg:w-96"
        style={{ backgroundImage: `url(${BRAND.about.overlay})` }}
      />
      <GrainOverlay />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal variant="fadeUp">
          <SectionLabel light>{eyebrow}</SectionLabel>
          <h2 className="mt-4 font-display text-4xl leading-tight text-accent italic md:text-5xl lg:text-6xl">
            {headline}
          </h2>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.08} className="mt-10 space-y-6">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-sm leading-8 text-muted md:text-base"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
