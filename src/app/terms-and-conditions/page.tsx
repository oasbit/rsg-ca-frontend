import { PrivacyContent } from "@/components/privacy/PrivacyContent";
import { PageHero } from "@/components/ui/PageHero";
import { ValuesBand } from "@/components/ui/ValuesBand";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { buildPageMetadata } from "@/lib/seo";
import { resolveTermsContent } from "@/lib/wordpress/content";
import { resolveTermsHeroImage } from "@/lib/wordpress/images";
import { getPageBySlug } from "@/lib/wordpress/pages";

const TERMS_SLUG = "terms-and-conditions";

export async function generateMetadata() {
  const page = await getPageBySlug(TERMS_SLUG);
  const content = resolveTermsContent(page);

  return buildPageMetadata({
    title: content.title,
    description:
      "Terms and conditions for using the RS Group Advanced Consulting website and engaging our consulting services.",
    path: "/terms-and-conditions",
  });
}

export default async function TermsAndConditionsPage() {
  const page = await getPageBySlug(TERMS_SLUG);
  const content = resolveTermsContent(page);
  const heroImage = resolveTermsHeroImage();

  return (
    <>
      <PageHero
        eyebrow="Legal"
        headline="RS Group Advanced Consulting"
        headlineEmphasis={content.title}
        imageUrl={heroImage.src}
        imageAlt={heroImage.alt}
      />
      <ValuesBand />
      <SectionTransition className="bg-black pb-6 pt-5 text-white sm:pb-14 sm:pt-10 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
          <PrivacyContent body={content.body} />
        </div>
      </SectionTransition>
    </>
  );
}
