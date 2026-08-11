import StatusDot from "./StatusDot";
import { mockProjectHealth } from "./mockData";

export default function ProjectHealth() {
  const { projectName, overallHealth, rows, lastActivity } = mockProjectHealth;

  return (
    <div className="flex h-full flex-col rounded-lg border border-neutral-border bg-neutral-surface-1 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-text-primary">
          Project Health
        </h2>
        <span className="rounded-md border border-neutral-border bg-neutral-surface-2 px-2 py-0.5 text-[11px] font-medium text-neutral-text-secondary">
          {projectName}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-neutral-text-secondary">Overall Health</span>
          <span className="text-lg font-semibold text-neutral-text-primary">
            {overallHealth}%
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-surface-2">
          <div
            className="h-full rounded-full bg-success"
            style={{ width: `${overallHealth}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex-1 divide-y divide-neutral-border">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-2 text-sm first:pt-0"
          >
            <span className="text-neutral-text-secondary">{row.label}</span>
            <span className="flex items-center gap-1.5 text-neutral-text-primary">
              <StatusDot status={row.status} />
              {row.detail}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-neutral-border pt-3 text-xs text-neutral-text-secondary">
        Last activity <span className="text-neutral-text-primary">{lastActivity}</span>
      </div>
    </div>
  );
}
