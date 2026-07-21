import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type ListCheckMarkProps = SVGProps<SVGSVGElement> & {
  /** Visual tone for light vs dark section backgrounds. */
  tone?: "accent" | "body";
};

/**
 * Shared list marker — replaces the thin dash used on service/about bullets.
 */
export function ListCheckMark({
  className,
  tone = "accent",
  ...props
}: ListCheckMarkProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn(
        "mt-1 h-4 w-4 shrink-0",
        tone === "body" ? "text-body" : "text-accent",
        className,
      )}
      {...props}
    >
      <path
        d="M3.25 8.25l3 3 6.5-6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
