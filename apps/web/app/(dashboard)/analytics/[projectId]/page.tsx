"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import BackToAnalyticsLink from "./_components/BackToAnalyticsLink";
import ProjectHeaderBar from "./_components/ProjectHeaderBar";
import StatsGrid from "./_components/StatsGrid";
import CommitsLineChart from "./_components/CommitsLineChart";
import CommitsRangeSelector from "./_components/CommitsRangeSelector";
import ActivityHeatmap from "./_components/ActivityHeatmap";
import ContributorsTable from "./_components/ContributorsTable";
import {
  useGithubProject,
  useProjectStats,
  useCommitsByDay,
  useHeatmap,
  useContributors,
} from "@/hooks/useGithubAnalytics";

const RANGE_TITLES: Record<string, string> = {
  "7": "Last 7 Days",
  "30": "Last 30 Days",
  "90": "Last 90 Days",
  all: "All Time",
};

export default function AnalyticsProjectPage() {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;

  const [commitsRange, setCommitsRange] = useState("7");

  const { data: projectData, isLoading: isProjectLoading } =
    useGithubProject(projectId);
  const { data: statsData, isLoading: isStatsLoading } =
    useProjectStats(projectId);

  const { data: commitsData, isLoading: isCommitsLoading } = useCommitsByDay(
    projectId,
    commitsRange,
  );
  const { data: heatmapData, isLoading: isHeatmapLoading } = useHeatmap(
    projectId,
    24,
  );
  const { data: contributorsData, isLoading: isContributorsLoading } =
    useContributors(projectId);

  const project = projectData?.project;

  if (isProjectLoading) {
    return (
      <div className="flex h-full flex-col pb-8">
        <BackToAnalyticsLink />
        <div className="flex items-center justify-center py-24 text-sm text-neutral-text-secondary">
          Loading project...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-full flex-col pb-8">
        <BackToAnalyticsLink />
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-neutral-border bg-neutral-surface-1 py-16 text-center">
          <p className="text-sm font-medium text-neutral-text-primary">
            Project not found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex  flex-col pb-8">
      <BackToAnalyticsLink />

      <ProjectHeaderBar
        projectId={project._id}
        name={project.name}
        provider={project.provider}
        lastSyncedAt={project.lastSyncedAt}
      />

      <StatsGrid stats={statsData?.stats} isLoading={isStatsLoading} />

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-text-primary">
              Commits Over Time ({RANGE_TITLES[commitsRange]})
            </h2>
            <CommitsRangeSelector
              value={commitsRange}
              onChange={setCommitsRange}
            />
          </div>
          {isCommitsLoading ? (
            <div className="flex h-[250px] items-center justify-center text-sm text-neutral-text-secondary">
              Loading...
            </div>
          ) : (
            <CommitsLineChart data={commitsData?.data ?? []} />
          )}
        </div>

        <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 shadow-sm overflow-x-auto">
          <h2 className="mb-6 text-sm font-semibold text-neutral-text-primary">
            Activity Heatmap
          </h2>
          {isHeatmapLoading ? (
            <div className="flex h-[116px] items-center justify-center text-sm text-neutral-text-secondary">
              Loading...
            </div>
          ) : (
            <ActivityHeatmap data={heatmapData?.data ?? []} />
          )}
        </div>
      </div>

      <ContributorsTable
        contributors={contributorsData?.contributors ?? []}
        isLoading={isContributorsLoading}
      />
    </div>
  );
}
