import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type ListCrossMarkProps = SVGProps<SVGSVGElement>;

/** Contrast marker for problem / avoid points opposite ListCheckMark. */
export function ListCrossMark({ className, ...props }: ListCrossMarkProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("mt-1 h-4 w-4 shrink-0 text-white/45", className)}
      {...props}
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
