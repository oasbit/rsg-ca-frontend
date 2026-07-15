"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export function RevealStagger({
  children,
  className,
  stagger = 0.1,
}: RevealStaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px", amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: staggerTransition,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
