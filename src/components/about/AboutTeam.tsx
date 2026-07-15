"use client";

import Image from "next/image";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LineCta } from "@/components/ui/LineCta";
import { Reveal } from "@/components/motion/Reveal";
import { BRAND } from "@/lib/wordpress/images";

interface AboutTeamProps {
  title: string;
  paragraphs: string[];
}

export function AboutTeam({ title, paragraphs }: AboutTeamProps) {
  return (
    <section className="relative overflow-hidden bg-black pt-8 pb-16 text-white lg:pt-10 lg:pb-24">
      <Image
        src={BRAND.about.teamBg}
        alt=""
        fill
        className="object-cover object-[center_30%] opacity-40"
        sizes="100vw"
        aria-hidden
      />
      {/* Left-weighted gradient keeps left column fully legible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/15"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/60"
      />
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20 lg:items-end">

          {/* Left — narrative column */}
          <Reveal variant="fadeUp" className="lg:col-span-7">
            <SectionLabel light>Our Team</SectionLabel>
            <div className="mt-5 h-px w-10 bg-accent/50" />
            <h2 className="mt-6 font-display text-5xl italic leading-[0.95] text-accent md:text-6xl lg:text-7xl">
              {title}
            </h2>

            <div className="mt-10 h-px w-full bg-white/10" />

            <div className="mt-10 space-y-6 max-w-xl">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className={
                    index === 0
                      ? "text-base leading-8 text-white/85 md:text-lg"
                      : "text-sm leading-8 text-white/65 md:text-base"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Right — AP-style full-bleed invitation panel */}
          <Reveal variant="fadeUp" delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <div className="border-t-2 border-accent/40 pt-8">
              <p className="text-xs tracking-[0.3em] text-accent/70 uppercase">
                Partner with us
              </p>
              <h3 className="mt-4 font-display text-3xl italic leading-tight text-white md:text-4xl">
                Work with our team
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/60">
                Whether you&apos;re strengthening leadership, aligning your
                organization, or planning for sustainable growth — we&apos;re
                ready to partner with you.
              </p>
              <div className="mt-8">
                <LineCta href="/contact" light>
                  Start a conversation
                </LineCta>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
