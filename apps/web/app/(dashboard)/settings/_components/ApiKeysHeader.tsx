import { Plus } from "lucide-react";

export default function ApiKeysHeader() {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-[#e5e5e5]/60">
        Manage API keys for accessing DevMatrix services. Do not share your
        secret keys.
      </p>
      <button className="flex items-center gap-2 rounded-lg bg-[#fca311] text-[#0a0916] px-4 py-2 text-sm font-semibold transition-transform hover:scale-105 active:scale-95">
        <Plus size={16} /> Create New Key
      </button>
    </div>
  );
}
