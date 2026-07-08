import Link from "next/link";
import { cn } from "@/lib/utils";

interface LineCtaProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export function LineCta({ href, children, className, light = false }: LineCtaProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 text-sm tracking-[0.18em] uppercase transition-all duration-300 ease-out",
        light
          ? "text-white hover:text-accent"
          : "text-black hover:text-body",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-10 transition-all duration-500 ease-out group-hover:w-14",
          light
            ? "bg-white/80 group-hover:bg-accent"
            : "bg-black/80 group-hover:bg-body",
        )}
      />
      <span>{children}</span>
    </Link>
  );
}
