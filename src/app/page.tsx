import { getPageBySlug } from "@/lib/wordpress/pages";
import { resolveHomeContent, resolveServicesContent } from "@/lib/wordpress/content";
import {
  resolveHomeHeroImage,
  resolveHomeServiceTabImages,
} from "@/lib/wordpress/images";
import { buildPageMetadata } from "@/lib/seo";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { EditorialBand } from "@/components/home/EditorialBand";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PillarsGrid } from "@/components/home/PillarsGrid";
import { ServicesTabs } from "@/components/home/ServicesTabs";
import { PageHero } from "@/components/ui/PageHero";

export async function generateMetadata() {
  const page = await getPageBySlug("coworking-space");
  const content = resolveHomeContent(page);

  return buildPageMetadata({
    title: "Strategic Planning and Leadership",
    description: content.hero_body,
    path: "/",
  });
}

export default async function HomePage() {
  const [homePage, servicesPage] = await Promise.all([
    getPageBySlug("coworking-space"),
    getPageBySlug("services"),
  ]);

  const content = resolveHomeContent(homePage);
  const servicesContent = resolveServicesContent(servicesPage);
  const heroImage = resolveHomeHeroImage(homePage);
  const serviceImages = resolveHomeServiceTabImages(servicesPage);

  return (
    <>
      <PageHero
        fullHeight
        eyebrow={content.hero_eyebrow}
        headline={content.hero_headline}
        headlineEmphasis={content.hero_headline_emphasis}
        body={content.hero_body}
        imageUrl={heroImage.src}
        imageAlt={heroImage.alt}
        cta={{ href: "/services", label: "Discover more" }}
        footer={<PillarsGrid pillars={content.pillars} embedded />}
      />
      <EditorialBand
        headline={content.editorial_headline}
        body={content.editorial_body}
      />
      <AboutTeaser
        title={content.about_teaser_title}
        body={content.about_teaser_body}
        highlights={content.pillars.map((pillar) => pillar.title)}
      />
      <ServicesTabs
        services={servicesContent.service_blocks}
        images={serviceImages}
      />
      <HowItWorks steps={content.process_steps} />
    </>
  );
}
