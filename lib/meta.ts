import type { Metadata } from "next";
import { site } from "./site";

/**
 * Per-page metadata: title, description, canonical, and share text (Open Graph, X) that matches the page.
 * A page's openGraph replaces the layout's whole object, so type, siteName and locale are repeated here, and
 * so is the image: a child page that sets openGraph no longer inherits app/opengraph-image.tsx on its own.
 * Leave `title` out on the home page so the layout's default (site.title) is used as is.
 */
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: site.title };

export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const shareTitle = title ? `${title} · ${site.name}` : site.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { title: shareTitle, description, url: path, type: "website", siteName: site.name, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [image.url] },
  };
}
