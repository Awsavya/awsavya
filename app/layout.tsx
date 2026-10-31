import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MotionProvider from "@/components/MotionProvider";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "AWSAVYA — Apps, Web, Software, AI & Automation",
    template: "%s — AWSAVYA",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: "AWSAVYA",
  category: "technology",
  icons: {
    icon: [
      // PNG preferred by Google Search Console for rich favicon display
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      // Fallback format
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    type: "website",
    url: siteConfig.canonicalUrl,
    siteName: "AWSAVYA",
    title: "AWSAVYA — Apps, Web, Software, AI & Automation",
    description: siteConfig.description,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AWSAVYA — Apps, Web, Software, AI & Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AWSAVYA — Apps, Web, Software, AI & Automation",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f9fb",
};

// Verified Organization & ProfessionalService structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${siteConfig.canonicalUrl}#organization`,
  name: "AWSAVYA",
  alternateName: ["AWSAVYA Studio", "awsavya.in", "AWSAVYA Technologies"],
  url: siteConfig.canonicalUrl,
  logo: `${siteConfig.canonicalUrl}/favicon-192.png`,
  image: `${siteConfig.canonicalUrl}/opengraph-image`,
  email: siteConfig.email,
  description: siteConfig.description,
  knowsAbout: [
    "Custom Software Development",
    "Mobile App Development",
    "React Native",
    "Android Jetpack Compose",
    "Next.js Web Platforms",
    "Applied Artificial Intelligence",
    "Large Language Model Integration",
    "Workflow Automation",
    "API Integration",
    "Enterprise ERP Systems",
    "PostgreSQL",
    "Full-Stack Software Engineering",
  ],
  serviceType: [
    "Custom Software Development",
    "Mobile Application Development",
    "Web Application Development",
    "Applied AI Engineering",
    "Workflow Automation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AWSAVYA Core Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "App Development",
          description: "Cross-platform mobile apps built with React Native and Android Jetpack Compose with offline-first local database sync.",
          url: `${siteConfig.canonicalUrl}/services#app`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Experiences",
          description: "Performant, accessible, server-rendered Next.js web applications and platforms.",
          url: `${siteConfig.canonicalUrl}/services#web`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Software",
          description: "Tailored operations dashboards, internal tools, and manufacturing ERP systems.",
          url: `${siteConfig.canonicalUrl}/services#software`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Applied AI",
          description: "Source-grounded domain assistants, document search, and verified AI pipelines that eliminate hallucinations.",
          url: `${siteConfig.canonicalUrl}/services#ai`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automation",
          description: "Resilient event-driven webhook pipelines, API integrations, and repeatable business process automation.",
          url: `${siteConfig.canonicalUrl}/services#automation`,
        },
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: siteConfig.email,
    url: `${siteConfig.canonicalUrl}/contact`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body id="top" className={`${inter.variable} ${inter.className}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionProvider>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
