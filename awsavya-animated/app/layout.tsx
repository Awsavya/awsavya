import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ScrollMotion } from "@/components/ScrollMotion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "AWSAVYA — Digital experiences in motion", template: "%s | AWSAVYA" },
  description: site.description,
  openGraph: { title: "AWSAVYA — Digital experiences in motion", description: site.description, type: "website", siteName: "AWSAVYA" },
  robots: { index: true, follow: true },
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell><SmoothScroll /><ScrollMotion /></body></html>;
}
