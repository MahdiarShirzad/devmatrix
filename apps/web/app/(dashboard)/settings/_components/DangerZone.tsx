import { AlertTriangle } from "lucide-react";

interface DangerZoneProps {
  currentUser?: { email: string };
}

export default function DangerZone({ currentUser }: DangerZoneProps) {
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
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
          <button
            className="shrink-0 rounded-lg border border-error/20 bg-error/10 px-4 py-2.5 text-sm font-medium text-error transition-all hover:bg-error hover:text-white focus:outline-none focus:ring-2 focus:ring-error/30"
            onClick={() => {
              console.log("Delete account requested for:", currentUser?.email);
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </section>
  );
}
