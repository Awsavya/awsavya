import type { MetadataRoute } from "next";
import { projects, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/services", "/about", "/contact", ...projects.map(p => `/work/${p.slug}`), ...services.map(s => `/services/${s.slug}`)];
  return routes.map(route => ({ url: `${site.url}${route}`, changeFrequency: "monthly", priority: route === "" ? 1 : .6 }));
}
