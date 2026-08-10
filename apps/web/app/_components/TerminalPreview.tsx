// TerminalPreview.tsx
import { Terminal } from "lucide-react";

export default function TerminalPreview() {
  return (
    <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
      <div className="rounded-xl border border-white/10 bg-black p-6 font-mono text-sm shadow-2xl relative z-10">
        <div className="flex gap-2 mb-4 pb-4 border-b border-white/10">
          <Terminal size={16} className="text-[#e5e5e5]/50" />
          <span className="text-[#e5e5e5]/50">Terminal</span>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="text-[#fca311]">➜</span>
            <span className="text-sky-400">~</span>
            <span className="text-white">
              npx create-devmatrix-app my-project
            </span>
          </div>
          <div className="text-[#e5e5e5]/70">
            Creating a new DevMatrix app in /my-project.
          </div>
          <div className="text-[#e5e5e5]/70">Installing dependencies...</div>
          <div className="text-emerald-400">✓ Success! Created my-project.</div>
          <div className="mt-4 flex gap-2">
            <span className="text-[#fca311]">➜</span>
            <span className="text-sky-400">my-project</span>
            <span className="text-white">npm run dev</span>
          </div>
          <div className="text-[#e5e5e5]/70">
            ready - started server on 0.0.0.0:3000, url: http://localhost:3000
          </div>
          <div className="text-[#fca311] animate-pulse">_</div>
        </div>
      </div>

      <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#fca311]/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-600/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
