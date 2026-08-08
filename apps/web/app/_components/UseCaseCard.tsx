import type { LucideIcon } from "lucide-react";

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export default function UseCaseCard({ icon: Icon, title, desc }: UseCaseCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center hover:bg-white/[0.04] transition-colors">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Icon className="text-slate-300" size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}
