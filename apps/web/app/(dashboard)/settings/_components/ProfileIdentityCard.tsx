import { CheckCircle2, Shield } from "lucide-react";
import { User } from "@/types/user";

interface ProfileIdentityCardProps {
  currentUser?: User;
}

const getUserInitials = (name?: string): string => {
  if (!name) return "??";
  const nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }
  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

export default function ProfileIdentityCard({
  currentUser,
}: ProfileIdentityCardProps) {
  const name = currentUser?.name ?? "Unknown User";
  const email = currentUser?.email ?? "";
  const initials = getUserInitials(name);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-border bg-gradient-to-b from-neutral-surface-1 to-neutral-surface-1/80">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

      <div className="p-8 sm:p-10">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-brand-primary/20 blur-xl" />
            <div className="relative h-24 w-24 rounded-full border-2 border-brand-primary/30 bg-neutral-surface-1 ring-4 ring-brand-primary/5 shadow-2xl shadow-black/40">
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold tracking-tight text-neutral-text-primary">
                {initials}
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="min-w-0 flex-1 space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-text-secondary/40">
                Account
              </p>
              <h3 className="text-2xl font-semibold tracking-tight text-neutral-text-primary">
                {name}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate text-sm text-neutral-text-secondary">
                {email}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                <CheckCircle2 size={12} />
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
