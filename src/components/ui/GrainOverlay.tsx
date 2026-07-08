import { cn } from "@/lib/utils";

interface GrainOverlayProps {
  className?: string;
}

export function GrainOverlay({ className }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("grain-overlay absolute inset-0", className)}
    />
  );
}
