import type { ComponentType, SVGProps } from "react";
import {
  FacilitationIcon,
  LeadershipIcon,
  PlanningIcon,
  TeamIcon,
} from "@/components/icons/ServiceIcons";

export interface ServiceMenuItem {
  title: string;
  tagline: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

function serviceAnchor(title: string): string {
  return `/services#${title.toLowerCase().replace(/\s+/g, "-")}`;
}

/** Primary services surfaced in the header mega menu and mobile submenu. */
export const SERVICES_MENU_ITEMS: ServiceMenuItem[] = [
  {
    title: "Strategic Planning",
    tagline: "Chart Your Course",
    href: serviceAnchor("Strategic Planning"),
    Icon: PlanningIcon,
  },
  {
    title: "Leadership Development",
    tagline: "Empower Positive Change",
    href: serviceAnchor("Leadership Development"),
    Icon: LeadershipIcon,
  },
  {
    title: "Team Building",
    tagline: "Develop Cohesive Teams",
    href: "/services/team-building",
    Icon: TeamIcon,
  },
  {
    title: "Facilitation",
    tagline: "Efficiency, Accountability, Synergy",
    href: serviceAnchor("Facilitation"),
    Icon: FacilitationIcon,
  },
];

export const SERVICES_MENU_HREF = "/services";
