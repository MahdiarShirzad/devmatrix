import { Activity } from "lucide-react";

interface IdeaHeaderProps {
  title: string;
  status: string;
  submittedAgo: string;
  category: string;
}

export default function IdeaHeader({
  title,
  status,
  submittedAgo,
  category,
}: IdeaHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
            {title}
          </h1>
          <span className="flex items-center gap-1.5 rounded-full border border-warning/20 bg-warning/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-warning">
            <Activity size={12} />
            {status}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-neutral-text-secondary">
          Submitted {submittedAgo} • {category} Category
        </p>
      </div>
    </div>
  );
}
