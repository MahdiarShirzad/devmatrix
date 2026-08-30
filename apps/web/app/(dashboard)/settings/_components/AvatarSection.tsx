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

  // Get first letter of first name and last name
  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
};

export default function AvatarSection({ currentUser }: AvatarSectionProps) {
  const name = currentUser?.name;
  const initials = getUserInitials(name);

  return (
    <div className="flex items-center gap-6">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#fca311] to-[#e55039] p-0.5">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0916] text-2xl font-bold text-white">
          {initials}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">Avatar</h3>
        <p className="text-sm text-[#e5e5e5]/60 mb-3">
          This is your public display picture.
        </p>
        <div className="flex gap-3">
          <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20">
            Upload new
          </button>
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-[#e5e5e5]/60 transition-colors hover:bg-white/5 hover:text-red-400">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
