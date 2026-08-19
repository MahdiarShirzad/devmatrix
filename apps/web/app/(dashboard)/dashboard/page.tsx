"use client";

import { useState } from "react";
import { useMe } from "@/hooks/useMe";
import { useGithubProjects } from "@/hooks/useGithubProjects";
import { useDashboardData } from "./_components/useDashboardData";
import {
  DashboardHeader,
  TIME_RANGES,
  type TimeRangeValue,
} from "./_components/DashboardHeader";
import { KpiCards } from "./_components/KpiCards";
import { DevelopmentActivityChart } from "./_components/DevelopmentActivityChart";
import { DebugSessionsDonut } from "./_components/DebugSessionsDonut";
import { ProjectActivityChart } from "./_components/ProjectActivityChart";
import { ProjectOverview } from "./_components/ProjectOverview";
import { ContributorsChart } from "./_components/ContributorsChart";
import { NeedsAttention } from "./_components/NeedsAttention";
import { RecentActivity } from "./_components/RecentActivity";
import { ProjectsList } from "./_components/ProjectsList";
import { QuickActions } from "./_components/QuickActions";

export default function DashboardPage() {
  const [range, setRange] = useState<TimeRangeValue>(TIME_RANGES[0].value);
  const { data: user } = useMe();

  const { data: projectsData } = useGithubProjects(range);
  const [manualProjectId, setManualProjectId] = useState<string | null>(null);

  const selectedProjectId =
    manualProjectId ?? projectsData?.projects?.[0]?._id ?? null;

  const dashboard = useDashboardData(selectedProjectId, range);
  const dashboardAllProjects = useDashboardData(null, range);

  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="flex flex-col gap-6 pb-8">
      <DashboardHeader
        name={firstName}
        range={range}
        onRangeChange={setRange}
      />

      <KpiCards
        projects={dashboard.projects}
        commits={dashboardAllProjects.commits}
        debugAnalytics={dashboardAllProjects.debugSessions.analytics}
        debugLoading={dashboardAllProjects.debugSessions.isLoading}
        debugError={dashboardAllProjects.debugSessions.isError}
        ideasStats={dashboardAllProjects.ideasStats}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <DevelopmentActivityChart
          commits={dashboard.commits.data}
          commitsLoading={dashboard.commits.isLoading}
          commitsError={dashboard.commits.isError}
          onRetryCommits={dashboard.commits.refetch}
          debugSessions={dashboard.debugSessions.data}
          debugLoading={dashboard.debugSessions.isLoading}
        />
        <ProjectOverview
          project={dashboard.project.data}
          projectLoading={dashboard.project.isLoading}
          projectError={dashboard.project.isError}
          stats={dashboard.projectStats.data}
          statsLoading={dashboard.projectStats.isLoading}
          statsError={dashboard.projectStats.isError}
          debugSessionCount={dashboard.debugSessions.analytics.totalSessions}
          debugLoading={dashboard.debugSessions.isLoading}
          onRetry={dashboard.project.refetch}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DebugSessionsDonut
          sessions={dashboard.debugSessions.data}
          isLoading={dashboard.debugSessions.isLoading}
          isError={dashboard.debugSessions.isError}
          onRetry={dashboard.debugSessions.refetch}
        />
        <ProjectActivityChart
          projects={dashboard.projects.data}
          isLoading={dashboard.projects.isLoading}
          isError={dashboard.projects.isError}
          onRetry={dashboard.projects.refetch}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <ContributorsChart
          contributors={dashboard.contributors.data}
          isLoading={dashboard.contributors.isLoading}
          isError={dashboard.contributors.isError}
          onRetry={dashboard.contributors.refetch}
        />
        <NeedsAttention
          attentionSessions={
            dashboard.debugSessions.analytics.attentionSessions
          }
          ideas={dashboard.ideas.data}
          project={dashboard.project.data}
          isLoading={
            dashboard.debugSessions.isLoading || dashboard.ideas.isLoading
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
        <RecentActivity
          commits={dashboard.commits.data}
          project={dashboard.project.data}
          debugSessions={dashboard.debugSessions.data}
          ideas={dashboard.ideas.data}
          isLoading={
            dashboard.commits.isLoading || dashboard.debugSessions.isLoading
          }
        />
        <ProjectsList
          projects={dashboard.projects.data}
          allDebugSessions={dashboard.debugSessions.allData}
          isLoading={dashboard.projects.isLoading}
          isError={dashboard.projects.isError}
          onRetry={dashboard.projects.refetch}
          selectedProjectId={selectedProjectId}
          onSelectProject={setManualProjectId}
        />
      </div>

      <QuickActions />
    </div>
  );
}
