import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found-section">
      <div className="container not-found-inner"><span className="eyebrow"><span className="eyebrow-dot" /> ERROR 404</span><h1>This page took<br /><span>a wrong turn.</span></h1><p>The page may have moved, or the address might be mistyped.</p><div className="not-found-actions"><Link href="/" className="button button-dark"><ArrowLeft size={16} /> Back home</Link><Link href="/contact" className="text-link">Contact us <ArrowUpRight size={15} /></Link></div></div>
    </section>
  );
}
