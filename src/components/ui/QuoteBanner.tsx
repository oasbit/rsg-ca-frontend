import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";

interface QuoteBannerProps {
  quote: string;
  author: string;
  role: string;
}

export function QuoteBanner({ quote, author, role }: QuoteBannerProps) {
  return (
    <SectionTransition className="bg-surface py-10 text-white sm:py-14 lg:py-24">
      <RevealStagger className="mx-auto max-w-4xl px-6 text-center lg:px-10" stagger={0.12}>
        <RevealStaggerItem>
          <p className="font-display text-xl leading-snug italic sm:text-2xl md:text-4xl">
            &ldquo;{quote}&rdquo;
          </p>
        </RevealStaggerItem>
        <RevealStaggerItem>
          <p className="mt-5 text-sm tracking-[0.2em] uppercase sm:mt-8">{author}</p>
        </RevealStaggerItem>
        <RevealStaggerItem>
          <p className="mt-2 text-xs tracking-[0.24em] text-muted uppercase">{role}</p>
        </RevealStaggerItem>
      </RevealStagger>
    </SectionTransition>
  );
}
