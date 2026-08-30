import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  desc: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  desc,
}: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-2xl bg-neutral-surface-1/30 border border-neutral-border hover:bg-neutral-surface-1/50 hover:border-neutral-text-secondary/30 transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-brand-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-primary/20 transition-transform">
        {Icon && <Icon className="text-brand-primary" size={24} />}
      </div>
      <h3 className="text-xl font-semibold text-neutral-text-primary mb-2">
        {title}
      </h3>
      <p className="text-neutral-text-secondary text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
