"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MiniAreaChart from "./MiniAreaChart";
import {
  activityMetricOptions,
  mockDevelopmentActivity,
  ActivityMetric,
} from "./mockData";

export default function DevelopmentActivity() {
  const [metric, setMetric] = useState<ActivityMetric>("commits");

  return (
    <div className="flex h-full flex-col rounded-lg border border-neutral-border bg-neutral-surface-1 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-neutral-text-primary">
          Development Activity
        </h2>

        <div className="flex items-center gap-1.5 text-xs text-neutral-text-secondary">
          Last 7 days
          <ChevronDown size={13} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1 border-b border-neutral-border pb-3">
        {activityMetricOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setMetric(option.id)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              metric === option.id
                ? "bg-neutral-surface-2 text-neutral-text-primary"
                : "text-neutral-text-secondary hover:text-neutral-text-primary"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex-1">
        <MiniAreaChart data={mockDevelopmentActivity[metric]} height={220} />
      </div>
    </div>
  );
}
