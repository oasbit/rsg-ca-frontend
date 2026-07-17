"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LineCta } from "@/components/ui/LineCta";
import { cn } from "@/lib/utils";
import {
  SERVICES_MENU_HREF,
  SERVICES_MENU_ITEMS,
} from "@/lib/services-menu";
import { pageTransition } from "@/lib/motion";

interface ServicesMegaMenuTriggerProps {
  open: boolean;
  useDarkChrome: boolean;
  onShow: () => void;
  onHide: () => void;
}

export function ServicesMegaMenuTrigger({
  open,
  useDarkChrome,
  onShow,
  onHide,
}: ServicesMegaMenuTriggerProps) {
  const triggerClass = cn(
    "inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase transition-colors duration-300 ease-out",
    useDarkChrome
      ? "text-black/75 hover:text-body"
      : "text-white/85 hover:text-white",
  );

  return (
    <div
      className="relative"
      onMouseEnter={onShow}
      onMouseLeave={onHide}
      onFocus={onShow}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onHide();
        }
      }}
    >
      <Link
        href={SERVICES_MENU_HREF}
        aria-expanded={open}
        aria-haspopup="true"
        className={triggerClass}
      >
        Services
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={cn(
            "h-3 w-3 transition-transform duration-300",
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
      </Link>
    </div>
  );
}

interface ServicesMegaMenuPanelProps {
  open: boolean;
  compact: boolean;
  onShow: () => void;
  onHide: () => void;
}

export function ServicesMegaMenuPanel({
  open,
  compact,
  onShow,
  onHide,
}: ServicesMegaMenuPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="menu"
          aria-label="Services"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
          transition={pageTransition}
          className={cn(
            "fixed inset-x-0 z-40 bg-black shadow-[0_20px_48px_rgba(0,0,0,0.45)]",
            compact
              ? "top-[var(--header-height-compact)]"
              : "top-[var(--header-height)]",
          )}
          onMouseEnter={onShow}
          onMouseLeave={onHide}
        >
          <div className="mx-auto grid w-full max-w-[96rem] gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(20rem,24rem)_1fr] lg:gap-16 lg:px-12 lg:py-12 xl:gap-20 xl:px-16">
            <div className="border-b border-white/10 pb-10 lg:border-r lg:border-b-0 lg:pr-14 lg:pb-0 xl:pr-20">
              <p className="text-[0.65rem] tracking-[0.32em] text-accent uppercase">
                Our Services
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight text-white md:text-3xl">
                Strategic support for organizations and communities
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/55">
                Planning, leadership, team building, and facilitation — tailored
                programs designed to strengthen how people work together.
              </p>
              <div className="mt-6">
                <LineCta href={SERVICES_MENU_HREF} light>
                  View all services
                </LineCta>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 xl:gap-7 2xl:grid-cols-4">
              {SERVICES_MENU_ITEMS.map((service, index) => {
                const Icon = service.Icon;

                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    role="menuitem"
                    className="group flex h-full min-h-[15rem] min-w-0 flex-col rounded-xl border border-white/10 bg-black/40 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.04] sm:min-h-[16rem] sm:p-7 lg:p-8"
                  >
                    <span className="text-[0.6rem] tracking-[0.32em] text-white/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-5 flex h-11 w-11 items-center justify-center rounded-full border border-accent/25 bg-accent/5 text-accent transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="mt-5 font-display text-lg leading-snug text-white transition-colors duration-300 group-hover:text-accent lg:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[0.68rem] leading-relaxed tracking-[0.12em] text-accent/80 uppercase lg:text-xs">
                      {service.tagline}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.65rem] tracking-[0.22em] text-white/45 uppercase transition-colors duration-300 group-hover:text-accent">
                      Explore
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
