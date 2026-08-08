import { Calendar, BarChart3 } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-neutral-border pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
          Developer Analytics
        </h1>
        <p className="mt-1.5 text-sm text-neutral-text-secondary">
          Track commits, pull requests, and coding activity across your
          projects.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-all hover:bg-neutral-surface-2">
          <Calendar size={16} className="text-neutral-text-secondary" />
          Last 7 Days
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95">
          <BarChart3 size={16} />
          Export Report
        </button>
      </div>
    </div>
  );
}
