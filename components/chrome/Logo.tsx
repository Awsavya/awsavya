import { LOGO } from "@/lib/brand";

/**
 * The pixel logo, drawn in the current text colour: V and Y solid, the other letters at half strength, so it
 * follows the header across Paper, Ink and Stamp grounds. Decorative: the link around it carries the name.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${LOGO.width} ${LOGO.height}`} aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      {LOGO.cells.map(([x, y, hot]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className={hot ? "logo__hot" : "logo__dim"} />
      ))}
    </svg>
  );
}
