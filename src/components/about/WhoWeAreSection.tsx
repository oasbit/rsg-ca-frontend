"use client";

import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTransition } from "@/components/motion/SectionTransition";

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
    <SectionTransition className="relative overflow-hidden bg-black pt-20 pb-8 text-white lg:pt-28 lg:pb-10">
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Full-width 2-column editorial split */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left — eyebrow + oversized display headline */}
          <Reveal variant="fadeUp" className="lg:col-span-5 xl:col-span-5">
            <SectionLabel light>{eyebrow}</SectionLabel>

            {/* AP-style: thin accent rule below label, above headline */}
            <div className="mt-5 h-px w-10 bg-accent/50" />

            <h2 className="mt-6 font-display text-5xl italic leading-[0.95] text-accent md:text-6xl lg:text-7xl xl:text-8xl">
              {headline}
            </h2>
          </Reveal>

          {/* Right — body paragraphs, vertically centred against the headline */}
          <Reveal
            variant="fadeUp"
            delay={0.12}
            className="flex flex-col justify-center space-y-6 lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7"
          >
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 48)}
                className={
                  index === 0
                    ? "text-base leading-8 text-white/85 md:text-lg"
                    : "text-sm leading-8 text-white/65 md:text-base"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Full-width bottom rule — visual bridge to the next section */}
        <Reveal variant="fade" delay={0.2}>
          <div className="mt-20 h-px w-full bg-white/10 lg:mt-28" />
        </Reveal>
      </div>
    </SectionTransition>
  );
}
