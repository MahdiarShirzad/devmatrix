"use client";

import { useMemo, useState } from "react";
import { useMe } from "@/hooks/useMe";
import { useGithubProjects } from "@/hooks/useGithubProjects";
import {
  useDashboardAnalytics,
  useDebuggingAnalytics,
  useIdeaAnalytics,
} from "@/hooks/useDashboardAnalytics";
import { useDashboardActivity } from "@/hooks/useDashboardActivity";
import { DashboardHeader } from "./_components/DashboardHeader";
import {
  DashboardFilters,
  type DashboardRangeValue,
} from "./_components/DashboardFilters";
import { KpiGrid } from "./_components/KpiGrid";
import { ActivityTrendChart } from "./_components/ActivityTrendChart";
import { ContributionHeatmap } from "./_components/ContributionHeatmap";
import { ProjectRankingChart } from "./_components/ProjectRankingChart";
import { ProjectDistributionDonut } from "./_components/ProjectDistributionDonut";
import { LanguageDistributionChart } from "./_components/LanguageDistributionChart";
import { DebuggingAnalytics } from "./_components/DebuggingAnalytics";
import { IdeaAnalytics } from "./_components/IdeaAnalytics";
import { RecentActivity } from "./_components/RecentActivity";

const RANGE_LABEL: Record<Exclude<DashboardRangeValue, "custom">, string> = {
  "7": "Last 7 days",
  "30": "Last 30 days",
  "90": "Last 90 days",
  "180": "Last 6 months",
  "365": "Last 12 months",
};

const toDateInput = (date: Date): string => date.toISOString().slice(0, 10);

export default function DashboardPage() {
  const { data: user } = useMe();

  const [range, setRange] = useState<DashboardRangeValue>("30");
  const [customFrom, setCustomFrom] = useState(() => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - 29);
    return toDateInput(d);
  });
  const [customTo, setCustomTo] = useState(() => toDateInput(new Date()));
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  const projectsQuery = useGithubProjects();
  const projects = projectsQuery.data?.projects ?? [];

  const queryParams = useMemo(() => {
    if (range === "custom" && customFrom && customTo) {
      return {
        from: customFrom,
        to: customTo,
        projectIds: selectedProjectIds,
      };
    }
    return {
      days: range === "custom" ? "30" : range,
      projectIds: selectedProjectIds,
    };
  }, [range, customFrom, customTo, selectedProjectIds]);

  const analytics = useDashboardAnalytics(queryParams);
  const debugging = useDebuggingAnalytics(queryParams);
  const ideas = useIdeaAnalytics(queryParams);

  const activityDays = useMemo(() => {
    if (range === "custom" && customFrom && customTo) {
      const from = new Date(`${customFrom}T00:00:00.000Z`);
      const to = new Date(`${customTo}T00:00:00.000Z`);
      const days = Math.round(
        (to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000),
      );
      return String(Math.min(Math.max(days + 1, 1), 365));
    }
    return range === "custom" ? "30" : range;
  }, [range, customFrom, customTo]);

  const activity = useDashboardActivity(activityDays, 30);

  const firstName = user?.name?.split(" ")[0] ?? "there";
  const rangeLabel =
    range === "custom"
      ? customFrom && customTo
        ? `${customFrom} → ${customTo}`
        : "Custom range"
      : RANGE_LABEL[range];

  const kpis = analytics.data?.kpis ?? null;
  const activitySeries = analytics.data?.activitySeries ?? [];
  const interval = analytics.data?.range.interval ?? "day";

  const toggleProject = (id: string) => {
    setSelectedProjectIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const handleRefresh = () => {
    analytics.refetch();
    debugging.refetch();
    ideas.refetch();
    activity.refetch();
  };

  const isRefreshing =
    analytics.isFetching ||
    debugging.isFetching ||
    ideas.isFetching ||
    activity.isFetching;

  return (
    <div className="flex flex-col gap-6 pb-8">
      <DashboardHeader name={firstName}>
        <DashboardFilters
          range={range}
          onRangeChange={setRange}
          customFrom={customFrom}
          customTo={customTo}
          onCustomFromChange={setCustomFrom}
          onCustomToChange={setCustomTo}
          projects={projects.map((p) => ({ _id: p._id, name: p.name }))}
          selectedProjectIds={selectedProjectIds}
          onToggleProject={toggleProject}
          onClearProjects={() => setSelectedProjectIds([])}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      </DashboardHeader>

      <KpiGrid
        kpis={kpis}
        series={activitySeries}
        isLoading={analytics.isLoading || (!analytics.data && !analytics.isError)}
      />

      <ActivityTrendChart
        series={activitySeries}
        interval={interval}
        rangeLabel={rangeLabel}
        isLoading={analytics.isLoading}
        isError={analytics.isError}
        onRetry={analytics.refetch}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <ContributionHeatmap
          data={analytics.data?.heatmap ?? []}
          isLoading={analytics.isLoading}
          isError={analytics.isError}
          onRetry={analytics.refetch}
        />
        <LanguageDistributionChart
          languages={analytics.data?.languages ?? []}
          isLoading={analytics.isLoading}
          isError={analytics.isError}
          onRetry={analytics.refetch}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProjectRankingChart
          projects={analytics.data?.projectBreakdown ?? []}
          isLoading={analytics.isLoading}
          isError={analytics.isError}
          onRetry={analytics.refetch}
        />
        <ProjectDistributionDonut
          projects={analytics.data?.projectBreakdown ?? []}
          isLoading={analytics.isLoading}
          isError={analytics.isError}
          onRetry={analytics.refetch}
        />
      </div>

      <DebuggingAnalytics
        data={debugging.data}
        isLoading={debugging.isLoading}
        isError={debugging.isError}
        onRetry={debugging.refetch}
      />

      <IdeaAnalytics
        data={ideas.data}
        isLoading={ideas.isLoading}
        isError={ideas.isError}
        onRetry={ideas.refetch}
      />

      <RecentActivity
        items={activity.data?.activity}
        isLoading={activity.isLoading}
        isError={activity.isError}
        onRetry={activity.refetch}
      />
    </div>
  );
}
