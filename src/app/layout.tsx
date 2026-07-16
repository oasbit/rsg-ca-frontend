import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ConnectCtaSection } from "@/components/layout/ConnectCtaSection";
import { PageTransition } from "@/components/motion/PageTransition";
import { getSiteUrl, organizationJsonLd } from "@/lib/seo";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "RS Group Advance Consulting",
    template: "%s | RS Group Advance Consulting",
  },
  description:
    "Strategic planning, leadership development, and team-building for organizations and communities.",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "RS Group Advance Consulting",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className="min-h-full bg-black text-white antialiased"
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <Header />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
          <ConnectCtaSection />
        </main>
        <Footer />
      </body>
    </html>
  );
}
