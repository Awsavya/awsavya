import type { Metadata } from "next";
import { AnimatedPage } from "@/components/AnimatedSite";
import AnimatedSiteLayout from "@/components/AnimatedSiteLayout";

export const metadata: Metadata = {
  title: "Work & Concept Studies",
  description: "Explore AWSAVYA concept studies across mobile applications, applied AI, manufacturing software and commerce platforms.",
  alternates: { canonical: "/work" },
};
export default function WorkPage() { return <AnimatedSiteLayout><AnimatedPage kind="work"/></AnimatedSiteLayout>; }
