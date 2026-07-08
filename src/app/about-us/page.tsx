import { ApproachGrid } from "@/components/about/ApproachGrid";
import { FounderProfile } from "@/components/about/FounderProfile";
import { PageHero } from "@/components/ui/PageHero";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { buildPageMetadata } from "@/lib/seo";
import { resolveAboutContent } from "@/lib/wordpress/content";
import { resolveAboutHeroImage, resolveFounderImage } from "@/lib/wordpress/images";
import { getPageBySlug } from "@/lib/wordpress/pages";

export async function generateMetadata() {
  const page = await getPageBySlug("about-us");
  const content = resolveAboutContent(page);

  return buildPageMetadata({
    title: "About Us",
    description: content.story_body,
    path: "/about-us",
  });
}

export default async function AboutPage() {
  const aboutPage = await getPageBySlug("about-us");

  const content = resolveAboutContent(aboutPage);
  const heroImage = resolveAboutHeroImage(aboutPage);
  const founderImage = resolveFounderImage(aboutPage);

  return (
    <>
      <PageHero
        eyebrow={content.story_eyebrow}
        headlineEmphasis={content.story_headline}
        body={content.story_body}
        imageUrl={heroImage.src}
        imageAlt={heroImage.alt}
      />
      <SectionTransition />
      <FounderProfile
        name={content.founder_name}
        title={content.founder_title}
        bio={content.founder_bio}
        imageUrl={founderImage.src}
        imageAlt={founderImage.alt}
      />
      <ApproachGrid
        blocks={content.approach_blocks}
        vision={content.vision}
        team={content.team}
      />
    </>
  );
}
