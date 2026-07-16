import { cn } from "@/lib/utils";

interface AbstractGlobeProps {
  className?: string;
}

/** Decorative wireframe globe for contact section backgrounds. */
export function AbstractGlobe({ className }: AbstractGlobeProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none [mask-image:radial-gradient(circle,rgba(0,0,0,1)_30%,transparent_72%)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <circle
          cx="200"
          cy="200"
          r="148"
          stroke="currentColor"
          strokeWidth="0.65"
          className="text-accent/20"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="148"
          ry="52"
          stroke="currentColor"
          strokeWidth="0.65"
          className="text-accent/16"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="148"
          ry="98"
          stroke="currentColor"
          strokeWidth="0.65"
          className="text-accent/14"
        />
        <ellipse
          cx="200"
          cy="148"
          rx="128"
          ry="36"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/12"
        />
        <ellipse
          cx="200"
          cy="252"
          rx="128"
          ry="36"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/12"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="52"
          ry="148"
          stroke="currentColor"
          strokeWidth="0.65"
          className="text-accent/18"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="98"
          ry="148"
          stroke="currentColor"
          strokeWidth="0.65"
          className="text-accent/15"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="128"
          ry="148"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/12"
        />
        <path
          d="M200 52 C118 52 52 118 52 200 C52 248 76 290 112 316"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/14"
        />
        <path
          d="M200 52 C282 52 348 118 348 200 C348 248 324 290 288 316"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/14"
        />
        <path
          d="M200 348 C118 348 52 282 52 200 C52 152 76 110 112 84"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/14"
        />
        <path
          d="M200 348 C282 348 348 282 348 200 C348 152 324 110 288 84"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/14"
        />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(241,236,220,0.07)_0%,transparent_58%)]" />
    </div>
  );
}
