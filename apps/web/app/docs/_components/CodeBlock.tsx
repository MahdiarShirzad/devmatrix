"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

export default function CodeBlock({
  label = "terminal",
  code,
}: {
  label?: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden group not-prose">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-black/40">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Terminal size={14} /> {label}
        </div>
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-white transition-colors"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300">
        {code}
      </pre>
    </div>
  );
}
