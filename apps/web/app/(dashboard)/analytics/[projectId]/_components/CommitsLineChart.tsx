"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CommitDataPoint {
  day: string;
  commits: number;
}

interface CommitsLineChartProps {
  data: CommitDataPoint[];
}

export default function CommitsLineChart({ data }: CommitsLineChartProps) {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2d3748"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            stroke="#718096"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#718096"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{
              stroke: "#4a5568",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              backgroundColor: "#161b22",
              borderColor: "#30363d",
              borderRadius: "8px",
              color: "#e2e8f0",
              fontSize: "12px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            itemStyle={{ color: "#8b5cf6" }}
          />
          <Line
            type="monotone"
            dataKey="commits"
            stroke="var(--brand-primary, #8b5cf6)"
            strokeWidth={3}
            dot={{
              fill: "var(--brand-primary, #8b5cf6)",
              r: 4,
              strokeWidth: 2,
              stroke: "#161b22",
            }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
