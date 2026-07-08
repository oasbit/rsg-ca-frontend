import { QuoteBanner } from "@/components/ui/QuoteBanner";
import { ServiceBlock } from "@/components/services/ServiceBlock";
import { PageHero } from "@/components/ui/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { resolveServicesContent } from "@/lib/wordpress/content";
import {
  resolveServiceBlockImages,
  resolveServicesHeroImage,
} from "@/lib/wordpress/images";
import { getPageBySlug } from "@/lib/wordpress/pages";

export async function generateMetadata() {
  const page = await getPageBySlug("services");
  const content = resolveServicesContent(page);

  return buildPageMetadata({
    title: "Services",
    description: content.intro,
    path: "/services",
  });
}

export default async function ServicesPage() {
  const page = await getPageBySlug("services");
  const content = resolveServicesContent(page);
  const serviceImages = resolveServiceBlockImages(page);
  const heroImage = resolveServicesHeroImage(page);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        headlineEmphasis="Strategic impact, delivered with precision"
        body={content.intro}
        imageUrl={heroImage.src}
        imageAlt={heroImage.alt}
      />
      <QuoteBanner
        quote={content.quote}
        author={content.quote_author}
        role={content.quote_role}
      />
      {content.service_blocks.map((service, index) => (
        <ServiceBlock
          key={service.title}
          service={service}
          index={index}
          imageUrl={serviceImages[index]}
          imageAlt={service.title}
        />
      ))}
    </>
  );
}
