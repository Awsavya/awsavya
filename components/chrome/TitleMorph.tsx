import { ViewTransition } from "react";
import type { ProjectSlug } from "@/lib/site";

/**
 * Names a project title so the clicked name flies into the next page's H1 during DELIVER.
 * Only "deliver" navigations morph. "quick" (Motion Off) and untyped back/forward navigations keep the
 * name inside the page snapshot, so it just crossfades with the page.
 * Rule: a page renders a given title-{slug} at most once.
 */
export function TitleMorph({ slug, children }: { slug: ProjectSlug; children: React.ReactElement }) {
  return <ViewTransition name={`title-${slug}`} share={{ deliver: "deliver-title", default: "none" }} default="none">{children}</ViewTransition>;
}
