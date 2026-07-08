import { ConnectCta } from "@/components/home/ConnectCta";
import { resolveHomeContent } from "@/lib/wordpress/content";
import { getPageBySlug } from "@/lib/wordpress/pages";

export async function ConnectCtaSection() {
  const homePage = await getPageBySlug("coworking-space");
  const { cta_title, cta_body } = resolveHomeContent(homePage);

  return <ConnectCta title={cta_title} body={cta_body} />;
}
