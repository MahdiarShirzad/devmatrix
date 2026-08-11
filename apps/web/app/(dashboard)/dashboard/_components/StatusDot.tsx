import { HealthStatus } from "./mockData";

const STATUS_COLOR: Record<HealthStatus, string> = {
  healthy: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  neutral: "bg-neutral-text-secondary",
};

interface StatusDotProps {
  status: HealthStatus;
  className?: string;
}

export default function StatusDot({ status, className = "" }: StatusDotProps) {
  return (
    <span
      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_COLOR[status]} ${className}`}
    />
  );
}
