import { AlertTriangle } from "lucide-react";

export default function DangerZone() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-lg font-medium text-error/90">
          <AlertTriangle size={16} />
          Danger Zone
        </h2>
        <p className="mt-1 text-sm text-neutral-text-secondary/40">
          Irreversible and destructive actions.
        </p>
      </div>

      <div className="rounded-2xl border border-error/20 bg-error/5 p-6 transition-colors hover:border-error/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <h3 className="font-medium text-neutral-text-primary">
              Delete Account
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-text-secondary/50">
              Permanently delete your account and all associated data. Account
              deletion isn&apos;t available yet — contact support if you need
              your account removed.
            </p>
          </div>
          <button
            type="button"
            disabled
            title="Account deletion is not available yet"
            className="shrink-0 cursor-not-allowed rounded-lg border border-error/20 bg-error/10 px-4 py-2.5 text-sm font-medium text-error/50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}
