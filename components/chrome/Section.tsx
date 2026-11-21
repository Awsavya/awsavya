import type { Ground } from "@/lib/site";

/** Every section paints its own hard-edged ground. A section without data-ground is a bug. */
export function Section({ ground, id, className, labelledBy, children }: {
  ground: Ground; id?: string; className?: string; labelledBy?: string; children: React.ReactNode;
}) {
  return (
    <section data-ground={ground} id={id} className={className ? `sec ${className}` : "sec"} aria-labelledby={labelledBy}>
      <div className="wrap">{children}</div>
    </section>
  );
}
