import DashboardHeader from "./_components/DashboardHeader";
import DashboardKPIs from "./_components/DashboardKPIs";
import DevelopmentActivity from "./_components/DevelopmentActivity";
import ProjectHealth from "./_components/ProjectHealth";
import RecentActivity from "./_components/RecentActivity";
import NeedsAttention from "./_components/NeedsAttention";
import ProjectsOverview from "./_components/ProjectsOverview";
import QuickActions from "./_components/QuickActions";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <DashboardHeader />

      <DashboardKPIs />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DevelopmentActivity />
        </div>
        <div>
          <ProjectHealth />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentActivity />
        <NeedsAttention />
      </div>

      <ProjectsOverview />

      <QuickActions />
    </div>
  );
}
