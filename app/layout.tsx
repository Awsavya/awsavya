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
  icons: {
    icon: [
      // PNG preferred by Google Search Console for rich favicon display
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      // Fallback formats
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
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
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f9fb",
};

// Verified Organization structured data (strictly factual, zero invented credentials/addresses)
// sameAs: add real social profiles here when accounts are confirmed public.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.canonicalUrl}/#organization`,
  name: "AWSAVYA",
  url: siteConfig.canonicalUrl,
  // PNG logo preferred by Google for Knowledge Panel display
  logo: `${siteConfig.canonicalUrl}/favicon-192.png`,
  email: siteConfig.email,
  description: siteConfig.description,
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
