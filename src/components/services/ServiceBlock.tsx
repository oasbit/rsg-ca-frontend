"use client";

import Image from "next/image";
import { LineCta } from "@/components/ui/LineCta";
import { TransparentImage } from "@/components/ui/TransparentImage";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { isTransparentAsset } from "@/lib/wordpress/images";
import type { WPServiceBlock } from "@/lib/wordpress/types";

interface ServiceBlockProps {
  service: WPServiceBlock;
  imageUrl?: string | null;
  imageAlt?: string;
  index: number;
}

export function ServiceBlock({
  service,
  imageUrl,
  imageAlt = service.title,
  index,
}: ServiceBlockProps) {
  const reversed = index % 2 === 1;
  const dark = index % 2 === 0;
  const isTransparent = imageUrl ? isTransparentAsset(imageUrl) : false;
  const paragraphs = service.paragraphs ?? [];

  const solid = dark ? "bg-black" : "bg-surface";

  return (
    <section
      id={service.title.toLowerCase().replace(/\s+/g, "-")}
      className={cn("py-20 text-white lg:py-28", solid)}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
        <Reveal
          variant={reversed ? "slideLeft" : "slideRight"}
          className={reversed ? "lg:order-2" : ""}
        >
          <p className="text-xs tracking-[0.28em] text-accent uppercase">
            {service.tagline}
          </p>
          <h2 className="mt-4 font-display text-4xl italic md:text-5xl">
            {service.title}
          </h2>
          <p className="mt-6 text-sm leading-8 text-muted md:text-base">
            {service.body}
          </p>

          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="mt-6 text-sm leading-8 text-muted md:text-base"
            >
              {paragraph}
            </p>
          ))}

          {service.bulletsLead ? (
            <p className="mt-8 text-sm font-medium text-white/90 md:text-base">
              {service.bulletsLead}
            </p>
          ) : null}

          <ul className={cn("space-y-4", service.bulletsLead ? "mt-4" : "mt-8")}>
            {service.bullets.map((bullet) => (
              <li
                key={bullet}
                className={cn(
                  "flex gap-3 text-sm md:text-base",
                  service.quoteBullets
                    ? "font-display italic text-white/75"
                    : "text-white/85",
                )}
              >
                <span
                  className={cn(
                    "mt-2 shrink-0 bg-accent",
                    service.quoteBullets ? "h-px w-6" : "h-px w-4",
                  )}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <LineCta href="/contact" light>
              Start a conversation
            </LineCta>
          </div>
        </Reveal>

        {imageUrl ? (
          <Reveal
            variant={reversed ? "slideRight" : "slideLeft"}
            delay={0.1}
            className={reversed ? "lg:order-1" : ""}
          >
            {isTransparent ? (
              <TransparentImage
                src={imageUrl}
                alt={imageAlt}
                className="mx-auto max-w-sm lg:mx-0"
                imageClassName="max-h-[22rem] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            ) : (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              </div>
            )}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
