import { Layers, CheckCircle2, Loader2, XCircle } from "lucide-react";

interface DebuggingStatsProps {
  totalSessions: number;
  resolvedSessions: number;
  inProgressSessions: number;
  failedSessions: number;
  resolutionRate: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  caption: string;
  captionClassName?: string;
}

function StatCard({ icon, label, value, caption, captionClassName }: StatCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-border bg-neutral-surface-1 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-text-secondary">
          {label}
        </span>
        <span className="text-neutral-text-secondary/70">{icon}</span>
      </div>
      <div className="text-3xl font-semibold tabular-nums text-neutral-text-primary">
        {value}
      </div>
      <div
        className={
          captionClassName ??
          "text-xs font-medium text-neutral-text-secondary"
        }
      >
        {caption}
      </div>
    </div>
  );
}

export default function DebuggingStats({
  totalSessions,
  resolvedSessions,
  inProgressSessions,
  failedSessions,
  resolutionRate,
}: DebuggingStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatCard
        icon={<Layers size={16} />}
        label="Sessions"
        value={totalSessions}
        caption="Total"
      />
      <StatCard
        icon={<CheckCircle2 size={16} />}
        label="Resolved"
        value={resolvedSessions}
        caption={totalSessions > 0 ? `${resolutionRate}% rate` : "No sessions yet"}
        captionClassName="text-xs font-medium text-success"
      />
      <StatCard
        icon={<Loader2 size={16} />}
        label="In Progress"
        value={inProgressSessions}
        caption={inProgressSessions > 0 ? "Active" : "None active"}
        captionClassName="text-xs font-medium text-warning"
      />
      <StatCard
        icon={<XCircle size={16} />}
        label="Failed"
        value={failedSessions}
        caption={failedSessions > 0 ? "Needs review" : "None failed"}
        captionClassName="text-xs font-medium text-error"
      />
    </div>
  );
}
