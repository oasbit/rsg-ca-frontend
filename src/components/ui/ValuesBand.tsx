import { SectionTransition } from "@/components/motion/SectionTransition";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";

const VALUES = ["Inspiration", "Development", "Influence", "Action"];

export function ValuesBand() {
  return (
    <SectionTransition className="border-y border-white/10 bg-black py-8 text-white">
      <RevealStagger
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 lg:px-10"
        stagger={0.07}
      >
        {VALUES.map((value) => (
          <RevealStaggerItem key={value}>
            <span className="text-xs font-light tracking-[0.35em] text-white/70 uppercase">
              {value}
            </span>
          </RevealStaggerItem>
        ))}
      </RevealStagger>
    </SectionTransition>
  );
}
