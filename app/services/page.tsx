import type { Metadata } from "next";
import { AnimatedPage } from "@/components/AnimatedSite";
import AnimatedSiteLayout from "@/components/AnimatedSiteLayout";

export const metadata: Metadata = {
  title: "Services & Capabilities",
  description: "Explore AWSAVYA capabilities across apps, web experiences, custom software, applied AI and business automation.",
  alternates: { canonical: "/services" },
};
export default function ServicesPage() { return <AnimatedSiteLayout><AnimatedPage kind="services"/></AnimatedSiteLayout>; }
