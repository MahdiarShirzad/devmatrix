import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message: string;
  icon?: LucideIcon;
}

export function EmptyState({ message, icon: Icon = Inbox }: EmptyStateProps) {
  return (
    <div className="flex h-full min-h-[140px] flex-col items-center justify-center gap-2 py-6 text-center">
      <Icon className="h-5 w-5 text-[var(--color-neutral-text-secondary)]/30" />
      <p className="text-xs text-[var(--color-neutral-text-secondary)]/60">
        {message}
      </p>
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Couldn't load this data.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex h-full min-h-[140px] flex-col items-center justify-center gap-2 py-6 text-center">
      <p className="text-xs text-[var(--color-error)]">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md border border-[var(--color-neutral-border)] px-2.5 py-1 text-[11px] text-[var(--color-neutral-text-secondary)] transition-colors hover:border-[var(--color-neutral-text-secondary)]/40 hover:text-white"
        >
          Retry
        </button>
      )}
    </div>
  );
}
