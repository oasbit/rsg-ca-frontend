import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function SectionLabel({ children, className, light = false }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-light tracking-[0.35em] uppercase",
        light ? "text-white/70" : "text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
