"use client";

import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";

interface AboutFocusAreasProps {
  title: string;
  intro: string;
  bullets: string[];
  closing?: string;
}

export function AboutFocusAreas({
  title,
  intro,
  bullets,
  closing,
}: AboutFocusAreasProps) {
  return (
    <SectionTransition className="relative overflow-hidden bg-black py-10 text-white sm:py-12 lg:py-24">
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20">

          {/* Left — editorial headline column (same structure as Approach) */}
          <Reveal variant="fadeUp" className="flex flex-col justify-between">
            <div>
              <SectionLabel light>Our Focus Areas</SectionLabel>
              <div className="mt-5 h-px w-10 bg-accent/50" />
              <h2 className="mt-4 font-display text-3xl italic leading-[0.95] text-accent sm:mt-6 sm:text-4xl md:text-6xl lg:text-7xl">
                {title}
              </h2>
              <p className="mt-8 text-sm leading-8 text-white/80 md:text-base">
                {intro}
              </p>
            </div>

            {closing ? (
              <blockquote className="mt-8 border-l-2 border-accent/50 pl-4 sm:mt-10 sm:pl-6 lg:mt-0">
                <p className="font-display text-base italic leading-8 text-white/75 md:text-lg">
                  {closing}
                </p>
              </blockquote>
            ) : null}
          </Reveal>

          {/* Right — 2-col cell grid (hairline gaps as dividers) */}
          <RevealStagger
            className="grid grid-cols-1 gap-px self-start bg-white/10 sm:grid-cols-2"
            stagger={0.07}
          >
            {bullets.map((area, index) => {
              const isLast = index === bullets.length - 1;
              const isOddTotal = bullets.length % 2 !== 0;

              return (
                <RevealStaggerItem
                  key={area}
                  className={isLast && isOddTotal ? "col-span-2" : ""}
                >
                  <div className="group h-full bg-black p-4 transition-colors duration-300 hover:bg-white/[0.04] sm:p-5 lg:p-6">
                    {/* Small discreet index */}
                    <p
                      aria-hidden="true"
                      className="text-[10px] tracking-[0.35em] text-white/25"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    {/* Focus area title */}
                    <h3 className="mt-3 font-display text-base italic leading-snug text-white/80 transition-colors duration-300 group-hover:text-white md:text-lg lg:text-xl">
                      {area}
                    </h3>

                    {/* Accent underline — grows on hover */}
                    <span className="mt-4 block h-px w-0 bg-accent/50 transition-all duration-500 group-hover:w-6" />
                  </div>
                </RevealStaggerItem>
              );
            })}
          </RevealStagger>

        </div>
      </div>
    </SectionTransition>
  );
}
