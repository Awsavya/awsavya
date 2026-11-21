"use client";

import { DeliverLink } from "./DeliverLink";

const cls = (tone: "solid" | "line" | undefined, extra?: string) => ["btn", tone === "line" && "btn--line", extra].filter(Boolean).join(" ");

/** A solid bar link (.btn). The label WIDENs on hover, focus and press; its width is reserved, so the bar never resizes. */
export function BarLink({ href, children, tone, className }: { href: string; children: string; tone?: "solid" | "line"; className?: string }) {
  return (
    <DeliverLink href={href} className={cls(tone, className)}>
      <span className="btn__label" data-text={children}>{children}</span>
    </DeliverLink>
  );
}

/** The same bar as a <button>. Pass aria-disabled (not disabled) while busy, so focus stays put. */
export function BarButton({ label, tone, className, type = "button", ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; tone?: "solid" | "line" }) {
  return (
    <button type={type} className={cls(tone, className)} {...rest}>
      <span className="btn__label" data-text={label}>{label}</span>
    </button>
  );
}
