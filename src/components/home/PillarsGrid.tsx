import type { WPPillar } from "@/lib/wordpress/types";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";

interface PillarsGridProps {
  pillars: WPPillar[];
  /**
   * When true, renders only the grid (no section wrapper, no extra vertical
   * padding, no GrainOverlay). Use when embedding inside another section such
   * as the homepage hero.
   */
  embedded?: boolean;
}

export function PillarsGrid({ pillars, embedded = false }: PillarsGridProps) {
  const grid = (
    <div className="relative mx-auto max-w-7xl px-6 pb-6 sm:pb-8 lg:px-10">
      <RevealStagger className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) => (
          <RevealStaggerItem key={pillar.title}>
            <article className={`h-full px-5 py-6 transition-colors duration-500 ease-out hover:bg-white/[0.03] sm:px-6 sm:py-8 lg:px-8 lg:py-10 ${embedded ? "bg-black/60 backdrop-blur-sm" : "bg-black"}`}>
              <div className="mb-4 h-px w-10 bg-accent transition-all duration-500 group-hover:w-14 sm:mb-6 lg:mb-8" />
              <h3 className="text-sm tracking-[0.24em] uppercase">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{pillar.description}</p>
            </article>
          </RevealStaggerItem>
        ))}
      </RevealStagger>
    </div>
  );

  if (embedded) return grid;

  return (
    <SectionTransition className="relative bg-black py-12 text-white sm:py-16 lg:py-24">
      <GrainOverlay />
      {grid}
    </SectionTransition>
  );
}
