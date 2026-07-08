import { cn } from "@/lib/utils";

interface EditorialHeadingProps {
  sans: string;
  serif: string;
  className?: string;
  light?: boolean;
}

export function EditorialHeading({
  sans,
  serif,
  className,
  light = false,
}: EditorialHeadingProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2
        className={cn(
          "text-sm font-light tracking-[0.28em] uppercase md:text-base",
          light ? "text-white/80" : "text-muted",
        )}
      >
        {sans}
      </h2>
      <p
        className={cn(
          "font-display text-4xl leading-[1.05] italic md:text-6xl lg:text-7xl",
          light ? "text-white" : "text-foreground",
        )}
      >
        {serif}
      </p>
    </div>
  );
}
