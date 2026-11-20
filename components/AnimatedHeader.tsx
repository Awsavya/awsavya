"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Work", href: "/work" }, { label: "About", href: "/about" }];
export default function AnimatedHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="av-header"><div className="av-nav"><Link className="av-logo" href="/" aria-label="AWSAVYA home"><Image src="/Logo.png" width={144} height={144} alt="AWSAVYA" priority /></Link><button className="av-menu" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={open ? "av-links is-open" : "av-links"} aria-label="Main navigation">{items.map(i => <Link key={i.href} href={i.href} className={pathname===i.href ? "is-active" : undefined} aria-current={pathname===i.href ? "page" : undefined} onClick={() => setOpen(false)}>{i.label}</Link>)}<Link className="av-nav-cta" href="/contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={15}/></Link></nav></div></header>;
}
