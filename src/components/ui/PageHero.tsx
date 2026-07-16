"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { LineCta } from "@/components/ui/LineCta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { cn } from "@/lib/utils";
import { heroTransition, staggerTransition } from "@/lib/motion";

interface PageHeroProps {
  eyebrow?: string;
  headline?: string;
  headlineEmphasis: string;
  body?: string;
  bodyParagraphs?: string[];
  imageUrl: string | null;
  imageAlt: string;
  fullHeight?: boolean;
  cta?: { href: string; label: string };
  /** Serve hero image at full source resolution (no Next.js optimization). */
  imageUnoptimized?: boolean;
  /** Apply black-and-white filter to the hero background image. */
  imageGrayscale?: boolean;
  /** Optional content rendered below the CTA, still inside the hero background. */
  footer?: ReactNode;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: staggerTransition,
  },
};

export function PageHero({
  eyebrow,
  headline,
  headlineEmphasis,
  body,
  bodyParagraphs,
  imageUrl,
  imageAlt,
  fullHeight = false,
  cta,
  imageUnoptimized = false,
  imageGrayscale = false,
  footer,
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={
        fullHeight
          ? "relative flex min-h-[85svh] flex-col overflow-hidden bg-black text-white md:min-h-screen"
          : "relative overflow-hidden bg-black text-white"
      }
    >
      <motion.div
        className="absolute inset-0"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...heroTransition, duration: fullHeight ? 1.2 : 0.9 }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority={fullHeight}
            unoptimized={imageUnoptimized}
            className={cn(
              "object-cover",
              fullHeight
                ? "opacity-55 animate-[kenburns_18s_ease-in-out_infinite_alternate]"
                : "opacity-45",
              imageGrayscale && "grayscale",
            )}
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-black via-surface to-black" />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
      <GrainOverlay />

      <motion.div
        className={
          fullHeight
            ? "relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-8 pt-[calc(var(--header-height)+1.5rem)] sm:pb-10 sm:pt-[calc(var(--header-height)+2.5rem)] lg:px-10 lg:pb-14"
            : "relative mx-auto flex min-h-[36vh] max-w-7xl flex-col justify-end px-6 pb-10 pt-[calc(var(--header-height)+1.5rem)] sm:min-h-[40vh] md:min-h-[50vh] lg:px-10 lg:pb-16"
        }
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
      >
        {eyebrow ? (
          <motion.div variants={prefersReducedMotion ? undefined : itemVariants}>
            <SectionLabel light className={fullHeight ? "mb-4 sm:mb-6 lg:mb-8" : "mb-3 sm:mb-5"}>
              {eyebrow}
            </SectionLabel>
          </motion.div>
        ) : null}

        <motion.div
          className="max-w-5xl space-y-2"
          variants={prefersReducedMotion ? undefined : itemVariants}
        >
          {headline ? (
            <h1 className="text-sm font-light tracking-[0.3em] uppercase md:text-base">
              {headline}
            </h1>
          ) : null}
          <p
            className={
              fullHeight
                ? "font-display text-3xl leading-[0.95] italic sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
                : "font-display text-2xl leading-[1.02] italic sm:text-3xl md:text-5xl lg:text-6xl"
            }
          >
            {headlineEmphasis}
          </p>
        </motion.div>

        {bodyParagraphs?.length ? (
          <motion.div
            className={
              fullHeight
                ? "mt-6 max-w-xl space-y-4 text-sm leading-7 text-white/75 sm:mt-8 md:text-base"
                : "mt-4 max-w-2xl space-y-3 text-sm leading-7 text-white/75 sm:mt-6 md:text-base"
            }
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            {bodyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </motion.div>
        ) : body ? (
          <motion.p
            className={
              fullHeight
                ? "mt-6 max-w-xl text-sm leading-7 text-white/75 sm:mt-8 md:text-base"
                : "mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:mt-6 md:text-base"
            }
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            {body}
          </motion.p>
        ) : null}

        {cta ? (
          <motion.div
            className={fullHeight ? "mt-6 sm:mt-8" : "mt-5 sm:mt-8"}
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            <LineCta href={cta.href} light>
              {cta.label}
            </LineCta>
          </motion.div>
        ) : null}
      </motion.div>

      {footer ? (
        <div className="relative w-full">{footer}</div>
      ) : null}
    </section>
  );
}
