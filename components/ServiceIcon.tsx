import { Bot, Code2, Cog, Globe2, Smartphone } from "lucide-react";

const iconMap = {
  app: Smartphone,
  web: Globe2,
  software: Code2,
  ai: Bot,
  automation: Cog,
};

export default function ServiceIcon({ name, size = 22 }: { name: keyof typeof iconMap; size?: number }) {
  const Icon = iconMap[name];
  return <Icon size={size} strokeWidth={1.7} aria-hidden="true" />;
}
