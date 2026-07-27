"use client";

import Image from "next/image";
import { LineCta } from "@/components/ui/LineCta";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { resolveEditorialBackgroundImage } from "@/lib/wordpress/images";

interface EditorialBandProps {
  headline: string;
  body: string;
}

function splitEditorialHeadline(headline: string): { lead: string; emphasis: string } {
  const marker = "Organizations and Communities";
  if (headline.includes(marker)) {
    return {
      lead: headline.replace(marker, "").trim(),
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

export function EditorialBand({ headline, body }: EditorialBandProps) {
  const { lead, emphasis } = splitEditorialHeadline(headline);
  const backgroundImage = resolveEditorialBackgroundImage();

  return (
    <SectionTransition className="relative bg-cream text-black">
      <div className="mx-auto max-w-4xl px-6 pt-10 text-center sm:pt-14 lg:px-10 lg:pt-24">
        <Reveal variant="fadeUp">
          <h2>
            {lead ? (
              <span className="block text-sm font-light tracking-[0.24em] text-black/80 uppercase md:text-base">
                {lead}
              </span>
            ) : null}
            {emphasis ? (
              <span className="mt-2 block font-display text-2xl leading-tight text-body sm:mt-3 sm:text-3xl md:text-5xl lg:text-6xl">
                {emphasis}
              </span>
            ) : (
              <span className="mt-2 block font-display text-2xl leading-tight text-body sm:mt-3 sm:text-3xl md:text-5xl lg:text-6xl">
                {headline}
              </span>
            )}
          </h2>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.08} className="mt-6 pb-3 lg:pb-4">
          <p className="mx-auto max-w-md text-sm leading-8 text-body md:text-base">{body}</p>
          <div className="mt-5 flex justify-center">
            <LineCta href="/services">Explore services</LineCta>
          </div>
        </Reveal>
      </div>

      <Reveal
        variant="fadeIn"
        delay={0.14}
        className="relative z-0 h-[6rem] w-full overflow-hidden sm:h-[8rem] md:h-[12.5rem] lg:h-[25rem]"
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
