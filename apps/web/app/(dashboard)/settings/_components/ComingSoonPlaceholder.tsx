import { Settings } from "lucide-react";

interface ComingSoonPlaceholderProps {
  tabLabel: string;
}

export default function ComingSoonPlaceholder({
  tabLabel,
}: ComingSoonPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-white/10 border-dashed bg-white/[0.02]">
      <Settings size={32} className="text-[#e5e5e5]/40 mb-4" />
      <h3 className="text-lg font-medium text-white">Coming Soon</h3>
      <p className="text-sm text-[#e5e5e5]/60 mt-1 max-w-sm">
        The {tabLabel} settings module is currently under development.
      </p>
    </div>
  );
}
