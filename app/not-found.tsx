import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import AnimatedSiteLayout from "@/components/AnimatedSiteLayout";

export default function NotFound() {
  return (
    <AnimatedSiteLayout><section className="av-page-hero"><div className="av-container"><span className="av-kicker">AWSAVYA / ERROR 404</span><h1>That page took<br/><em>a wrong turn.</em></h1><p>The address may have changed, or the page may no longer be available.</p><div className="av-actions"><Link href="/" className="av-button"><ArrowLeft size={16}/>Back home</Link><Link href="/contact" className="av-text-link">Contact AWSAVYA <ArrowUpRight size={15}/></Link></div></div></section></AnimatedSiteLayout>
  );
}
