import { CheckCircle2 } from "lucide-react";

interface ProfileFieldsProps {
  displayName?: string;
  email?: string;
}

export default function ProfileFields({
  displayName = "Mahdiar Shirzad",
  email = "mahdiar@example.com",
}: ProfileFieldsProps) {
  return (
    <div className="grid gap-6 max-w-2xl">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-300">
          Display Name
        </label>
        <input
          type="text"
          defaultValue={displayName}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <p className="text-xs text-slate-500">
          Please use 32 characters at maximum.
        </p>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-300">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            defaultValue={email}
            disabled
            className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-slate-400 cursor-not-allowed opacity-70"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400 border border-green-500/20">
            <CheckCircle2 size={12} /> Verified
          </div>
        </div>
        <p className="text-xs text-slate-500">
          To change your email, please contact support.
        </p>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-300">Bio</label>
        <textarea
          rows={4}
          placeholder="Tell us a little bit about yourself"
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
        />
      </div>
    </div>
  );
}
