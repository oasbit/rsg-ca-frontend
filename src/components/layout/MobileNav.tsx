"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/wordpress/menus";
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
              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="text-sm tracking-[0.2em] uppercase text-muted transition-colors duration-300 hover:text-white"
              >
                Close
              </button>
            </div>

            <nav className="mt-16 flex flex-col">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...pageTransition, delay: 0.08 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block border-b border-white/10 py-5 text-2xl font-light tracking-wide transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...pageTransition, delay: 0.08 + NAV_ITEMS.length * 0.05 }}
              >
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="mt-8 inline-flex items-center gap-4 text-sm tracking-[0.2em] uppercase text-accent transition-opacity duration-300 hover:opacity-80"
                >
                  <span className="h-px w-10 bg-accent" />
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
