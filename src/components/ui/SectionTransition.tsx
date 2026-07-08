import { cn } from "@/lib/utils";

interface SectionTransitionProps {
  /** Tailwind gradient class stack, e.g. "from-black to-surface". */
  gradient?: string;
  className?: string;
}

/** Visual bridge from a PageHero into the next section — no content, gradient only. */
export function SectionTransition({
  gradient = "from-black to-surface",
  className,
}: SectionTransitionProps) {
  return (
    <div
      className={cn(
        "h-20 bg-gradient-to-b md:h-28 lg:h-32",
        gradient,
        className,
      )}
      aria-hidden="true"
    />
  );
}
