import type { Metadata } from "next";
import { AnimatedPage } from "@/components/AnimatedSite";
import AnimatedSiteLayout from "@/components/AnimatedSiteLayout";

export const metadata: Metadata = {
  title: "Work & Projects",
  description: "Explore projects AWSAVYA has designed and built across mobile applications, applied AI, manufacturing software and commerce platforms.",
  alternates: { canonical: "/work" },
};
export default function WorkPage() { return <AnimatedSiteLayout><AnimatedPage kind="work"/></AnimatedSiteLayout>; }
