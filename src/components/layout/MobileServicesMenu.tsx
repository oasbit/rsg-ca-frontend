"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  SERVICES_MENU_HREF,
  SERVICES_MENU_ITEMS,
} from "@/lib/services-menu";

interface MobileServicesMenuProps {
  onNavigate: () => void;
}

export function MobileServicesMenu({ onNavigate }: MobileServicesMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-xl font-light tracking-wide transition-colors duration-300 hover:text-accent sm:py-5 sm:text-2xl"
      >
        Services
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            open && "rotate-180",
          )}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="space-y-1 pb-4 pl-1">
          {SERVICES_MENU_ITEMS.map((service) => {
            const Icon = service.Icon;

            return (
              <Link
                key={service.href}
                href={service.href}
                onClick={onNavigate}
                className="group flex items-start gap-4 rounded-xl border border-transparent px-3 py-3 transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.03]"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/5 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-base text-white transition-colors duration-300 group-hover:text-accent">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-[0.65rem] tracking-[0.18em] text-muted uppercase">
                    {service.tagline}
                  </span>
                </span>
              </Link>
            );
          })}

          <Link
            href={SERVICES_MENU_HREF}
            onClick={onNavigate}
            className="mt-2 inline-flex px-3 text-xs tracking-[0.22em] text-accent uppercase transition-opacity duration-300 hover:opacity-80"
          >
            View all services
          </Link>
        </div>
      ) : null}
    </div>
  );
}
