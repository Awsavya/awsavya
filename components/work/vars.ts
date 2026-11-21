import type { CSSProperties } from "react";

/** Inline custom properties (--i, --n, --w …) for work.css. */
export const vars = (o: Record<`--${string}`, string | number>) => o as CSSProperties;
