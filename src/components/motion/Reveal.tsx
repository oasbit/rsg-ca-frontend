"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { revealTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealVariant = "fadeUp" | "fade" | "fadeIn" | "slideLeft" | "slideRight";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const variants: Record<RevealVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
};

export function Reveal({
  children,
  className,
  as = "div",
  variant = "fadeUp",
  delay = 0,
  duration,
  once = true,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Component = motion[as];

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-30px", amount: 0.08 }}
      variants={variants[variant]}
      transition={{
        ...revealTransition,
        duration: duration ?? revealTransition.duration,
        delay,
      }}
    >
      {children}
    </Component>
  );
}
