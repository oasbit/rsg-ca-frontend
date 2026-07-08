"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LineCta } from "@/components/ui/LineCta";
import { TransparentImage } from "@/components/ui/TransparentImage";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { isTransparentAsset } from "@/lib/wordpress/images";
import type { WPServiceBlock } from "@/lib/wordpress/types";

interface ServicesTabsProps {
  services: WPServiceBlock[];
  images?: string[];
}

function serviceSlug(service: WPServiceBlock): string {
  return service.title.toLowerCase().replace(/\s+/g, "-");
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z" />
    </svg>
  );
}

export function ServicesTabs({ services, images = [] }: ServicesTabsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex] ?? services[0];

  const selectTab = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      let nextIndex: number | null = null;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % services.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + services.length) % services.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = services.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        selectTab(nextIndex);
      }
    },
    [selectTab, services.length],
  );

  if (!activeService) return null;

  const activeImage = images[activeIndex];
  const showImage = Boolean(activeImage);
  const isTransparent = activeImage ? isTransparentAsset(activeImage) : false;

  return (
    <section className="relative overflow-hidden bg-black pb-24 text-white lg:pb-32">
      <GrainOverlay />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal variant="fadeUp">
          <div
            role="tablist"
            aria-label="Services"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={service.title}
                  id={`service-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    "border-t px-4 py-5 text-center transition-all duration-400 ease-out sm:px-5 sm:py-6",
                    isActive
                      ? "border-accent/40 bg-black text-accent"
                      : "border-white/10 bg-black text-muted hover:text-white",
                  )}
                >
                  <span className="inline-flex items-center justify-center gap-2 text-[0.62rem] tracking-[0.22em] uppercase sm:text-[0.65rem]">
                    <ListIcon
                      className={cn(
                        "h-3.5 w-3.5 shrink-0",
                        isActive ? "text-accent" : "text-accent/70",
                      )}
                    />
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="relative mt-0 border border-t-0 border-white/10 bg-black text-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeService.title}
              id={`service-panel-${activeIndex}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${activeIndex}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 p-8 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-12 xl:p-14"
            >
              <div
                className={cn(showImage ? "lg:col-span-7" : "lg:col-span-12")}
              >
                <p className="text-xs tracking-[0.28em] text-accent uppercase">
                  {activeService.tagline}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-white italic md:text-4xl lg:text-5xl">
                  {activeService.title}
                </h3>
                <p className="mt-6 max-w-2xl text-sm leading-8 text-muted md:text-base">
                  {activeService.body}
                </p>

                {(activeService.paragraphs ?? []).map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mt-6 max-w-2xl text-sm leading-8 text-muted md:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

                {activeService.bulletsLead ? (
                  <p className="mt-8 text-sm font-medium text-white/90 md:text-base">
                    {activeService.bulletsLead}
                  </p>
                ) : null}

                <ul className={cn("space-y-4", activeService.bulletsLead ? "mt-4" : "mt-8")}>
                  {activeService.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={cn(
                        "flex gap-3 text-sm",
                        activeService.quoteBullets
                          ? "font-display italic text-white/75"
                          : "text-white/85",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-2 shrink-0 bg-accent",
                          activeService.quoteBullets ? "h-px w-6" : "h-px w-4",
                        )}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <LineCta
                    href={
                      activeService.detailHref ??
                      `/services#${serviceSlug(activeService)}`
                    }
                    light
                  >
                    Learn more
                  </LineCta>
                  <Link
                    href="/contact"
                    className="text-xs tracking-[0.22em] text-white/60 uppercase transition-colors duration-300 hover:text-accent"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>

              {showImage ? (
                <div className="flex justify-center lg:col-span-5 lg:justify-end">
                  {isTransparent ? (
                    <TransparentImage
                      src={activeImage}
                      alt={activeService.title}
                      className="w-full max-w-xs lg:max-w-sm"
                      imageClassName="max-h-[20rem] lg:max-h-[24rem]"
                      sizes="(max-width: 1024px) 80vw, 384px"
                    />
                  ) : (
                    <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden border border-white/10">
                      <Image
                        src={activeImage}
                        alt={activeService.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 80vw, 448px"
                      />
                    </div>
                  )}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
