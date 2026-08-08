import { Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "info" | "tip" | "warning" | "success";

const variantStyles: Record<
  Variant,
  { Icon: typeof Info; wrap: string; icon: string; title: string }
> = {
  info: {
    Icon: Info,
    wrap: "border-blue-500/20 bg-blue-500/10 text-blue-200",
    icon: "text-blue-400",
    title: "text-blue-300",
  },
  tip: {
    Icon: Lightbulb,
    wrap: "border-purple-500/20 bg-purple-500/10 text-purple-200",
    icon: "text-purple-400",
    title: "text-purple-300",
  },
  warning: {
    Icon: AlertTriangle,
    wrap: "border-amber-500/20 bg-amber-500/10 text-amber-200",
    icon: "text-amber-400",
    title: "text-amber-300",
  },
  success: {
    Icon: CheckCircle2,
    wrap: "border-emerald-500/20 bg-emerald-500/10 text-emerald-200",
    icon: "text-emerald-400",
    title: "text-emerald-300",
  },
};

export default function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: Variant;
  title: string;
  children: ReactNode;
}) {
  const s = variantStyles[variant];
  const { Icon } = s;
  return (
    <div className={`my-8 flex gap-4 rounded-xl border p-4 not-prose ${s.wrap}`}>
      <Icon size={20} className={`shrink-0 ${s.icon}`} />
      <div className="text-sm leading-6">
        <strong className={`block mb-1 ${s.title}`}>{title}</strong>
        {children}
      </div>
    </div>
  );
}
