import DashboardHeader from "./_components/DashboardHeader";
import ModulesGrid from "./_components/ModulesGrid";
import ActivityLogs from "./_components/ActivityLogs";
import { MODULES, RECENT_ACTIVITY } from "./_components/constants";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <DashboardHeader />
      <ModulesGrid modules={MODULES} />
      <ActivityLogs items={RECENT_ACTIVITY} />
    </div>
  );
}
