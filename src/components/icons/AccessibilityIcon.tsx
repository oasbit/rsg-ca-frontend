import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type AccessibilityIconProps = SVGProps<SVGSVGElement>;

/**
 * Standing person figure for the accessibility widget (Lucide "person-standing", ISC license).
 */
export function AccessibilityIcon({ className, ...props }: AccessibilityIconProps) {
  return (
    <svg
      viewBox="5 3 14 18"
      fill="none"
      aria-hidden
      className={cn("size-full shrink-0", className)}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      {...props}
    >
      <circle cx="12" cy="5" r="1.25" fill="currentColor" stroke="none" />
      <path d="m9 20 3-6 3 6" />
      <path d="m6 8 6 2 6-2" />
      <path d="M12 10v4" />
    </svg>
  );
}
