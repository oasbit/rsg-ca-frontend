import type { ReactNode } from "react";
import { OutlineButton } from "@/components/ui/OutlineButton";

interface LineCtaProps {
  href: string;
  children: ReactNode;
  className?: string;
  light?: boolean;
}

/** Outline CTA link — matches footer button styling. */
export function LineCta({ href, children, className, light = false }: LineCtaProps) {
  return (
    <OutlineButton
      href={href}
      variant={light ? "light" : "dark"}
      className={className}
      icon="arrow-right"
    >
      {children}
    </OutlineButton>
  );
}
