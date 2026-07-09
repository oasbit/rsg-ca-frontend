import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { PageHero } from "@/components/ui/PageHero";
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
        headlineEmphasis={content.headline}
        imageUrl={heroImage.src}
        imageAlt={heroImage.alt}
      />
      <section className="bg-black pb-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
          <ContactInfo
            phone={content.phone}
            email={content.email}
            address={content.address}
            socialLinks={content.social_links}
          />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
