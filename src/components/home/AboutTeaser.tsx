"use client";

import { LineCta } from "@/components/ui/LineCta";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";

interface AboutTeaserProps {
  title: string;
  body: string;
  highlights?: string[];
}

function splitAboutTitle(title: string): { lead: string; emphasis: string } {
  const normalized = title.toLowerCase();

  if (normalized === "who we are") {
    return { lead: "Who", emphasis: "We Are" };
  }

  if (normalized === "about us") {
    return { lead: "About", emphasis: "Us" };
  }

  const words = title.split(" ");
  if (words.length > 2) {
    return {
      lead: words.slice(0, Math.ceil(words.length / 2)).join(" "),
      emphasis: words.slice(Math.ceil(words.length / 2)).join(" "),
    };
  }

  return { lead: "", emphasis: title };
}

export function AboutTeaser({
  title,
  body,
  highlights = ["Leadership", "Empowerment", "Awareness", "Development"],
}: AboutTeaserProps) {
  const { lead, emphasis } = splitAboutTitle(title);

  return (
    <SectionTransition className="relative overflow-hidden bg-black py-10 text-white sm:py-14 lg:py-32">
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 left-0 text-center font-display text-[clamp(3.5rem,14vw,11rem)] leading-none text-white/[0.03] select-none"
        >
          {emphasis || title}
        </p>

        <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal variant="fadeUp" className="lg:col-span-5">
            <SectionLabel light>About us</SectionLabel>

            <h2 className="mt-4">
              {lead ? (
                <span className="block text-sm font-light tracking-[0.24em] text-white/75 uppercase md:text-base">
                  {lead}
                </span>
              ) : null}
              <span className="mt-2 block font-display text-3xl leading-[1.02] text-accent sm:text-4xl md:text-5xl lg:text-6xl">
                {emphasis || title}
              </span>
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.08} className="lg:col-span-7">
            <p className="max-w-xl text-sm leading-8 text-muted md:text-base">
              {body}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <LineCta href="/about-us" light>
                Learn more
              </LineCta>
              <OutlineButton href="/contact" variant="light" icon="arrow-right">
                Get in touch
              </OutlineButton>
            </div>
          </Reveal>
        </div>

        <RevealStagger
          className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:mt-20 lg:grid-cols-4"
          stagger={0.08}
        >
          {highlights.map((item, index) => (
            <RevealStaggerItem key={item}>
              <article className="group relative h-full border border-white/10 bg-white/[0.02] p-4 transition-all duration-500 ease-out hover:border-accent/30 hover:bg-white/[0.04] sm:p-6">
                <span className="text-[0.65rem] tracking-[0.32em] text-accent/70 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-2xl text-white transition-colors duration-300 group-hover:text-accent md:text-3xl">
                  {item}
                </h3>
                <div className="mt-6 h-px w-10 bg-white/20 transition-all duration-500 group-hover:w-full group-hover:bg-accent/60" />
              </article>
            </RevealStaggerItem>
          ))}
        </RevealStagger>
      </div>
    </SectionTransition>
  );
}
