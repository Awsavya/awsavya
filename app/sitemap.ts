import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", lastModified: "2026-11-11" },
    { path: "/services", lastModified: "2026-11-11" },
    { path: "/work", lastModified: "2026-11-11" },
    { path: "/about", lastModified: "2026-11-11" },
    { path: "/contact", lastModified: siteConfig.releaseDate },
    { path: "/privacy", lastModified: siteConfig.releaseDate },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.canonicalUrl}${route.path}`,
    lastModified: new Date(`${route.lastModified}T00:00:00.000Z`),
  }));
}
