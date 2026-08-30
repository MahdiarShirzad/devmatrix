import { User } from "@/types/user";
import { AlertTriangle } from "lucide-react";

interface DangerZoneProps {
  currentUser?: User;
}

export default function DangerZone({ currentUser }: DangerZoneProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-red-400 flex items-center gap-2 mb-4">
        <AlertTriangle size={18} /> Danger Zone
      </h3>
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-medium text-white">Delete Account</h4>
            <p className="text-sm text-[#e5e5e5]/60 mt-1">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
          <button className="shrink-0 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500 hover:text-white border border-red-500/20">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
