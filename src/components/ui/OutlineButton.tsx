import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type OutlineButtonIcon =
  | "arrow-right"
  | "arrow-up"
  | "arrow-left"
  | "external"
  | "phone"
  | "close";

interface OutlineButtonBaseProps {
  children: ReactNode;
  className?: string;
  /** `light` = white chrome on dark backgrounds; `dark` = dark chrome on light backgrounds */
  variant?: "light" | "dark";
  icon?: OutlineButtonIcon;
  iconPosition?: "left" | "right";
}

interface OutlineButtonLinkProps extends OutlineButtonBaseProps {
  href: string;
  onClick?: () => void;
  type?: never;
  ariaLabel?: string;
}

interface OutlineButtonButtonProps extends OutlineButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}

export type OutlineButtonProps = OutlineButtonLinkProps | OutlineButtonButtonProps;

function isExternalHref(href: string): boolean {
  return /^(https?:|tel:|mailto:)/.test(href);
}

function ButtonIcon({ name }: { name: OutlineButtonIcon }) {
  const className = "h-3.5 w-3.5 shrink-0";

  switch (name) {
    case "arrow-up":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
          <path
            d="M12 5v14M12 5l-5 5M12 5l5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "arrow-left":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
          <path
            d="M19 12H5M11 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "external":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
          <path
            d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "close":
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "arrow-right":
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function OutlineButton({
  children,
  className,
  variant = "light",
  icon = "arrow-right",
  iconPosition = "right",
  ...props
}: OutlineButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-3 border px-4 py-2.5 text-xs tracking-[0.22em] uppercase transition-all duration-300 ease-out",
    variant === "light"
      ? "border-white/20 text-white/85 hover:border-accent hover:text-accent"
      : "border-black/20 text-black/85 hover:border-body hover:text-body",
    className,
  );

  const content = (
    <>
      {iconPosition === "left" ? <ButtonIcon name={icon} /> : null}
      <span>{children}</span>
      {iconPosition === "right" ? <ButtonIcon name={icon} /> : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, onClick, ariaLabel } = props;

    if (isExternalHref(href)) {
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} onClick={onClick} aria-label={ariaLabel} className={classes}>
        {content}
      </Link>
    );
  }

  const { onClick, type = "button", ariaLabel } = props as OutlineButtonButtonProps;

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </button>
  );
}
