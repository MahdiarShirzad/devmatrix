import { Plus } from "lucide-react";

export default function ApiKeysHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-sm text-neutral-text-secondary">
        Manage API keys for accessing DevMatrix services. Do not share your
        secret keys.
      </p>
      <button className="flex items-center gap-2 rounded-lg bg-brand-primary text-btn-primary px-4 py-2 text-sm font-semibold transition-transform hover:scale-105 active:scale-95 whitespace-nowrap">
        <Plus size={16} /> Create New Key
      </button>
    </div>
  );
}
