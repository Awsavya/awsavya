import type { Metadata } from "next";
import { AnimatedHome } from "@/components/AnimatedSite";
import AnimatedSiteLayout from "@/components/AnimatedSiteLayout";

export const metadata: Metadata = {
  title: "AWSAVYA — Digital Product & Engineering",
  description: "We design and engineer mobile applications, web platforms, custom software, applied AI and automation for real business needs.",
  alternates: { canonical: "/" },
};

export default function HomePage() { return <AnimatedSiteLayout><AnimatedHome/></AnimatedSiteLayout>; }
