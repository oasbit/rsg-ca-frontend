"use client";

import Link from "next/link";
import { RevealStagger, RevealStaggerItem } from "@/components/motion/RevealStagger";
import type { WPServiceBlock } from "@/lib/wordpress/types";

interface ServicesOverviewProps {
  services: WPServiceBlock[];
}

function serviceSlug(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}

function PlanningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
    </svg>
  );
}

function LeadershipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
    </svg>
  );
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 20c0-2.8 2.7-5 6-5M13 20c0-2.2 2-4 4.5-4" />
    </svg>
  );
}

function FacilitationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4l1.4-1.4m10-10 1.4-1.4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

const ICONS = [PlanningIcon, LeadershipIcon, TeamIcon, FacilitationIcon];

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <section className="bg-black py-16 text-white lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <RevealStagger
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {services.map((service, index) => {
            const Icon = ICONS[index] ?? PlanningIcon;

            return (
              <RevealStaggerItem key={service.title}>
                <Link
                  href={`#${serviceSlug(service.title)}`}
                  className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-black/30 px-6 py-8 text-center transition-all duration-400 hover:border-accent/40 hover:bg-black/50"
                >
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-colors duration-400 group-hover:border-accent/60 group-hover:bg-accent/20">
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
    </section>
  );
}
