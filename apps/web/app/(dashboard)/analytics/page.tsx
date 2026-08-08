import AnalyticsHeader from "./_components/AnalyticsHeader";
import OverviewStats from "./_components/OverviewStats";
import ProjectSearchToolbar from "./_components/ProjectSearchToolbar";
import ProjectsGrid from "./_components/ProjectsGrid";
import { Project } from "./_components/ProjectCard";

// داده‌های غنی‌تر برای نمایش بهتر UI
const PROJECTS: Project[] = [
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
      <AnalyticsHeader />
      <OverviewStats />
      <ProjectSearchToolbar projectCount={PROJECTS.length} />
      <ProjectsGrid projects={PROJECTS} />
    </div>
  );
}
