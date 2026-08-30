import { Settings } from "lucide-react";

interface ComingSoonPlaceholderProps {
  tabLabel: string;
}

export default function ComingSoonPlaceholder({
  tabLabel,
}: ComingSoonPlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-neutral-border border-dashed bg-neutral-surface-1/20">
      <Settings size={32} className="text-neutral-text-secondary/40 mb-4" />
      <h3 className="text-lg font-medium text-neutral-text-primary">
        Coming Soon
      </h3>
      <p className="text-sm text-neutral-text-secondary mt-1 max-w-sm">
        The {tabLabel} settings module is currently under development.
      </p>
    </div>
  );
}
