import { User } from "@/types/user";

interface AvatarSectionProps {
  currentUser?: User;
}

// Function to get user initials from name
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

export default function AvatarSection({ currentUser }: AvatarSectionProps) {
  const name = currentUser?.name;
  const initials = getUserInitials(name);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand-primary to-brand-accent p-0.5">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-surface-1 text-2xl font-bold text-neutral-text-primary">
          {initials}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-neutral-text-primary">
          Avatar
        </h3>
        <p className="text-sm text-neutral-text-secondary mb-3">
          This is your public display picture.
        </p>
        <div className="flex gap-3">
          <button className="rounded-lg bg-neutral-surface-2 px-4 py-2 text-sm font-medium text-neutral-text-primary transition-colors hover:bg-neutral-surface-2/70">
            Upload new
          </button>
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-error">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
