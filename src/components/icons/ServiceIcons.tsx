import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function PlanningIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9"
      />
    </svg>
  );
}

export function LeadershipIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
      />
    </svg>
  );
}

export function TeamIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 20c0-2.8 2.7-5 6-5M13 20c0-2.2 2-4 4.5-4"
      />
    </svg>
  );
}

export function FacilitationIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10 1.4-1.4"
      />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

const SERVICE_ICONS = [
  { match: /strategic|planning/i, Icon: PlanningIcon },
  { match: /leadership/i, Icon: LeadershipIcon },
  { match: /team/i, Icon: TeamIcon },
  { match: /facilitation/i, Icon: FacilitationIcon },
] as const;

export function ServiceTabIcon({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const entry = SERVICE_ICONS.find(({ match }) => match.test(title));
  const Icon = entry?.Icon ?? PlanningIcon;
  return <Icon className={className} />;
}

export const SERVICE_TAB_ICONS_BY_INDEX = [
  PlanningIcon,
  LeadershipIcon,
  TeamIcon,
  FacilitationIcon,
] as const;
