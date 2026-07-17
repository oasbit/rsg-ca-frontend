"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { OutlineButton } from "@/components/ui/OutlineButton";
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

export function ConnectCta({
  title,
  body,
  imageUrl = resolveConnectCtaImage().src,
  imageAlt = "Dr. Andrew Peters, Managing Director",
}: ConnectCtaProps) {
  const prefersReducedMotion = useReducedMotion();
  const { lead, name } = splitConnectTitle(title);

  return (
    <SectionTransition className="relative overflow-hidden bg-black pt-3 pb-12 text-white sm:pb-16 lg:pt-4 lg:pb-32">
      <GrainOverlay />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-[42rem] opacity-[0.07]"
        style={{
          background:
            "linear-gradient(135deg, transparent 40%, var(--accent) 40%, var(--accent) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal variant="slideRight" className="relative lg:col-span-5 xl:col-span-5">
            <div className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
              <motion.div
                className="relative flex justify-center lg:justify-start"
                whileHover={
                  prefersReducedMotion ? undefined : { y: -4 }
                }
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={614}
                    height={1024}
                    className="h-auto w-full max-w-[16rem] object-contain object-top drop-shadow-[0_28px_56px_rgba(0,0,0,0.45)] sm:max-w-xs lg:max-w-sm xl:max-w-md"
                    sizes="(max-width: 1024px) 90vw, 40vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 sm:px-5 sm:pb-5">
                    <div className="border-l-2 border-accent px-4 py-1 sm:px-5">
                      <p className="text-[0.65rem] tracking-[0.32em] text-accent uppercase">
                        Managing Director
                      </p>
                      <p className="mt-1 text-sm font-medium tracking-wide text-white">
                        Dr. Andrew Peters
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          <Reveal
            variant="fadeUp"
            delay={0.12}
            className="lg:col-span-7 lg:pl-4 xl:pl-10"
          >
            <SectionLabel light>Start a conversation</SectionLabel>

            <h2 className="mt-4 max-w-2xl sm:mt-6">
              {lead ? (
                <span className="block text-2xl font-light tracking-wide text-white/90 sm:text-3xl md:text-4xl lg:text-5xl">
                  {lead}
                </span>
              ) : null}
              {name ? (
                <span className="mt-2 block font-display text-3xl leading-[1.05] text-accent sm:text-4xl md:text-5xl lg:text-7xl">
                  {name}
                </span>
              ) : (
                <span className="mt-2 block font-display text-3xl leading-[1.05] text-accent sm:text-4xl md:text-5xl lg:text-7xl">
                  {title}
                </span>
              )}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-muted sm:mt-8 md:text-base">
              {body}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <OutlineButton href="/contact" icon="arrow-right">
                Get started
              </OutlineButton>

              <OutlineButton href="tel:+18662536650" icon="phone">
                1-866-253-6650
              </OutlineButton>
            </div>

            <div className="mt-8 grid gap-5 border-t border-white/10 pt-6 sm:mt-10 sm:grid-cols-2 sm:gap-6 sm:pt-8">
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
