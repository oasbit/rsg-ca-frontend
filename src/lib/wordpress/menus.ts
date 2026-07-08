import type { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function getNavItems(): NavItem[] {
  return NAV_ITEMS;
}
