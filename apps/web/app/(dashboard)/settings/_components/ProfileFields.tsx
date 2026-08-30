import { User } from "@/types/user";
import { CheckCircle2 } from "lucide-react";
// import { User } from "@/types/user";

interface ProfileFieldsProps {
  displayName?: string;
  email?: string;
  currentUser?: User;
}

export default function ProfileFields({
  displayName = "Mahdiar Shirzad",
  email = "mahdiar@example.com",
  currentUser,
}: ProfileFieldsProps) {
  return (
    <div className="grid gap-6 max-w-2xl">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-[#e5e5e5]/80">
          Display Name
        </label>
        <input
          type="text"
          defaultValue={currentUser?.name || displayName}
          className="w-full rounded-lg border border-white/10 bg-[#0D1117] px-4 py-2.5 text-white placeholder:text-[#e5e5e5]/30 focus:border-[#fca311] focus:outline-none focus:ring-1 focus:ring-[#fca311]"
        />
        <p className="text-xs text-[#e5e5e5]/40">
          Please use 32 characters at maximum.
        </p>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-[#e5e5e5]/80">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            defaultValue={currentUser?.email || email}
            disabled
            className="w-full rounded-lg border border-white/10 bg-[#0D1117] px-4 py-2.5 text-[#e5e5e5]/50 cursor-not-allowed opacity-70"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={12} /> Verified
          </div>
        </div>
        <p className="text-xs text-[#e5e5e5]/40">
          To change your email, please contact support.
        </p>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-[#e5e5e5]/80">Bio</label>
        <textarea
          rows={4}
          defaultValue={currentUser?.bio || ""}
          placeholder="Tell us a little bit about yourself"
          className="w-full rounded-lg border border-white/10 bg-[#0D1117] px-4 py-2.5 text-white placeholder:text-[#e5e5e5]/30 focus:border-[#fca311] focus:outline-none focus:ring-1 focus:ring-[#fca311] resize-none"
        />
      </div>
    </div>
  );
}
