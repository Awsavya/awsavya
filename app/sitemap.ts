import type { MetadataRoute } from "next";
import { projects, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/services", "/about", "/contact", ...projects.map(p => `/work/${p.slug}`), ...services.map(s => `/services/${s.slug}`)];
  const lastModified = new Date(`${site.updated}T00:00:00.000Z`);
  return [
    ...routes.map(route => ({ url: `${site.url}${route}`, lastModified, changeFrequency: "monthly" as const, priority: route === "" ? 1 : .6 })),
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: .3 },
  ];
}
