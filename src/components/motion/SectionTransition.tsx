"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Drop-in replacement for <section>.
 * Fades in with a subtle upward drift as the section enters the viewport.
 * Automatically disabled when the user prefers reduced motion.
 */
export function SectionTransition({
  children,
  className,
  id,
}: SectionTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section className={className} id={id}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      className={className}
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-48px", amount: 0.04 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
