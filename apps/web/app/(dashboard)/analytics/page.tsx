"use client";

import Link from "next/link";
import {
  GitCommit,
  Activity,
  TrendingUp,
  GitPullRequest,
  Search,
  Calendar,
  BarChart3,
  // Github,
  MoreVertical,
} from "lucide-react";
import GithubIcon from "@/app/_utils/GithubIcon";

// داده‌های غنی‌تر برای نمایش بهتر UI
const PROJECTS = [
  {
    id: "proj_1",
    name: "devmatrix",
    provider: "GitHub",
    commitsThisWeek: 42,
    lastActivity: "Just now",
    trend: "+12%",
    trendUp: true,
    tags: ["TypeScript", "OAuth"],
    // دیتای فیک برای رسم مینی‌چارت (ارتفاع میله‌ها به درصد)
    activityData: [20, 40, 30, 70, 50, 90, 100],
  },
  {
    id: "proj_2",
    name: "my-trip-full",
    provider: "GitHub",
    commitsThisWeek: 28,
    lastActivity: "2h ago",
    trend: "+5%",
    trendUp: true,
    tags: ["Next.js", "MongoDB"],
    activityData: [10, 20, 50, 40, 80, 60, 30],
  },
  {
    id: "proj_3",
    name: "deep-coding-backend",
    provider: "GitLab",
    commitsThisWeek: 15,
    lastActivity: "1d ago",
    trend: "-8%",
    trendUp: false,
    tags: ["Node.js", "Express"],
    activityData: [60, 50, 40, 20, 10, 15, 5],
  },
  {
    id: "proj_4",
    name: "MahdyarDev.io",
    provider: "GitHub",
    commitsThisWeek: 8,
    lastActivity: "3d ago",
    trend: "0%",
    trendUp: true,
    tags: ["Next.js", "Tailwind"],
    activityData: [5, 5, 10, 10, 5, 20, 5],
  },
];

export default function AnalyticsPage() {
  return (
    <div className="flex h-full flex-col pb-8">
      {/* هدر صفحه */}
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

      {/* بخش Overview (کارت‌های آماری کلی) */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-text-secondary">
            <GitCommit size={18} className="text-brand-primary" />
            <span className="text-sm font-medium">Total Commits</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold text-neutral-text-primary">
              93
            </span>
            <span className="flex items-center text-xs font-medium text-success">
              <TrendingUp size={14} className="mr-1" /> +14%
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-text-secondary">
            <GitPullRequest size={18} className="text-brand-accent" />
            <span className="text-sm font-medium">Merged PRs</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-3xl font-bold text-neutral-text-primary">
              12
            </span>
            <span className="flex items-center text-xs font-medium text-success">
              <TrendingUp size={14} className="mr-1" /> +2
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
          <div className="flex items-center gap-3 text-neutral-text-secondary">
            <Activity size={18} className="text-warning" />
            <span className="text-sm font-medium">Most Active Day</span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-xl font-bold text-neutral-text-primary mt-2">
              Wednesday
            </span>
            <span className="text-xs text-neutral-text-secondary">
              38 commits
            </span>
          </div>
        </div>
      </div>

      {/* نوار جستجو و فیلتر */}
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
          />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 py-2 pl-9 pr-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        <div className="hidden text-sm font-medium text-neutral-text-secondary md:block">
          {PROJECTS.length} Active Projects
        </div>
      </div>

      {/* لیست پروژه‌ها */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={`/analytics/${project.id}`}
            className="group relative flex flex-col justify-between rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/5"
          >
            {/* هدر کارت پروژه */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-neutral-text-primary group-hover:text-brand-primary transition-colors">
                    {project.name}
                  </h3>
                  <span className="flex items-center gap-1.5 rounded-full border border-neutral-border bg-neutral-surface-2 px-2 py-0.5 text-[11px] font-medium text-neutral-text-secondary">
                    {project.provider === "GitHub" ? (
                      <GithubIcon width={24} height={24} />
                    ) : (
                      <GitCommit size={12} />
                    )}
                    {project.provider}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-brand-primary/10 px-2 py-0.5 text-[11px] font-medium text-brand-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="rounded-md p-1.5 text-neutral-text-secondary opacity-0 transition-all hover:bg-neutral-surface-2 hover:text-neutral-text-primary group-hover:opacity-100">
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 items-end gap-4 border-t border-neutral-border pt-5">
              {/* اطلاعات فعالیت */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-neutral-text-primary">
                  <GitCommit size={16} className="text-brand-highlight" />
                  <span className="font-semibold">
                    {project.commitsThisWeek}
                  </span>
                  <span className="text-neutral-text-secondary">commits</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-text-secondary">
                  <Activity size={14} />
                  Active {project.lastActivity}
                </div>
              </div>

              {/* مینی چارت CSS */}
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`text-xs font-semibold ${project.trendUp ? "text-success" : "text-error"}`}
                >
                  {project.trend}
                </span>
                <div className="flex h-8 items-end gap-1">
                  {project.activityData.map((height, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-t-sm bg-brand-primary/20 transition-all group-hover:bg-brand-primary"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
