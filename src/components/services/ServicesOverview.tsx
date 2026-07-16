"use client";

import Link from "next/link";
import {
  SERVICE_TAB_ICONS_BY_INDEX,
} from "@/components/icons/ServiceIcons";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import { SectionTransition } from "@/components/motion/SectionTransition";
import type { WPServiceBlock } from "@/lib/wordpress/types";

interface ServicesOverviewProps {
  services: WPServiceBlock[];
}

function serviceSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <SectionTransition className="bg-black py-10 text-white sm:py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealStagger
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {services.map((service, index) => {
            const Icon = SERVICE_TAB_ICONS_BY_INDEX[index] ?? SERVICE_TAB_ICONS_BY_INDEX[0];

            return (
              <RevealStaggerItem key={service.title}>
                <Link
                  href={`#${serviceSlug(service.title)}`}
                  className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-black/30 px-5 py-5 text-center transition-all duration-400 hover:border-accent/40 hover:bg-black/50 sm:px-6 sm:py-6"
                >
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-colors duration-400 group-hover:border-accent/60 group-hover:bg-accent/20 sm:mb-5 sm:h-14 sm:w-14">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-[0.65rem] tracking-[0.22em] text-white uppercase">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted transition-colors duration-400 group-hover:text-white/80">
                    {service.tagline}
                  </p>
                </Link>
              </RevealStaggerItem>
            );
          })}
        </RevealStagger>
      </div>
    </SectionTransition>
  );
}
