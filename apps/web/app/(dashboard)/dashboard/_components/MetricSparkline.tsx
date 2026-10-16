"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

interface MetricSparklineProps {
  data: number[];
  color?: string;
}

/**
 * Tiny axis-less trend line for KPI cards. Falls back to nothing when there
 * are fewer than two points, since a single point draws no line.
 */
export function MetricSparkline({
  data,
  color = "var(--color-brand-primary)",
}: MetricSparklineProps) {
  if (data.length < 2) return null;

  const points = data.map((value, index) => ({ index, value }));

  return (
    <div className="h-8 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={points} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
