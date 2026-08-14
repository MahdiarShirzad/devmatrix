"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartCard } from "./ChartCard";
import { ChartCardSkeleton } from "./Skeletons";
import { EmptyState, ErrorState } from "./EmptyState";
import type { Contributor } from "@/types/githubAnalytics.types";

interface ContributorsChartProps {
  contributors?: Contributor[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export function ContributorsChart({
  contributors,
  isLoading,
  isError,
  onRetry,
}: ContributorsChartProps) {
  const data = useMemo(() => {
    return [...(contributors ?? [])]
      .sort((a, b) => b.commits - a.commits)
      .slice(0, 6)
      .map((c) => ({
        name: c.name || c.login,
        commits: c.commits,
      }));
  }, [contributors]);

  if (isLoading) return <ChartCardSkeleton height="h-56" />;

  return (
    <ChartCard title="Contributors" className="h-full">
      {isError ? (
        <ErrorState message="Couldn't load contributors." onRetry={onRetry} />
      ) : data.length === 0 ? (
        <EmptyState message="No contributor activity yet" />
      ) : (
        <div style={{ height: Math.max(160, data.length * 36) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              barCategoryGap={10}
            >
              <XAxis type="number" hide allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                width={84}
                tick={{ fill: "#e5e5e5", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(229,229,229,0.04)" }}
                contentStyle={{
                  background: "#0d1117",
                  border: "1px solid rgba(229,229,229,0.12)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(value) => [`${value}`, "Commits"]}
              />
              <Bar dataKey="commits" radius={[0, 4, 4, 0]} maxBarSize={16}>
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i === 0 ? "var(--color-brand-primary)" : "#3a3f4b"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
}
