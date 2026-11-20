import type { MetadataRoute } from "next";
import { projects, services, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/work", "/contact", ...services.map(service => `/services/${service.id}`), ...projects.map(project => `/work/${project.id}`)];
  return routes.map(route => ({ url: `${site.url}${route}`, changeFrequency: "monthly", priority: route === "" ? 1 : .6 }));
}
