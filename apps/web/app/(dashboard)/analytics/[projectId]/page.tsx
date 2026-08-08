"use client";

import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft,
  // Github,
  GitCommit,
  GitMerge,
  Clock,
  Users,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import GithubIcon from "@/app/_utils/GithubIcon";

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
  {
    name: "Mahdyar Shirzad",
    role: "Lead Developer",
    commits: 24,
    prsMerged: 6,
    linesChanged: 1840,
  },
  {
    name: "Sara Kazemi",
    role: "Frontend Dev",
    commits: 15,
    prsMerged: 4,
    linesChanged: 920,
  },
  {
    name: "Amir Rostami",
    role: "Backend Dev",
    commits: 9,
    prsMerged: 2,
    linesChanged: 410,
  },
];

// 24x7 grid for a more realistic GitHub-style heatmap (approx 6 months)
const HEATMAP = Array.from({ length: 24 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)),
);

function heatColor(level: number) {
  switch (level) {
    case 0:
      return "bg-neutral-surface-2/50";
    case 1:
      return "bg-brand-primary/20";
    case 2:
      return "bg-brand-primary/40";
    case 3:
      return "bg-brand-primary/70";
    default:
      return "bg-brand-primary shadow-[0_0_8px_rgba(var(--brand-primary),0.4)]";
  }
}

// تولید حروف اول اسم برای آواتار
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function AnalyticsProjectPage() {
  return (
    <div className="flex h-full flex-col pb-8">
      {/* دکمه بازگشت */}
      <Link
        href="/analytics"
        className="group mb-6 flex w-fit items-center gap-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to Analytics
      </Link>

      {/* هدر صفحه پروژه */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
              devmatrix-api
            </h1>
            <span className="flex items-center gap-1.5 rounded-full border border-neutral-border bg-neutral-surface-2 px-2.5 py-1 text-[11px] font-medium text-neutral-text-secondary">
              <GithubIcon width={25} height={25} className=" text-white" />
              GitHub
            </span>
          </div>
          <p className="mt-1.5 flex items-center gap-2 text-sm text-neutral-text-secondary">
            <Clock size={14} />
            Last synced 12 minutes ago
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-all hover:bg-neutral-surface-2 active:scale-95">
          <RefreshCw size={16} />
          Sync Data
        </button>
      </div>

      {/* کارت‌های آماری (Stats Grid) */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Commits this week",
            value: "24",
            icon: GitCommit,
            color: "text-brand-primary",
            trend: "+12%",
          },
          {
            label: "Open PRs",
            value: "3",
            icon: GitMerge,
            color: "text-brand-accent",
            trend: "-1",
          },
          {
            label: "Avg. merge time",
            value: "1.4d",
            icon: Clock,
            color: "text-warning",
            trend: "-4h",
          },
          {
            label: "Active contributors",
            value: "3",
            icon: Users,
            color: "text-success",
            trend: "0",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="group rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-colors hover:border-neutral-border/80"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-text-secondary">
                {stat.label}
              </span>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-bold text-neutral-text-primary">
                {stat.value}
              </p>
              <span className="flex items-center text-xs font-medium text-success">
                <TrendingUp size={14} className="mr-1" /> {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* بخش چارت‌ها (گرید دوتایی) */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* نمودار خطی */}
        <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
          <h2 className="mb-6 text-sm font-semibold text-neutral-text-primary">
            Commits Over Time (This Week)
          </h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={COMMIT_DATA}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
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
        </div>

        {/* هیت‌مپ فعالیت */}
        <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm overflow-x-auto">
          <h2 className="mb-6 text-sm font-semibold text-neutral-text-primary">
            Activity Heatmap
          </h2>
          <div className="flex flex-1 items-center justify-center min-w-max">
            <div className="flex gap-2 text-[10px] text-neutral-text-secondary mr-3 flex-col justify-between py-1 h-[116px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="flex gap-1.5">
              {HEATMAP.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1.5">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className={`h-3 w-3 rounded-[3px] transition-colors hover:ring-2 hover:ring-neutral-400 hover:ring-offset-1 hover:ring-offset-neutral-surface-1 ${heatColor(level)}`}
                      title={`${level} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-2 text-xs text-neutral-text-secondary">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-3 w-3 rounded-[3px] ${heatColor(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* جدول مشارکت‌کنندگان */}
      <div className="overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
        <div className="border-b border-neutral-border px-5 py-4">
          <h2 className="text-sm font-semibold text-neutral-text-primary">
            Productivity by Contributor
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-surface-2/30 text-left text-xs font-medium text-neutral-text-secondary">
                <th className="px-5 py-3">Contributor</th>
                <th className="px-5 py-3 text-right">Commits</th>
                <th className="px-5 py-3 text-right">PRs Merged</th>
                <th className="px-5 py-3 text-right">Lines Changed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-border">
              {CONTRIBUTORS.map((c) => (
                <tr
                  key={c.name}
                  className="group transition-colors hover:bg-neutral-surface-2/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-bold text-brand-primary">
                        {getInitials(c.name)}
                      </div>
                      <div>
                        <div className="font-medium text-neutral-text-primary">
                          {c.name}
                        </div>
                        <div className="text-[11px] text-neutral-text-secondary">
                          {c.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right font-medium text-neutral-text-primary">
                    {c.commits}
                  </td>
                  <td className="px-5 py-4 text-right text-neutral-text-secondary">
                    {c.prsMerged}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="inline-flex items-center rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
                      +{c.linesChanged.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
