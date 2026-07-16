import { SectionTransition } from "@/components/motion/SectionTransition";
import { ServicesTabs } from "@/components/home/ServicesTabs";
import type { WPServiceBlock } from "@/lib/wordpress/types";

interface ServicesTabsSectionProps {
  services: WPServiceBlock[];
  images?: string[];
}

export function ServicesTabsSection({ services, images }: ServicesTabsSectionProps) {
  return (
    <SectionTransition className="bg-cream pt-2 pb-2 text-black lg:pt-3 lg:pb-3">
      <ServicesTabs services={services} images={images} theme="light" />
    </SectionTransition>
  );
}
