export default function DashboardHeader() {
  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
          Welcome back, Mahdiar
        </h1>
        <p className="mt-1.5 text-sm text-neutral-text-secondary">
          Here&apos;s an overview of your active workspaces and recent system
          events.
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-success md:mt-0 bg-success-bg px-3 py-1.5 rounded-full border border-success/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
        All systems operational
      </div>
    </div>
  );
}
