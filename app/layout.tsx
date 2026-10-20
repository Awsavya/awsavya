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
  applicationName: "AWSAVYA",
  openGraph: {
    type: "website",
    url: siteConfig.canonicalUrl,
    siteName: "AWSAVYA",
    title: "AWSAVYA — Technology built around your next move",
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWSAVYA — Apps, Web, Software, AI & Automation",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f9fb",
};

// Verified Organization structured data (strictly factual, zero invented credentials/addresses)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AWSAVYA",
  url: siteConfig.canonicalUrl,
  email: siteConfig.email,
  description: siteConfig.description,
  sameAs: [],
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
