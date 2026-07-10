"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LineCta } from "@/components/ui/LineCta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import type { WPPillar, WPProcessStep } from "@/lib/wordpress/types";

interface HowItWorksProps {
  steps: WPProcessStep[];
  intro?: string;
  pillars?: WPPillar[];
}

export function HowItWorks({ steps, intro, pillars }: HowItWorksProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-cream py-24 text-black lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal variant="fadeUp" className="lg:col-span-5">
            <SectionLabel className="text-body">How it works</SectionLabel>
            <h2 className="mt-4 font-display text-4xl leading-tight text-body italic md:text-5xl">
              How It Works
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.08} className="lg:col-span-7">
            {intro ? (
              <p className="max-w-lg text-sm leading-8 text-body md:text-base">
                {intro}
              </p>
            ) : null}
          </Reveal>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <div
            className="pointer-events-none absolute top-5 right-0 left-0 hidden h-px bg-black/10 lg:block"
            aria-hidden="true"
          />
          {!prefersReducedMotion ? (
            <motion.div
              className="pointer-events-none absolute top-5 left-0 hidden h-px origin-left bg-body lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%" }}
              aria-hidden="true"
            />
          ) : null}

          <RevealStagger
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            stagger={0.12}
          >
            {steps.map((step, index) => (
              <RevealStaggerItem key={step.title}>
                <article className="group relative h-full">
                  {index < steps.length - 1 ? (
                    <div
                      className="absolute top-5 left-10 h-full w-px bg-black/10 sm:hidden"
                      aria-hidden="true"
                    />
                  ) : null}

                  <div className="relative flex gap-5 sm:flex-col sm:gap-0">
                    <div className="relative z-10 shrink-0 sm:mb-8">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-cream text-[0.65rem] tracking-[0.28em] text-black/70 transition-all duration-500 ease-out group-hover:border-body group-hover:bg-body group-hover:text-cream">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 border-l border-black/10 pl-5 sm:border-0 sm:pl-0">
                      <h3 className="font-display text-2xl italic text-black transition-colors duration-300 group-hover:text-body md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-body">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>

        {pillars && pillars.length > 0 ? (
          <RevealStagger
            className="mt-16 grid gap-px bg-black/10 sm:grid-cols-2 xl:grid-cols-4 lg:mt-20"
            stagger={0.08}
          >
            {pillars.map((pillar) => (
              <RevealStaggerItem key={pillar.title}>
                <article className="group h-full bg-cream px-8 py-10 transition-colors duration-500 ease-out hover:bg-black/[0.03]">
                  <div className="mb-6 h-px w-8 bg-body/30 transition-all duration-500 group-hover:w-12 group-hover:bg-body" />
                  <h3 className="text-sm tracking-[0.24em] uppercase text-black">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-body/70">
                    {pillar.description}
                  </p>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        ) : null}

        <Reveal variant="fadeUp" delay={0.15} className="mt-16 border-t border-black/10 pt-10">
          <LineCta href="/contact">Start a conversation</LineCta>
        </Reveal>
      </div>
    </section>
  );
}
