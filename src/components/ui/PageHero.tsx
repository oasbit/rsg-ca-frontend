"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { LineCta } from "@/components/ui/LineCta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { heroTransition, staggerTransition } from "@/lib/motion";

interface PageHeroProps {
  eyebrow: string;
  headline?: string;
  headlineEmphasis: string;
  body?: string;
  bodyParagraphs?: string[];
  imageUrl: string | null;
  imageAlt: string;
  fullHeight?: boolean;
  cta?: { href: string; label: string };
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
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={
        fullHeight
          ? "relative min-h-screen overflow-hidden bg-black text-white"
          : "relative min-h-[44vh] overflow-hidden bg-black text-white md:min-h-[50vh]"
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
            className={
              fullHeight
                ? "object-cover opacity-55 animate-[kenburns_18s_ease-in-out_infinite_alternate]"
                : "object-cover opacity-45"
            }
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
            ? "relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-[calc(var(--header-height)+4rem)] lg:px-10 lg:pb-28"
            : "relative mx-auto flex min-h-[44vh] max-w-7xl flex-col justify-end px-6 pb-14 pt-[calc(var(--header-height)+3rem)] md:min-h-[50vh] lg:px-10 lg:pb-16"
        }
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.div variants={prefersReducedMotion ? undefined : itemVariants}>
          <SectionLabel light className={fullHeight ? "mb-8" : "mb-5"}>
            {eyebrow}
          </SectionLabel>
        </motion.div>

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
                ? "font-display text-5xl leading-[0.95] italic md:text-7xl lg:text-8xl"
                : "font-display text-4xl leading-[1.02] italic md:text-5xl lg:text-6xl"
            }
          >
            {headlineEmphasis}
          </p>
        </motion.div>

        {bodyParagraphs?.length ? (
          <motion.div
            className={
              fullHeight
                ? "mt-10 max-w-xl space-y-5 text-sm leading-7 text-white/75 md:text-base"
                : "mt-6 max-w-2xl space-y-4 text-sm leading-7 text-white/75 md:text-base"
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
                ? "mt-10 max-w-xl text-sm leading-7 text-white/75 md:text-base"
                : "mt-6 max-w-2xl text-sm leading-7 text-white/75 md:text-base"
            }
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            {body}
          </motion.p>
        ) : null}

        {cta ? (
          <motion.div
            className={fullHeight ? "mt-12" : "mt-8"}
            variants={prefersReducedMotion ? undefined : itemVariants}
          >
            <LineCta href={cta.href} light>
              {cta.label}
            </LineCta>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
