import { PrivacyContent } from "@/components/privacy/PrivacyContent";
import { PageHero } from "@/components/ui/PageHero";
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
      <SectionTransition className="bg-black pb-24 text-white">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <PrivacyContent body={content.body} />
        </div>
      </SectionTransition>
    </>
  );
}
