"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { ServicesTabs } from "@/components/home/ServicesTabs";
import type { WPProcessStep, WPServiceBlock } from "@/lib/wordpress/types";

interface HowItWorksProps {
  steps: WPProcessStep[];
  intro?: string;
  services?: WPServiceBlock[];
  serviceImages?: string[];
}

export function HowItWorks({ steps, intro, services, serviceImages }: HowItWorksProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionTransition className="bg-black pt-24 pb-10 text-white lg:pt-32 lg:pb-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal variant="fadeUp" className="lg:col-span-5">
            <SectionLabel light>How it works</SectionLabel>
            <h2 className="mt-4 font-display text-4xl italic leading-tight text-accent md:text-5xl">
              How It Works
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.08} className="lg:col-span-7">
            {intro ? (
              <p className="max-w-lg text-sm leading-8 text-white/65 md:text-base">
                {intro}
              </p>
            ) : null}
          </Reveal>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <div
            className="pointer-events-none absolute top-5 right-0 left-0 hidden h-px bg-white/10 lg:block"
            aria-hidden="true"
          />
          {!prefersReducedMotion ? (
            <motion.div
              className="pointer-events-none absolute top-5 left-0 hidden h-px origin-left bg-accent/50 lg:block"
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
                      className="absolute top-5 left-10 h-full w-px bg-white/10 sm:hidden"
                      aria-hidden="true"
                    />
                  ) : null}

                  <div className="relative flex gap-5 sm:flex-col sm:gap-0">
                    <div className="relative z-10 shrink-0 sm:mb-8">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black text-[0.65rem] tracking-[0.28em] text-white/60 transition-all duration-500 ease-out group-hover:border-accent/60 group-hover:bg-accent/10 group-hover:text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 border-l border-white/10 pl-5 sm:border-0 sm:pl-0">
                      <h3 className="font-display text-2xl italic text-white transition-colors duration-300 group-hover:text-accent md:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/55">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              </RevealStaggerItem>
            ))}
          </RevealStagger>
        </div>

        {services && services.length > 0 ? (
          <div className="mt-16 lg:mt-20">
            <ServicesTabs services={services} images={serviceImages} theme="dark" />
          </div>
        ) : null}

      </div>
    </SectionTransition>
  );
}
