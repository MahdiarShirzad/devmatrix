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
          className="block text-sm font-medium text-neutral-text-secondary"
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
            className="w-full rounded-xl border border-neutral-border bg-neutral-surface-1 px-4 py-3 text-neutral-text-primary placeholder:text-neutral-text-secondary/30 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200"
            placeholder="Your public display name"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-text-secondary/40">
            Your public display name.
          </p>
          <span className="text-xs tabular-nums text-neutral-text-secondary/40">
            {displayName.length} / {MAX_DISPLAY_NAME}
          </span>
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-text-secondary"
        >
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-neutral-border/50 bg-neutral-surface-1/50 px-4 py-3 pr-32 text-neutral-text-secondary/60"
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
            <Lock size={12} className="text-neutral-text-secondary/30" />
            <span className="inline-flex items-center gap-1 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              <CheckCircle2 size={12} />
              Verified
            </span>
          </div>
        </div>
        <p className="text-xs text-neutral-text-secondary/40">
          Email changes are currently handled through support.
        </p>
      </div>
    </div>
  );
}
