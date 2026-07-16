import { PrivacyContent } from "@/components/privacy/PrivacyContent";
import { PageHero } from "@/components/ui/PageHero";
import { ValuesBand } from "@/components/ui/ValuesBand";
import { SectionTransition } from "@/components/motion/SectionTransition";
import { buildPageMetadata } from "@/lib/seo";
import { resolvePrivacyContent } from "@/lib/wordpress/content";
import { resolvePrivacyHeroImage } from "@/lib/wordpress/images";
import { getPageBySlug } from "@/lib/wordpress/pages";

export async function generateMetadata() {
  const page = await getPageBySlug("privacy-policy-2");
  const content = resolvePrivacyContent(page);

  return buildPageMetadata({
    title: content.title,
    description: "Privacy policy for RS Group Advance Consulting.",
    path: "/privacy-policy",
  });
}

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug("privacy-policy-2");
  const content = resolvePrivacyContent(page);
  const heroImage = resolvePrivacyHeroImage();

  return (
    <>
      <PageHero
        eyebrow="Legal"
        headline="RS Group Advance Consulting"
        headlineEmphasis={content.title}
        imageUrl={heroImage.src}
        imageAlt={heroImage.alt}
      />
      <ValuesBand />
      <SectionTransition className="bg-black pb-10 pt-8 text-white sm:pb-14 sm:pt-10 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <PrivacyContent body={content.body} />
        </div>
      </SectionTransition>
    </>
  );
}
