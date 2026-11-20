import Link from "next/link";
export default function NotFound(){return <section className="not-found"><p className="eyebrow light">Signal lost / 404</p><h1>This route is<br/><em>unexplored.</em></h1><Link href="/" className="pill-button light-button">Return home ↗</Link></section>}
