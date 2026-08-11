export default function CodeEditorMockup() {
  return (
    <div className="mt-20 relative max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#0D1117] shadow-2xl shadow-black/50 overflow-hidden">
      <div className="flex items-center px-4 py-3 border-b border-white/5 bg-black/40">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto text-xs font-mono text-slate-500">
          devmatrix-workspace.ts
        </div>
      </div>
      <div className="p-6 text-left font-mono text-sm md:text-base overflow-x-auto">
        <pre className="text-slate-300">
          <span className="text-blue-400">import</span> {"{ Matrix }"}{" "}
          <span className="text-blue-400">from</span>{" "}
          <span className="text-green-400">&apos;@devmatrix/core&apos;</span>;
          <br />
          <br />
          <span className="text-blue-400">const</span> workspace ={" "}
          <span className="text-blue-400">new</span>{" "}
          <span className="text-[#fca311]">Matrix</span>({"{"}
          <br />
          {"  "}name:{" "}
          <span className="text-green-400">&apos;Next-Gen-App&apos;</span>,
          <br />
          {"  "}framework:{" "}
          <span className="text-green-400">&apos;Next.js&apos;</span>,
          <br />
          {"  "}teamSize: <span className="text-orange-400">5</span>,
          <br />
          {"  "}autoScale: <span className="text-blue-400">true</span>
          <br />
          {"}"});
          <br />
          <br />
          workspace.<span className="text-[#fca311]">deploy</span>().
          <span className="text-[#fca311]">then</span>((){" "}
          <span className="text-blue-400">{"=>"}</span> {"{"}
          <br />
          {"  "}console.<span className="text-[#fca311]">log</span>(
          <span className="text-green-400">
            &apos;🚀 Project is live on DevMatrix!&apos;
          </span>
          );
          <br />
          {"}"});
        </pre>
      </div>
    </div>
  );
}
