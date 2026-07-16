"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { SERVICE_AREA } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { NAV_ITEMS } from "@/lib/wordpress/menus";

import { OutlineButton } from "@/components/ui/OutlineButton";

function BackToTopButton() {
  const prefersReducedMotion = useReducedMotion();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <OutlineButton
      onClick={scrollToTop}
      icon="arrow-up"
      ariaLabel="Back to top"
    >
      Back to top
    </OutlineButton>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <RevealStagger className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:gap-10 sm:py-12 lg:grid-cols-3 lg:items-center lg:px-10 lg:py-16">
        <RevealStaggerItem className="flex items-center justify-center">
          <SiteLogo variant="inverse" size="footer" align="center" />
        </RevealStaggerItem>

        <RevealStaggerItem>
          <p className="text-xs tracking-[0.28em] text-muted uppercase">Company</p>
          <ul className="mt-4 space-y-3">
            {NAV_ITEMS.filter((item) => item.href !== "/").map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/85 transition-colors duration-300 ease-out hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </RevealStaggerItem>

        <RevealStaggerItem>
          <p className="text-xs tracking-[0.28em] text-muted uppercase">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-white/85">
            <li>
              <a
                href="tel:+18662536650"
                className="transition-colors duration-300 ease-out hover:text-accent"
              >
                1-866-253-6650
              </a>
            </li>
            <li>
              <a
                href="mailto:info@rsg-ac.ca"
                className="transition-colors duration-300 ease-out hover:text-accent"
              >
                info@rsg-ac.ca
              </a>
            </li>
            <li className="text-muted">{SERVICE_AREA}</li>
          </ul>
        </RevealStaggerItem>
      </RevealStagger>

      <Reveal variant="fade">
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
              <Link
                href="/privacy-policy"
                className="text-xs tracking-[0.22em] text-white/85 uppercase transition-colors duration-300 ease-out hover:text-accent"
              >
                Privacy Policy
              </Link>

              <p className="text-xs leading-6 text-muted">
                © {year} RS Group Advance Consulting. Website Powered by{" "}
                <a
                  href="https://oasbit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 transition-colors duration-300 ease-out hover:text-accent"
                >
                  Oasbit
                </a>
              </p>
            </div>

            <BackToTopButton />
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
