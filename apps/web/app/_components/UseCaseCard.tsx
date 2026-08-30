import type { LucideIcon } from "lucide-react";

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export default function UseCaseCard({
  icon: Icon,
  title,
  desc,
}: UseCaseCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-neutral-surface-1/30 border border-neutral-border flex flex-col items-center text-center hover:bg-neutral-surface-1/50 transition-colors">
      <div className="w-12 h-12 rounded-full bg-neutral-surface-2/50 flex items-center justify-center mb-4">
        <Icon className="text-neutral-text-secondary" size={24} />
      </div>
      <h3 className="text-lg font-semibold text-neutral-text-primary mb-2">
        {title}
      </h3>
      <p className="text-sm text-neutral-text-secondary">{desc}</p>
    </div>
  );
}
