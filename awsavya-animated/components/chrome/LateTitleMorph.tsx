"use client";

import { useEffect, useState } from "react";
import type { ProjectSlug } from "@/lib/site";
import { TitleMorph } from "./TitleMorph";

/**
 * TitleMorph that takes its name only after the page has mounted. Use it for a title that sits off-screen on
 * arrival (the "Next build" link): the arriving page's own transition never pairs it with a visible title on the
 * page being left, so no stray name ghosts over the landing. Clicking it later still morphs into the next H1.
 */
export function LateTitleMorph({ slug, children }: { slug: ProjectSlug; children: React.ReactElement }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setArmed(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return armed ? <TitleMorph slug={slug}>{children}</TitleMorph> : children;
}
