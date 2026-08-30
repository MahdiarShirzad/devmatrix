import { AlertTriangle } from "lucide-react";

interface DangerZoneProps {
  currentUser?: { email: string };
}

export default function DangerZone({ currentUser }: DangerZoneProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-lg font-medium text-red-400/90">
          <AlertTriangle size={16} />
          Danger Zone
        </h2>
        <p className="mt-1 text-sm text-[#e5e5e5]/40">
          Irreversible and destructive actions.
        </p>
      </div>

      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6 transition-colors hover:border-red-500/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md">
            <h3 className="font-medium text-white">Delete Account</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#e5e5e5]/50">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
          <button
            className="shrink-0 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500/30"
            onClick={() => {
              // TODO: Implement actual account deletion flow
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
