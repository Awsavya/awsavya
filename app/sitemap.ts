import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Fixed stable release date to prevent claiming all pages were modified dynamically on every request
  const stableReleaseDate = new Date(`${siteConfig.releaseDate}T00:00:00.000Z`);

  return routes.map((route) => ({
    url: `${siteConfig.canonicalUrl}${route.path}`,
    lastModified: stableReleaseDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
