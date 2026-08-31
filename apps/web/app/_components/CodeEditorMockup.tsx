export default function CodeEditorMockup() {
  return (
    <div className="mt-20 relative max-w-5xl mx-auto rounded-2xl border border-neutral-border bg-neutral-surface-1 shadow-2xl shadow-black/50 overflow-hidden">
      <div className="flex items-center px-4 py-3 border-b border-neutral-border bg-neutral-surface-2/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto text-xs font-mono text-neutral-text-secondary">
          devmatrix-workspace.ts
        </div>
      </div>
      <div className="p-6 text-left font-mono text-sm md:text-base overflow-x-auto">
        <pre className="text-neutral-text-primary">
          <span className="text-brand-accent">import</span> {"{ Matrix }"}{" "}
          <span className="text-brand-accent">from</span>{" "}
          <span className="text-green-400">&apos;@devmatrix/core&apos;</span>;
          <br />
          <br />
          <span className="text-brand-accent">const</span> workspace ={" "}
          <span className="text-brand-accent">new</span>{" "}
          <span className="text-brand-primary">Matrix</span>({"{"});
          <br />
          {"  "}name:{" "}
          <span className="text-green-400">&apos;Next-Gen-App&apos;</span>,
          <br />
          {"  "}framework:{" "}
          <span className="text-green-400">&apos;Next.js&apos;</span>,
          <br />
          {"  "}teamSize: <span className="text-orange-400">1</span>,
          <br />
          {"  "}autoScale: <span className="text-brand-accent">true</span>
          <br />
          {"}"});
          <br />
          <br />
          workspace.<span className="text-brand-primary">deploy</span>().
          <span className="text-brand-primary">then</span>((){" "}
          <span className="text-brand-accent">{"=>"}</span> {"{"});
          <br />
          {"  "}console.<span className="text-brand-primary">log</span>(
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
