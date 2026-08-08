import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardModule } from "./constants";

interface ModuleCardProps {
  module: DashboardModule;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon;

  return (
    <Link
      href={module.href}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${module.borderHover}`}
    >
      {/* Subtle background glow effect on hover */}
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-20 ${module.bg}`}
      />

      <div>
        <div className="flex items-start justify-between">
          <div className={`rounded-lg p-2.5 ${module.bg} ${module.color}`}>
            <Icon size={20} strokeWidth={2} />
          </div>
          <ArrowRight
            size={18}
            className="text-neutral-text-secondary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-neutral-text-primary"
          />
        </div>

        <h3 className="mt-4 text-base font-semibold text-neutral-text-primary">
          {module.title}
        </h3>
        <p className="mt-1.5 text-xs text-neutral-text-secondary leading-relaxed">
          {module.description}
        </p>
      </div>

      <div className="mt-5 inline-flex w-fit items-center rounded-md bg-neutral-surface-2 px-2 py-1 text-[11px] font-medium text-neutral-text-primary border border-neutral-border">
        {module.metric}
      </div>
    </Link>
  );
}
