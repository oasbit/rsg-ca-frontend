"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LineCta } from "@/components/ui/LineCta";
import { OutlineButton } from "@/components/ui/OutlineButton";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { isTransparentAsset } from "@/lib/wordpress/images";
import { ServiceTabIcon } from "@/components/icons/ServiceIcons";
import type { WPServiceBlock } from "@/lib/wordpress/types";

interface ServicesTabsProps {
  services: WPServiceBlock[];
  images?: string[];
  theme?: "dark" | "light";
  embedded?: boolean;
}

function serviceSlug(service: WPServiceBlock): string {
  return service.title.toLowerCase().replace(/\s+/g, "-");
}

export function ServicesTabs({
  services,
  images = [],
  theme = "dark",
  embedded = false,
}: ServicesTabsProps) {
  const isLight = theme === "light";
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
    <div
      className={cn(
        "relative",
        !embedded && "overflow-hidden",
        !embedded && (isLight ? "bg-cream" : "bg-black pb-10 text-white sm:pb-14 lg:pb-32"),
      )}
    >
      {!isLight && !embedded ? <GrainOverlay /> : null}

      <div
        className={cn(
          "relative",
          !embedded && !isLight && "mx-auto max-w-7xl px-6 lg:px-10",
        )}
      >
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
                    "border-b-2 px-3 py-4 text-center transition-all duration-400 ease-out sm:px-5 sm:py-5 lg:py-6",
                    isLight
                      ? isActive
                        ? "border-body bg-cream text-black"
                        : "border-transparent bg-cream text-body/50 hover:border-body/30 hover:text-black"
                      : isActive
                        ? "border-accent bg-black text-accent"
                        : "border-transparent bg-black text-muted hover:border-accent/30 hover:text-white",
                  )}
                >
                  <span className="inline-flex items-center justify-center gap-2 text-[0.62rem] tracking-[0.22em] uppercase sm:text-[0.65rem]">
                    <ServiceTabIcon
                      title={service.title}
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isLight
                          ? isActive
                            ? "text-black"
                            : "text-body/50"
                          : isActive
                            ? "text-accent"
                            : "text-accent/70",
                      )}
                    />
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          className={cn(
            "relative mt-0",
            isLight ? "bg-cream text-black" : "bg-black text-white",
          )}
        >
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
              className="grid gap-6 p-5 sm:gap-8 sm:p-6 lg:grid-cols-12 lg:items-stretch lg:gap-12 lg:p-12 xl:p-14"
            >
              <div
                className={cn(
                  "lg:self-center",
                  showImage ? "lg:col-span-7" : "lg:col-span-12",
                )}
              >
                <p className={cn("text-xs tracking-[0.28em] uppercase", isLight ? "text-body/70" : "text-accent")}>
                  {activeService.tagline}
                </p>
                <h3
                  className={cn(
                    "mt-2 font-display text-2xl leading-tight sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl",
                    isLight ? "text-black" : "text-white",
                  )}
                >
                  {activeService.title}
                </h3>
                <p
                  className={cn(
                    "mt-6 max-w-2xl text-sm leading-8 md:text-base",
                    isLight ? "text-body" : "text-muted",
                  )}
                >
                  {activeService.body}
                </p>

                {(activeService.paragraphs ?? []).map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className={cn(
                      "mt-6 max-w-2xl text-sm leading-8 md:text-base",
                      isLight ? "text-body" : "text-muted",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}

                {activeService.bulletsLead ? (
                  <p
                    className={cn(
                      "mt-8 text-sm font-medium md:text-base",
                      isLight ? "text-black/90" : "text-white/90",
                    )}
                  >
                    {activeService.bulletsLead}
                  </p>
                ) : null}

                <ul className={cn("space-y-3", activeService.bulletsLead ? "mt-4" : "mt-8")}>
                  {activeService.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={cn(
                        "group flex gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-300",
                        isLight
                          ? "border-black/10 hover:border-body/35 hover:bg-body/[0.06] hover:shadow-sm"
                          : "border-white/10 hover:border-accent/35 hover:bg-white/[0.05]",
                        activeService.quoteBullets
                          ? cn("font-display", isLight ? "text-black/75" : "text-white/75")
                          : isLight
                            ? "text-black/85"
                            : "text-white/85",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-2 shrink-0 transition-all duration-300 group-hover:w-6",
                          isLight ? "bg-body" : "bg-accent",
                          activeService.quoteBullets ? "h-px w-6" : "h-px w-4",
                        )}
                      />
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
                  <LineCta
                    href={
                      activeService.detailHref ??
                      `/services#${serviceSlug(activeService)}`
                    }
                    light={!isLight}
                  >
                    Learn more
                  </LineCta>
                  <OutlineButton
                    href="/contact"
                    variant={isLight ? "dark" : "light"}
                    icon="arrow-right"
                  >
                    Get in touch
                  </OutlineButton>
                </div>
              </div>

              {showImage ? (
                <div className="lg:col-span-5">
                  <div
                    className={cn(
                      "relative h-[14rem] w-full overflow-hidden sm:h-[18rem] md:h-[22rem] lg:h-full lg:min-h-[26rem]",
                      isTransparent
                        ? ""
                        : cn("border", isLight ? "border-black/10" : "border-white/10"),
                    )}
                  >
                    <Image
                      src={activeImage}
                      alt={activeService.title}
                      fill
                      className={cn(
                        isTransparent
                          ? "object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                          : "object-cover",
                      )}
                      sizes="(max-width: 1024px) 90vw, 40vw"
                    />
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
