import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";

interface QuoteBannerProps {
  quote: string;
  author: string;
  role: string;
}

export function QuoteBanner({ quote, author, role }: QuoteBannerProps) {
  return (
    <SectionTransition className="bg-surface py-24 text-white">
      <RevealStagger className="mx-auto max-w-4xl px-6 text-center lg:px-10" stagger={0.12}>
        <RevealStaggerItem>
          <p className="font-display text-3xl leading-snug italic md:text-4xl">
            &ldquo;{quote}&rdquo;
          </p>
        </RevealStaggerItem>
        <RevealStaggerItem>
          <p className="mt-8 text-sm tracking-[0.2em] uppercase">{author}</p>
        </RevealStaggerItem>
        <RevealStaggerItem>
          <p className="mt-2 text-xs tracking-[0.24em] text-muted uppercase">{role}</p>
        </RevealStaggerItem>
      </RevealStagger>
    </SectionTransition>
  );
}
