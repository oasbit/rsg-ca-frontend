"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import {
  ServicesMegaMenuPanel,
  ServicesMegaMenuTrigger,
} from "@/components/layout/ServicesMegaMenu";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { NAV_ITEMS } from "@/lib/wordpress/menus";
import { cn } from "@/lib/utils";

type HeaderMode = "top" | "sticky" | "hidden";

const SCROLL_THRESHOLD = 64;
const SCROLL_DELTA = 10;

export function Header() {
  const [mode, setMode] = useState<HeaderMode>("top");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showServicesMenu = useCallback(() => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(true);
  }, []);

  const hideServicesMenu = useCallback(() => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 120);
  }, []);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (y <= SCROLL_THRESHOLD) {
        setMode("top");
      } else if (delta < -SCROLL_DELTA) {
        setMode("sticky");
      } else if (delta > SCROLL_DELTA) {
        setMode("hidden");
      }

      lastScrollY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    lastScrollY.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) {
        clearTimeout(servicesCloseTimer.current);
      }
    };
  }, []);

  const sticky = mode === "sticky";
  const hidden = mode === "hidden" && !mobileOpen;
  const megaMenuActive = servicesOpen;
  const useDarkChrome = sticky && !megaMenuActive;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          hidden && "-translate-y-full",
          megaMenuActive && "bg-black text-white",
          !megaMenuActive && !sticky && "bg-transparent text-white",
          !megaMenuActive &&
            sticky &&
            "border-b border-black/10 bg-cream text-black shadow-sm",
        )}
      >
        <div
          className={cn(
            "relative mx-auto max-w-7xl px-6 transition-[height] duration-500 ease-out lg:px-10",
            sticky ? "h-[var(--header-height-compact)]" : "h-[var(--header-height)]",
          )}
        >
          <nav
            className={cn(
              "absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 items-center lg:flex lg:left-10",
              sticky ? "gap-6" : "gap-10",
            )}
          >
            {NAV_ITEMS.map((item) =>
              item.href === "/services" ? (
                <ServicesMegaMenuTrigger
                  key={item.href}
                  open={servicesOpen}
                  useDarkChrome={useDarkChrome}
                  onShow={showServicesMenu}
                  onHide={hideServicesMenu}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-xs tracking-[0.22em] uppercase transition-colors duration-300 ease-out",
                    useDarkChrome
                      ? "text-black/75 hover:text-body"
                      : "text-white/85 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <SiteLogo
              variant={useDarkChrome ? "main" : "inverse"}
              compact={sticky}
              priority
              className="pointer-events-auto"
            />
          </div>

          <div
            className={cn(
              "absolute top-1/2 right-6 z-10 flex -translate-y-1/2 items-center lg:right-10",
              sticky ? "gap-4" : "gap-6",
            )}
          >
            <span className="hidden lg:inline-flex">
              <OutlineButton
                href="/contact"
                variant={useDarkChrome ? "dark" : "light"}
                className={sticky ? "px-3 py-2 text-[0.65rem]" : undefined}
                icon="arrow-right"
              >
                Get Started
              </OutlineButton>
            </span>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 lg:hidden",
                sticky ? "h-8 w-8" : "h-10 w-10",
              )}
            >
              <span
                className={cn(
                  "h-px w-6 transition-colors duration-300",
                  useDarkChrome ? "bg-black" : "bg-white",
                )}
              />
              <span
                className={cn(
                  "h-px w-6 transition-colors duration-300",
                  useDarkChrome ? "bg-black" : "bg-white",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <ServicesMegaMenuPanel
        open={servicesOpen}
        compact={sticky}
        onShow={showServicesMenu}
        onHide={hideServicesMenu}
      />

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
