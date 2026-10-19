import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { services } from "@/lib/site";
import ServiceIcon from "@/components/ServiceIcon";

type Service = (typeof services)[number];

export default function ServiceCard({ service, featured = false }: { service: Service; featured?: boolean }) {
  return (
    <Link href={`/services#${service.icon}`} className={`service-card ${featured ? "service-card-featured" : ""}`}>
      <div className="service-card-top">
        <span className="service-icon"><ServiceIcon name={service.icon} size={20} /></span>
        <span className="service-number">{service.number} / 05</span>
      </div>
      <div className="service-card-copy">
        <h3>{service.title}</h3>
        <p>{service.short}</p>
      </div>
      <div className="service-card-tags" aria-hidden="true">
        {service.tags.slice(0, 2).map((t) => (
          <span key={t} className="service-card-tag"><Check size={10} /> {t}</span>
        ))}
      </div>
      <div className="service-card-bottom">
        <span>Explore capability</span>
        <ArrowUpRight size={16} />
      </div>
    </Link>
  );
}
