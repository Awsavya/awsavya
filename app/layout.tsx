import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import { founders, services, site } from "@/lib/site";
import { HeadScript } from "@/components/chrome/HeadScript";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { MobileMenu } from "@/components/chrome/MobileMenu";
import { GroundWatcher } from "@/components/chrome/GroundWatcher";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { ReadyFlag } from "@/components/chrome/ReadyFlag";
import "./globals.css";
import "./styles/chrome.css";
import "./styles/home.css";
import "./styles/work.css";
import "./styles/pages.css";

// Archivo sets every word; hierarchy comes from its width axis. Martian Mono is for live data only.
const archivo = Archivo({ subsets: ["latin"], style: ["normal"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const martian = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--font-martian", display: "swap", preload: false });

// Each page sets its own canonical. The share image comes from app/opengraph-image.tsx for every route.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · AWSAVYA" },
  description: site.description,
  applicationName: site.name,
  openGraph: { title: site.title, description: site.description, type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F5F4F8" };

// Built only from lib/site.ts, so it never claims more than the pages do.
const organization = {
  "@context": "https://schema.org",
  // Organization only: ProfessionalService is a LocalBusiness type and would need a street address we don't publish.
  "@type": "Organization",
  "@id": `${site.url}#organization`,
  name: site.name,
  alternateName: site.alternateName,
  url: site.url,
  sameAs: site.sameAs,
  logo: `${site.url}/favicon-512.png`, // a 512px square; Logo.png is 5016px and far heavier
  image: `${site.url}/opengraph-image`,
  email: site.email,
  description: site.description,
  founder: founders.map(f => ({ "@type": "Person", name: f.name })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AWSAVYA services",
    itemListElement: services.map(s => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.short, url: `${site.url}/services/${s.slug}` },
    })),
  },
  contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: site.email, url: `${site.url}/contact` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-motion="on" className={`${archivo.variable} ${martian.variable}`} suppressHydrationWarning>
      <head>
        <HeadScript />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileMenu />
        <GroundWatcher />
        <SmoothScroll />
        <ReadyFlag />
      </body>
    </html>
  );
}
