"use client";

import { useState } from "react";
import { useMe } from "@/hooks/useMe";
import {
  DashboardHeader,
  TIME_RANGES,
  type TimeRangeValue,
} from "./_components/DashboardHeader";
import { NeedsAttention } from "./_components/NeedsAttention";
import { KpiCards } from "./_components/KpiCards";
import { DevelopmentActivityChart } from "./_components/DevelopmentActivityChart";
import { ProjectActivityChart } from "./_components/ProjectActivityChart";
import { RecentActivity } from "./_components/RecentActivity";
import { AiDebuggingSummary } from "./_components/AiDebuggingSummary";
import { IdeaSummary } from "./_components/IdeaSummary";
import { useDashboard } from "@/hooks/useDashboard";

const RANGE_LABEL: Record<TimeRangeValue, string> = {
  "7": "Last 7 days",
  "30": "Last 30 days",
  "90": "Last 90 days",
};

export default function DashboardPage() {
  const [range, setRange] = useState<TimeRangeValue>(TIME_RANGES[0].value);
  const { data: user } = useMe();
  const dashboard = useDashboard(range);

  const firstName = user?.name?.split(" ")[0] ?? "there";
  const rangeLabel = RANGE_LABEL[range];

  return (
    <div className="flex flex-col gap-6 pb-8">
      <DashboardHeader
        name={firstName}
        range={range}
        onRangeChange={setRange}
      />

      {/* <QuickActions /> */}
      <KpiCards
        range={range}
        projects={dashboard.projects}
        overviewStats={dashboard.overviewStats}
        debugAnalytics={dashboard.debugSessions.analytics}
        debugLoading={dashboard.debugSessions.isLoading}
        debugError={dashboard.debugSessions.isError}
        ideasStats={dashboard.ideasStats}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <DevelopmentActivityChart
          debugAnalytics={dashboard.debugSessions.analytics}
          debugLoading={dashboard.debugSessions.isLoading}
          debugError={dashboard.debugSessions.isError}
          onRetryDebug={dashboard.debugSessions.refetch}
          totalCommitsInRange={dashboard.overviewStats.data?.totalCommits}
          rangeLabel={rangeLabel}
        />
        <ProjectActivityChart
          projects={dashboard.projects.data}
          isLoading={dashboard.projects.isLoading}
          isError={dashboard.projects.isError}
          onRetry={dashboard.projects.refetch}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <RecentActivity
          items={dashboard.activity.data}
          isLoading={dashboard.activity.isLoading}
          isError={dashboard.activity.isError}
          onRetry={dashboard.activity.refetch}
        />
        <div className="grid grid-cols-1 gap-4">
          <AiDebuggingSummary
            analytics={dashboard.debugSessions.analytics}
            isLoading={dashboard.debugSessions.isLoading}
            isError={dashboard.debugSessions.isError}
            onRetry={dashboard.debugSessions.refetch}
          />
          <IdeaSummary
            stats={dashboard.ideasStats.data}
            isLoading={dashboard.ideasStats.isLoading}
            isError={dashboard.ideasStats.isError}
            onRetry={dashboard.ideasStats.refetch}
          />
        </div>
      </div>

      <NeedsAttention
        attentionSessions={dashboard.debugSessions.analytics.attentionSessions}
        ideasStats={dashboard.ideasStats.data}
        projects={dashboard.projects.data}
        isLoading={
          dashboard.debugSessions.isLoading || dashboard.ideasStats.isLoading
        }
      />
      {/* 
      <ProjectsList
        projects={dashboard.projects.data}
        allDebugSessions={dashboard.debugSessions.data}
        isLoading={dashboard.projects.isLoading}
        isError={dashboard.projects.isError}
        onRetry={dashboard.projects.refetch}
      /> */}
    </div>
  );
}
