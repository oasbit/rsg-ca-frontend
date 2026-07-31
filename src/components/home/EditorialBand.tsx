"use client";

import Image from "next/image";
import { LineCta } from "@/components/ui/LineCta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { resolveEditorialBackgroundImage } from "@/lib/wordpress/images";

interface EditorialBandProps {
  eyebrow: string;
  title: string;
  headline: string;
  body: string;
}

function splitEditorialHeadline(headline: string): { lead: string; emphasis: string } {
  const marker = "Companies, Corporations Organizations and Communities";
  if (headline.includes(marker)) {
    return {
      lead: headline.replace(marker, "").trim(),
      emphasis: marker,
    };
  }

  const legacyMarker = "Organizations and Communities";
  if (headline.includes(legacyMarker)) {
    return {
      lead: headline.replace(legacyMarker, "").trim(),
      emphasis: marker,
    };
  }

  const words = headline.split(" ");
  if (words.length > 4) {
    const mid = Math.ceil(words.length / 2);
    return {
      lead: words.slice(0, mid).join(" "),
      emphasis: words.slice(mid).join(" "),
    };
  }

  return { lead: headline, emphasis: "" };
}

export function EditorialBand({ eyebrow, title, headline, body }: EditorialBandProps) {
  const { lead, emphasis } = splitEditorialHeadline(headline);
  const backgroundImage = resolveEditorialBackgroundImage();

  return (
    <SectionTransition className="relative bg-cream text-black">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-14 lg:px-10 lg:pt-24">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
          <Reveal variant="fadeUp" className="text-left">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[0.95] text-body sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.08} className="text-left">
            <h3>
              {lead ? (
                <span className="block text-xs font-light tracking-[0.24em] text-black/75 uppercase md:text-sm">
                  {lead}
                </span>
              ) : null}
              {emphasis ? (
                <span className="mt-2 block text-lg leading-8 text-body sm:mt-3 sm:text-xl md:text-2xl lg:text-3xl">
                  {emphasis}
                </span>
              ) : (
                <span className="mt-2 block text-lg leading-8 text-body sm:mt-3 sm:text-xl md:text-2xl lg:text-3xl">
                  {headline}
                </span>
              )}
            </h3>
            <p className="mt-6 max-w-xl text-sm leading-8 text-body md:mt-8 md:text-base">
              {body}
            </p>
            <div className="mt-5 flex md:mt-6">
              <LineCta href="/services">Explore services</LineCta>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal
        variant="fadeIn"
        delay={0.14}
        className="relative z-0 h-[7rem] w-full overflow-hidden sm:h-[8rem] md:h-[12.5rem] lg:h-[25rem]"
      >
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt}
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_8%,rgba(0,0,0,0.22)_32%,rgba(0,0,0,0.48)_55%,rgba(0,0,0,0.78)_78%,#000_100%)]"
        />
      </Reveal>
    </SectionTransition>
  );
}
