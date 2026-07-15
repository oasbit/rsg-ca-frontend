"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { resolveConnectCtaImage } from "@/lib/wordpress/images";

interface ConnectCtaProps {
  title: string;
  body: string;
  imageUrl?: string;
  imageAlt?: string;
}

function splitConnectTitle(title: string): { lead: string; name: string } {
  const marker = "Dr. Andrew Peters";
  if (title.includes(marker)) {
    return {
      lead: title.replace(marker, "").trim(),
      name: marker,
    };
  }

  return { lead: title, name: "" };
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ConnectCta({
  title,
  body,
  imageUrl = resolveConnectCtaImage().src,
  imageAlt = "Dr. Andrew Peters, Managing Director",
}: ConnectCtaProps) {
  const prefersReducedMotion = useReducedMotion();
  const { lead, name } = splitConnectTitle(title);

  return (
    <SectionTransition className="relative overflow-hidden bg-black pt-10 pb-24 text-white lg:pt-14 lg:pb-32">
      <GrainOverlay />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-[42rem] opacity-[0.07]"
        style={{
          background:
            "linear-gradient(135deg, transparent 40%, var(--accent) 40%, var(--accent) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal variant="slideRight" className="relative lg:col-span-5 xl:col-span-5">
            <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
              <div
                className="absolute -left-3 top-8 hidden h-32 w-px bg-accent/40 sm:block lg:-left-6"
                aria-hidden="true"
              />

              <motion.div
                className="relative flex justify-center lg:justify-start"
                whileHover={
                  prefersReducedMotion ? undefined : { y: -4 }
                }
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={614}
                  height={1024}
                  className="h-auto w-full max-w-[16rem] object-contain drop-shadow-[0_28px_56px_rgba(0,0,0,0.45)] sm:max-w-xs lg:max-w-sm xl:max-w-md"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              </motion.div>

              <div className="mt-8 flex justify-center lg:justify-start">
                <div className="border-l-2 border-accent px-5 py-1">
                  <p className="text-[0.65rem] tracking-[0.32em] text-accent uppercase">
                    Managing Director
                  </p>
                  <p className="mt-1 text-sm font-medium tracking-wide text-white">
                    Dr. Andrew Peters
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            variant="fadeUp"
            delay={0.12}
            className="lg:col-span-7 lg:pl-4 xl:pl-10"
          >
            <SectionLabel light>Start a conversation</SectionLabel>

            <h2 className="mt-6 max-w-2xl">
              {lead ? (
                <span className="block text-3xl font-light tracking-wide text-white/90 md:text-4xl lg:text-5xl">
                  {lead}
                </span>
              ) : null}
              {name ? (
                <span className="mt-2 block font-display text-4xl leading-[1.05] text-accent italic md:text-6xl lg:text-7xl">
                  {name}
                </span>
              ) : (
                <span className="mt-2 block font-display text-4xl leading-[1.05] text-accent italic md:text-6xl lg:text-7xl">
                  {title}
                </span>
              )}
            </h2>

            <p className="mt-8 max-w-lg text-sm leading-8 text-muted md:text-base">
              {body}
            </p>

            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-xs font-medium tracking-[0.22em] text-black uppercase transition-all duration-300 ease-out hover:bg-light hover:shadow-[0_12px_40px_-12px_rgba(241,236,220,0.45)]"
              >
                Get started
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="tel:+18662536650"
                className="inline-flex items-center gap-3 text-sm text-white/75 transition-colors duration-300 hover:text-accent"
              >
                <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
                1-866-253-6650
              </a>
            </div>

            <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2">
              <div>
                <p className="text-[0.65rem] tracking-[0.32em] text-muted uppercase">
                  Email
                </p>
                <a
                  href="mailto:info@rsg-ac.ca"
                  className="mt-2 block text-sm text-white/85 transition-colors duration-300 hover:text-accent"
                >
                  info@rsg-ac.ca
                </a>
              </div>
              <div>
                <p className="text-[0.65rem] tracking-[0.32em] text-muted uppercase">
                  Focus
                </p>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  Leadership, strategy, and organizational development
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionTransition>
  );
}
