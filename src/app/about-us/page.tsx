import { AboutDetailSection } from "@/components/about/AboutDetailSection";
import { FounderProfile } from "@/components/about/FounderProfile";
import { WhoWeAreSection } from "@/components/about/WhoWeAreSection";
import { PageHero } from "@/components/ui/PageHero";
import { buildPageMetadata } from "@/lib/seo";
import { resolveAboutContent } from "@/lib/wordpress/content";
import { BRAND, resolveAboutHeroImage, resolveFounderImage } from "@/lib/wordpress/images";
import { getPageBySlug } from "@/lib/wordpress/pages";

export async function generateMetadata() {
  const page = await getPageBySlug("about-us");
  const content = resolveAboutContent(page);

  return buildPageMetadata({
    title: "About Us",
    description: content.story.body,
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
        eyebrow={content.story.eyebrow}
        headline={content.story.heroSubtitle}
        headlineEmphasis={content.story.headline}
        bodyParagraphs={content.story.paragraphs}
        imageUrl={heroImage.src}
        imageAlt={heroImage.alt}
        cta={{ href: "/contact", label: "Start a conversation" }}
      />
      <WhoWeAreSection
        eyebrow={content.whoWeAre.eyebrow}
        headline={content.whoWeAre.headline}
        paragraphs={content.whoWeAre.paragraphs}
      />
      <FounderProfile
        name={content.founder.name}
        title={content.founder.title}
        paragraphs={content.founder.paragraphs}
        imageUrl={founderImage.src}
        imageAlt={founderImage.alt}
      />
      <AboutDetailSection
        title={content.approach.title}
        intro={content.approach.intro}
        executionLead={content.approach.executionLead}
        bullets={content.approach.bullets}
        closing={content.approach.closing}
        backgroundImage={BRAND.about.approachBg}
      />
      <AboutDetailSection
        title={content.focusAreas.title}
        intro={content.focusAreas.intro}
        bullets={content.focusAreas.bullets}
        closing={content.focusAreas.closing}
        backgroundImage={BRAND.about.focusBg}
      />
      <AboutDetailSection
        title={content.vision.title}
        intro={content.vision.body}
        backgroundImage={BRAND.about.communityPanel}
      />
      <AboutDetailSection
        title={content.team.title}
        paragraphs={content.team.paragraphs}
        backgroundImage={BRAND.about.teamBg}
      />
    </>
  );
}
