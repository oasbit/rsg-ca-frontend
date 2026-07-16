"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { MobileServicesMenu } from "@/components/layout/MobileServicesMenu";
import { NAV_ITEMS } from "@/lib/wordpress/menus";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { pageTransition } from "@/lib/motion";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm lg:hidden"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={pageTransition}
        >
          <motion.div
            className="flex h-full flex-col px-6 py-8"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ ...pageTransition, delay: 0.05 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-[0.18em] uppercase">Menu</span>
              <OutlineButton
                onClick={onClose}
                icon="close"
                iconPosition="left"
                ariaLabel="Close menu"
              >
                Close
              </OutlineButton>
            </div>

            <nav className="mt-8 flex flex-col sm:mt-12">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...pageTransition, delay: 0.08 + index * 0.05 }}
                >
                  {item.href === "/services" ? (
                    <MobileServicesMenu onNavigate={onClose} />
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block border-b border-white/10 py-4 text-xl font-light tracking-wide transition-colors duration-300 hover:text-accent sm:py-5 sm:text-2xl"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...pageTransition, delay: 0.08 + NAV_ITEMS.length * 0.05 }}
              >
                <OutlineButton
                  href="/contact"
                  onClick={onClose}
                  icon="arrow-right"
                  className="mt-8"
                >
                  Get Started
                </OutlineButton>
              </motion.div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
