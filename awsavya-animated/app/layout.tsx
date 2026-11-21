import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import { site } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · AWSAVYA" },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website", siteName: "AWSAVYA" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-motion="on" className={`${archivo.variable} ${martian.variable}`} suppressHydrationWarning>
      <head><HeadScript /></head>
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
