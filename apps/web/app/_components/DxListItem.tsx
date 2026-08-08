import type { LucideIcon } from "lucide-react";

interface DxListItemProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export default function DxListItem({ icon: Icon, title, desc }: DxListItemProps) {
  return (
    <li className="flex gap-4">
      <div className="mt-1 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
        <Icon className="text-purple-400" size={16} />
      </div>
      <div>
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-sm text-slate-400 mt-1">{desc}</p>
      </div>
    </li>
  );
}
