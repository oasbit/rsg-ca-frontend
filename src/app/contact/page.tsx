import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { AbstractGlobe } from "@/components/contact/AbstractGlobe";
import { PageHero } from "@/components/ui/PageHero";
import { ValuesBand } from "@/components/ui/ValuesBand";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { buildPageMetadata } from "@/lib/seo";
import { resolveContactContent } from "@/lib/wordpress/content";
import { resolveContactHeroImage } from "@/lib/wordpress/images";
import { getPageBySlug } from "@/lib/wordpress/pages";

export async function generateMetadata() {
  const page = await getPageBySlug("contact");
  const content = resolveContactContent(page);

  return buildPageMetadata({
    title: "Contact",
    description: `Contact RS Group Advance Consulting at ${content.email} or ${content.phone}.`,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const page = await getPageBySlug("contact");
  const content = resolveContactContent(page);
  const heroImage = resolveContactHeroImage();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        headline={content.hero_subtitle}
        headlineEmphasis={content.headline}
        bodyParagraphs={[content.hero_body]}
        imageUrl={heroImage.src}
        imageAlt={heroImage.alt}
        imageGrayscale
      />
      <ValuesBand />
      <SectionTransition className="relative overflow-hidden bg-black py-10 text-white sm:py-14 lg:py-24">
        <AbstractGlobe className="left-[12%] top-[42%] h-[160vmin] w-[160vmin] max-h-[72rem] max-w-[72rem] -translate-x-1/2 -translate-y-1/2 opacity-45 sm:left-[10%] lg:left-[8%]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_12%_42%,rgba(241,236,220,0.05)_0%,transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-6 sm:gap-10 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <ContactInfo
            phone={content.phone}
            email={content.email}
            socialLinks={content.social_links}
          />
          <ContactForm />
        </div>
      </SectionTransition>
    </>
  );
}
