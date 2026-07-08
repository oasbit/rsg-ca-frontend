import { Reveal } from "@/components/motion/Reveal";

interface QuoteBannerProps {
  quote: string;
  author: string;
  role: string;
}

export function QuoteBanner({ quote, author, role }: QuoteBannerProps) {
  return (
    <section className="bg-black py-24 text-white">
      <Reveal className="mx-auto max-w-4xl px-6 text-center lg:px-10" variant="fadeIn">
        <p className="font-display text-3xl leading-snug italic md:text-4xl">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="mt-8 text-sm tracking-[0.2em] uppercase">{author}</p>
        <p className="mt-2 text-xs tracking-[0.24em] text-muted uppercase">{role}</p>
      </Reveal>
    </section>
  );
}
