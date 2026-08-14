import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  footer?: ReactNode;
}

export function ChartCard({
  title,
  headerRight,
  children,
  className = "",
  bodyClassName = "",
  footer,
}: ChartCardProps) {
  return (
    <section
      className={`flex flex-col rounded-xl border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface-1)] p-4 md:p-5 ${className}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {headerRight}
      </div>
      <div className={`flex-1 ${bodyClassName}`}>{children}</div>
      {footer}
    </section>
  );
}
