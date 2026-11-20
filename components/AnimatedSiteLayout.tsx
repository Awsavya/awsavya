import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeader from "@/components/AnimatedHeader";

export default function AnimatedSiteLayout({ children }: { children: ReactNode }) {
  return <div className="av-shell"><AnimatedHeader/><div>{children}</div><footer className="av-footer"><div className="av-container"><div className="av-footer-about"><Link className="av-footer-brand" href="/" aria-label="AWSAVYA home"><Image src="/Logo.png" alt="AWSAVYA" width={144} height={144}/></Link><p>Digital products and software shaped around real business needs.</p><a href="mailto:hello@awsavya.in">hello@awsavya.in</a></div><div className="av-footer-group"><b>CAPABILITIES</b><Link href="/services#app">App development</Link><Link href="/services#web">Web experiences</Link><Link href="/services#software">Custom software</Link><Link href="/services#ai">Applied AI</Link><Link href="/services#automation">Automation</Link></div><div className="av-footer-group"><b>EXPLORE</b><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link></div><small>© {new Date().getFullYear()} AWSAVYA</small></div></footer></div>;
}
