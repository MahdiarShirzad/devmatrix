import KPIStatCard from "./KPIStatCard";
import { mockDashboardStats } from "./mockData";

export default function DashboardKPIs() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {mockDashboardStats.map((stat) => (
        <KPIStatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
