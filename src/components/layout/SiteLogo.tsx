import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/wordpress/images";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  /** `main` = black logo (live site). `inverse` = white logo on dark backgrounds. */
  variant?: "main" | "inverse";
  size?: "header" | "footer";
  align?: "left" | "center";
  className?: string;
  priority?: boolean;
}

const sizeClasses = {
  header:
    "h-[5.5rem] w-[20rem] sm:h-24 sm:w-[24rem] md:h-28 md:w-[28rem] lg:h-[7.5rem] lg:w-[32rem]",
  footer:
    "h-32 w-[32rem] sm:h-36 sm:w-[36rem] md:h-44 md:w-[42rem] lg:h-52 lg:w-[48rem] xl:h-56 xl:w-[52rem]",
} as const;

export function SiteLogo({
  variant = "main",
  size = "header",
  align = "center",
  className,
  priority = false,
}: SiteLogoProps) {
  const src =
    variant === "inverse" ? BRAND.logos.inverse : BRAND.logos.main;

  return (
    <Link
      href="/"
      className={cn(
        "relative block shrink-0 transition-opacity duration-300 ease-out hover:opacity-90",
        sizeClasses[size],
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
          size === "footer" ? "832px" : size === "header" ? "512px" : "160px"
        }
      />
    </Link>
  );
}
