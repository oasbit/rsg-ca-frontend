"use client";

import Image from "next/image";
import { LineCta } from "@/components/ui/LineCta";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";
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
    <SectionTransition
      id={service.title.toLowerCase().replace(/\s+/g, "-")}
      className={cn("py-20 text-white lg:py-28", solid)}
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-stretch lg:gap-16 lg:px-10">
        {/* Text column — each element reveals independently for a cascade effect */}
        <div className={cn("lg:self-center", reversed ? "lg:order-2" : "")}>
          <Reveal variant={reversed ? "slideLeft" : "slideRight"} delay={0}>
            <p className="text-xs tracking-[0.28em] text-accent uppercase">
              {service.tagline}
            </p>
            <h2 className="mt-4 font-display text-4xl italic md:text-5xl">
              {service.title}
            </h2>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.1}>
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
          </Reveal>

          {(service.bullets.length > 0) ? (
            <Reveal variant="fadeUp" delay={0.18}>
              {service.bulletsLead ? (
                <p className="mt-8 text-sm font-medium text-white/90 md:text-base">
                  {service.bulletsLead}
                </p>
              ) : null}
              <RevealStagger
                className={cn("space-y-4", service.bulletsLead ? "mt-4" : "mt-8")}
                stagger={0.05}
              >
                {service.bullets.map((bullet) => (
                  <RevealStaggerItem key={bullet}>
                    <li
                      className={cn(
                        "flex gap-3 text-sm md:text-base list-none",
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
                  </RevealStaggerItem>
                ))}
              </RevealStagger>
            </Reveal>
          ) : null}

          <Reveal variant="fadeUp" delay={0.26}>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              {service.detailHref ? (
                <LineCta href={service.detailHref} light>
                  Explore the program
                </LineCta>
              ) : null}
              <LineCta
                href="/contact"
                light
                className={service.detailHref ? "text-white/60 hover:text-accent" : undefined}
              >
                Start a conversation
              </LineCta>
            </div>
          </Reveal>
        </div>

        {imageUrl ? (
          <Reveal
            variant={reversed ? "slideRight" : "slideLeft"}
            delay={0.12}
            className={cn("lg:h-full", reversed ? "lg:order-1" : "")}
          >
            <div
              className={cn(
                "relative h-[22rem] w-full overflow-hidden sm:h-[26rem] lg:h-full lg:min-h-[28rem]",
                isTransparent
                  ? ""
                  : "rounded-2xl border border-white/10",
              )}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className={cn(
                  isTransparent
                    ? "object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    : "object-cover",
                )}
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>
          </Reveal>
        ) : null}
      </div>
    </SectionTransition>
  );
}
