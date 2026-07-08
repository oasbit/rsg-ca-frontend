import type { WPApproachBlock } from "@/lib/wordpress/types";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";

interface ApproachGridProps {
  blocks: WPApproachBlock[];
  vision: string;
  team: string;
}

export function ApproachGrid({ blocks, vision, team }: ApproachGridProps) {
  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealStagger className="grid gap-12 lg:grid-cols-2" stagger={0.1}>
          {blocks.map((block) => (
            <RevealStaggerItem key={block.title}>
              <article className="border-t border-white/10 pt-8">
                <h3 className="text-sm tracking-[0.24em] uppercase">{block.title}</h3>
                <p className="mt-4 text-sm leading-8 text-muted md:text-base">{block.body}</p>
              </article>
            </RevealStaggerItem>
          ))}
        </RevealStagger>

        <RevealStagger className="mt-20 grid gap-12 border-t border-white/10 pt-12 lg:grid-cols-2" stagger={0.12}>
          <RevealStaggerItem>
            <h3 className="font-display text-3xl italic">Our Vision</h3>
            <p className="mt-4 text-sm leading-8 text-muted md:text-base">{vision}</p>
          </RevealStaggerItem>
          <RevealStaggerItem>
            <h3 className="font-display text-3xl italic">Our Team</h3>
            <p className="mt-4 text-sm leading-8 text-muted md:text-base">{team}</p>
          </RevealStaggerItem>
        </RevealStagger>
      </div>
    </section>
  );
}
