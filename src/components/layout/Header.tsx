"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { NAV_ITEMS } from "@/lib/wordpress/menus";
import { cn } from "@/lib/utils";

type HeaderMode = "top" | "sticky" | "hidden";

const SCROLL_THRESHOLD = 64;
const SCROLL_DELTA = 10;

export function Header() {
  const [mode, setMode] = useState<HeaderMode>("top");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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

  const atTop = mode === "top";
  const sticky = mode === "sticky";
  const hidden = mode === "hidden" && !mobileOpen;
  const useDarkChrome = sticky;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          hidden && "-translate-y-full",
          atTop && "bg-transparent text-white",
          sticky && "border-b border-black/10 bg-cream text-black shadow-sm",
        )}
      >
        <div className="relative mx-auto h-[var(--header-height)] max-w-7xl px-6 lg:px-10">
          <nav className="absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 items-center gap-8 lg:flex lg:left-10">
            {NAV_ITEMS.map((item) => (
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
            ))}
          </nav>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <SiteLogo
              variant={useDarkChrome ? "main" : "inverse"}
              priority
              className="pointer-events-auto"
            />
          </div>

          <div className="absolute top-1/2 right-6 z-10 flex -translate-y-1/2 items-center gap-6 lg:right-10">
            <Link
              href="/contact"
              className={cn(
                "hidden text-xs tracking-[0.22em] uppercase transition-colors lg:inline-flex",
                useDarkChrome
                  ? "text-black/75 hover:text-body"
                  : "text-white/85 hover:text-white",
              )}
            >
              Get Started
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
