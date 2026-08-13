"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DayActivity } from "../_hooks/useDebugAnalytics";

interface DebuggingActivityChartProps {
  data: DayActivity[];
}

function ActivityTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: DayActivity }[];
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="rounded-lg border border-neutral-border bg-neutral-surface-2 px-3 py-2 text-xs shadow-xl">
      <div className="font-medium text-neutral-text-primary">
        {point.fullLabel}
      </div>
      <div className="mt-0.5 text-neutral-text-secondary">
        {point.count} {point.count === 1 ? "session" : "sessions"}
      </div>
    </div>
  );
}

export default function DebuggingActivityChart({
  data,
}: DebuggingActivityChartProps) {
  const hasActivity = data.some((d) => d.count > 0);

  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-neutral-border bg-neutral-surface-1 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-text-primary">
          Debugging Activity
        </h3>
        <span className="text-xs text-neutral-text-secondary">
          Last 7 days
        </span>
      </div>

      {!hasActivity ? (
        <div className="flex flex-1 items-center justify-center py-10 text-sm text-neutral-text-secondary">
          No sessions created in the last 7 days
        </div>
      ) : (
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 4, right: 8, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-brand-primary)"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-brand-primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                vertical={false}
                stroke="var(--color-neutral-border)"
                strokeDasharray="0"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-neutral-text-secondary)", fontSize: 11 }}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                width={24}
                tick={{ fill: "var(--color-neutral-text-secondary)", fontSize: 11 }}
              />
              <Tooltip
                content={<ActivityTooltip />}
                cursor={{ stroke: "var(--color-neutral-border)" }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="var(--color-brand-primary)"
                strokeWidth={2}
                fill="url(#activityFill)"
                activeDot={{ r: 4, fill: "var(--color-brand-primary)" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
