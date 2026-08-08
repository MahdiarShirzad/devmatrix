export default function AvatarSection() {
  return (
    <div className="flex items-center gap-6">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0916] text-2xl font-bold text-white">
          MS
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">Avatar</h3>
        <p className="text-sm text-slate-400 mb-3">
          This is your public display picture.
        </p>
        <div className="flex gap-3">
          <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20">
            Upload new
          </button>
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-red-400">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
