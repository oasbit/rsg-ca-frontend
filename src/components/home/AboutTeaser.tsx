"use client";

import Link from "next/link";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LineCta } from "@/components/ui/LineCta";
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

export function AboutTeaser({
  title,
  body,
  highlights = ["Leadership", "Empowerment", "Awareness", "Development"],
}: AboutTeaserProps) {
  const { lead, emphasis } = splitAboutTitle(title);

  return (
    <SectionTransition className="relative overflow-hidden bg-black py-24 text-white lg:py-32">
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 left-0 text-center font-display text-[clamp(3.5rem,14vw,11rem)] leading-none text-white/[0.03] italic select-none"
        >
          {emphasis || title}
        </p>

        <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <Reveal variant="fadeUp" className="lg:col-span-5">
            <SectionLabel light>About us</SectionLabel>

            <h2 className="mt-4">
              {lead ? (
                <span className="block text-sm font-light tracking-[0.24em] text-white/75 uppercase md:text-base">
                  {lead}
                </span>
              ) : null}
              <span className="mt-2 block font-display text-4xl leading-[1.02] text-accent italic md:text-5xl lg:text-6xl">
                {emphasis || title}
              </span>
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.08} className="lg:col-span-7">
            <p className="max-w-xl text-sm leading-8 text-muted md:text-base">
              {body}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8">
              <LineCta href="/about-us" light>
                Learn more
              </LineCta>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-xs tracking-[0.22em] text-white/60 uppercase transition-colors duration-300 hover:text-accent"
              >
                Get in touch
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <RevealStagger
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          stagger={0.08}
        >
          {highlights.map((item, index) => (
            <RevealStaggerItem key={item}>
              <article className="group relative h-full border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 ease-out hover:border-accent/30 hover:bg-white/[0.04]">
                <span className="text-[0.65rem] tracking-[0.32em] text-accent/70 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-2xl italic text-white transition-colors duration-300 group-hover:text-accent md:text-3xl">
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
