import type { Metadata } from "next";
import { site } from "./site";

/**
 * Per-page metadata: title, description, canonical, and share text (Open Graph, X) that matches the page.
 * A page's openGraph replaces the layout's whole object, so type, siteName and locale are repeated here, and
 * so is the image: a child page that sets openGraph no longer inherits app/opengraph-image.tsx on its own.
 * Leave `title` out on the home page so the layout's default (site.title) is used as is.
 * `absolute: true` uses the title as written (it already names AWSAVYA), instead of adding " · AWSAVYA".
 */
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: site.title };

export function pageMetadata({ title, description, path, absolute = false }: { title?: string; description: string; path: string; absolute?: boolean }): Metadata {
  const shareTitle = !title ? site.title : absolute ? title : `${title} · ${site.name}`;
  return {
    ...(title ? { title: absolute ? { absolute: title } : title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { title: shareTitle, description, url: path, type: "website", siteName: site.name, locale: "en_US", images: [image] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [image.url] },
  };
}

/** BreadcrumbList for a page: Home first, then each level. Paths are site-relative ("/work"). */
export function breadcrumbList(trail: readonly { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

/** FAQPage for questions that are shown, word for word, on the same page (structured data must match visible text). */
export function faqPage(faq: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
