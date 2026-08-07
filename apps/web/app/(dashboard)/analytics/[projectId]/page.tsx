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

const COMMIT_DATA = [
  { day: "Mon", commits: 4 },
  { day: "Tue", commits: 7 },
  { day: "Wed", commits: 3 },
  { day: "Thu", commits: 9 },
  { day: "Fri", commits: 5 },
  { day: "Sat", commits: 1 },
  { day: "Sun", commits: 2 },
];

const CONTRIBUTORS = [
  { name: "Mahdyar Shirzad", commits: 24, prsMerged: 6, linesChanged: 1840 },
  { name: "Sara Kazemi", commits: 15, prsMerged: 4, linesChanged: 920 },
  { name: "Amir Rostami", commits: 9, prsMerged: 2, linesChanged: 410 },
];

// 7x8 grid of relative activity intensity (0-4), most recent week last
const HEATMAP = Array.from({ length: 8 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)),
);

function heatColor(level: number) {
  switch (level) {
    case 0:
      return "bg-neutral-surface-2";
    case 1:
      return "bg-brand-primary/20";
    case 2:
      return "bg-brand-primary/40";
    case 3:
      return "bg-brand-primary/70";
    default:
      return "bg-brand-primary";
  }
}

export default function AnalyticsProjectPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-medium text-neutral-text-primary">
          devmatrix-api
        </h1>
        <p className="mt-1 text-sm text-neutral-text-secondary">
          GitHub · Last synced 12 minutes ago
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Commits this week", value: "24" },
          { label: "Open PRs", value: "3" },
          { label: "Avg. merge time", value: "1.4d" },
          { label: "Active contributors", value: "3" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-4"
          >
            <p className="text-xs text-neutral-text-secondary">{stat.label}</p>
            <p className="mt-1 text-2xl font-medium text-neutral-text-primary">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-neutral-border bg-neutral-surface-1 p-5">
        <h2 className="mb-4 text-sm font-medium text-neutral-text-primary">
          Commits over time
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={COMMIT_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#332f4d" />
              <XAxis dataKey="day" stroke="#8b899e" fontSize={12} />
              <YAxis stroke="#8b899e" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "#171625",
                  border: "1px solid #332f4d",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="commits"
                stroke="#5e4ce6"
                strokeWidth={2}
                dot={{ fill: "#5e4ce6", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-border bg-neutral-surface-1 p-5">
        <h2 className="mb-4 text-sm font-medium text-neutral-text-primary">
          Activity heatmap
        </h2>
        <div className="flex gap-1">
          {HEATMAP.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((level, di) => (
                <div
                  key={di}
                  className={`h-3 w-3 rounded-sm ${heatColor(level)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-border bg-neutral-surface-1">
        <h2 className="border-b border-neutral-border px-5 py-4 text-sm font-medium text-neutral-text-primary">
          Productivity by contributor
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-neutral-text-secondary">
              <th className="px-5 py-2 font-normal">Contributor</th>
              <th className="px-5 py-2 font-normal">Commits</th>
              <th className="px-5 py-2 font-normal">PRs merged</th>
              <th className="px-5 py-2 font-normal">Lines changed</th>
            </tr>
          </thead>
          <tbody>
            {CONTRIBUTORS.map((c) => (
              <tr key={c.name} className="border-t border-neutral-border">
                <td className="px-5 py-3 text-neutral-text-primary">
                  {c.name}
                </td>
                <td className="px-5 py-3 text-neutral-text-secondary">
                  {c.commits}
                </td>
                <td className="px-5 py-3 text-neutral-text-secondary">
                  {c.prsMerged}
                </td>
                <td className="px-5 py-3 text-neutral-text-secondary">
                  {c.linesChanged.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
