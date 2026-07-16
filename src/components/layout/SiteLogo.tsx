import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/wordpress/images";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  /** `main` = black logo (live site). `inverse` = white logo on dark backgrounds. */
  variant?: "main" | "inverse";
  size?: "header" | "footer";
  /** Smaller logo for compact sticky header */
  compact?: boolean;
  align?: "left" | "center";
  className?: string;
  priority?: boolean;
}

const sizeClasses = {
  header:
    "h-16 w-[11rem] sm:h-20 sm:w-[16rem] md:h-24 md:w-[22rem] lg:h-[7.5rem] lg:w-[32rem]",
  headerCompact:
    "h-8 w-[6.25rem] sm:h-9 sm:w-[7.25rem] md:h-10 md:w-[8.5rem] lg:h-11 lg:w-40",
  footer:
    "h-20 w-full max-w-[16rem] sm:h-24 sm:max-w-[20rem] md:h-32 md:max-w-[28rem] lg:h-52 lg:max-w-[48rem]",
} as const;

export function SiteLogo({
  variant = "main",
  size = "header",
  compact = false,
  align = "center",
  className,
  priority = false,
}: SiteLogoProps) {
  const src =
    variant === "inverse" ? BRAND.logos.inverse : BRAND.logos.main;

  const dimensionClasses =
    size === "header" && compact ? sizeClasses.headerCompact : sizeClasses[size];

  return (
    <Link
      href="/"
      className={cn(
        "relative block shrink-0 transition-all duration-500 ease-out hover:opacity-90",
        dimensionClasses,
        className,
      )}
      aria-label="RS Group Advance Consulting home"
    >
      <Image
        src={src}
        alt="RS Group Advance Consulting"
        fill
        priority={priority}
        className={cn(
          "object-contain",
          align === "left" ? "object-left" : "object-center",
        )}
        sizes={
          size === "footer"
            ? "832px"
            : compact
              ? "160px"
              : size === "header"
                ? "512px"
                : "160px"
        }
      />
    </Link>
  );
}
