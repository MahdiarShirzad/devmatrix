import { CheckCircle2, Lock } from "lucide-react";

interface ProfileFieldsProps {
  displayName: string;
  email: string;
  onDisplayNameChange: (value: string) => void;
}

const MAX_DISPLAY_NAME = 32;

export default function ProfileFields({
  displayName,
  email,
  onDisplayNameChange,
}: ProfileFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Display Name */}
      <div className="space-y-2">
        <label
          htmlFor="displayName"
          className="block text-sm font-medium text-[#e5e5e5]/80"
        >
          Display Name
        </label>
        <div className="relative">
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => {
              if (e.target.value.length <= MAX_DISPLAY_NAME) {
                onDisplayNameChange(e.target.value);
              }
            }}
            maxLength={MAX_DISPLAY_NAME}
            className="w-full rounded-xl border border-white/10 bg-[#0D1117] px-4 py-3 text-white placeholder:text-[#e5e5e5]/30 focus:border-[#fca311]/50 focus:outline-none focus:ring-2 focus:ring-[#fca311]/20 transition-all duration-200"
            placeholder="Your public display name"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#e5e5e5]/40">Your public display name.</p>
          <span className="text-xs tabular-nums text-[#e5e5e5]/40">
            {displayName.length} / {MAX_DISPLAY_NAME}
          </span>
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#e5e5e5]/80"
        >
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 pr-32 text-[#e5e5e5]/60"
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
            <Lock size={12} className="text-[#e5e5e5]/30" />
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
              <CheckCircle2 size={12} />
              Verified
            </span>
          </div>
        </div>
        <p className="text-xs text-[#e5e5e5]/40">
          Email changes are currently handled through support.
        </p>
      </div>
    </div>
  );
}
