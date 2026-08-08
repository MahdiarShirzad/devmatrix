import ModuleCard from "./ModuleCard";
import { DashboardModule } from "./constants";

interface ModulesGridProps {
  modules: DashboardModule[];
}

export default function ModulesGrid({ modules }: ModulesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {modules.map((mod) => (
        <ModuleCard key={mod.href} module={mod} />
      ))}
    </div>
  );
}
