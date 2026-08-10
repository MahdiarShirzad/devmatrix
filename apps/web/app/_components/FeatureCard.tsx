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
    <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-[#fca311]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#fca311]/20 transition-transform">
        {Icon && <Icon className="text-[#fca311]" size={24} />}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-[#e5e5e5]/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
