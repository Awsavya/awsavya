import type { Metadata } from "next";
import { AnimatedPage } from "@/components/AnimatedSite";
import AnimatedSiteLayout from "@/components/AnimatedSiteLayout";

export const metadata: Metadata = {
  title: "Contact AWSAVYA",
  description: "Start a project conversation with AWSAVYA about mobile apps, web platforms, custom software, applied AI or automation.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() { return <AnimatedSiteLayout><AnimatedPage kind="contact"/></AnimatedSiteLayout>; }
