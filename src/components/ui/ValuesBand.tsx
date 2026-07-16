import { SectionTransition } from "@/components/motion/SectionTransition";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";

const VALUES = ["Leadership", "Empowerment", "Awareness", "Development"];

export function ValuesBand() {
  return (
    <SectionTransition className="border-y border-white/10 bg-black py-5 text-white sm:py-6 lg:py-8">
      <RevealStagger
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 sm:gap-x-10 sm:gap-y-4 lg:px-10"
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
