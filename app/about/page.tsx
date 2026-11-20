import type { Metadata } from "next";
import { AnimatedPage } from "@/components/AnimatedSite";
import AnimatedSiteLayout from "@/components/AnimatedSiteLayout";

export const metadata: Metadata = {
  title: "About AWSAVYA",
  description: "Learn about AWSAVYA's digital product and engineering approach across apps, web, software, AI and automation.",
  alternates: { canonical: "/about" },
};
export default function AboutPage() { return <AnimatedSiteLayout><AnimatedPage kind="about"/></AnimatedSiteLayout>; }
