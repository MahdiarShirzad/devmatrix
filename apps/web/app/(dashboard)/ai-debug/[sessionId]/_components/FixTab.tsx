"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { DebugSession } from "@/types/aiDebug.types";

interface FixTabProps {
  session: DebugSession;
}

export default function FixTab({ session }: FixTabProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!session.fixedCode) return;
    navigator.clipboard.writeText(session.fixedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!session.fixedCode) {
    return (
      <p className="text-sm text-neutral-text-secondary">
        کد اصلاح‌شده موجود نیست.
      </p>
    );
  }

  return (
    <div className="group relative flex h-full flex-col animate-in fade-in duration-300">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 rounded-md bg-neutral-surface-2 p-1.5 text-neutral-text-secondary opacity-0 transition-all hover:text-neutral-text-primary group-hover:opacity-100"
        title="Copy to clipboard"
      >
        {isCopied ? (
          <Check size={16} className="text-success" />
        ) : (
          <Copy size={16} />
        )}
      </button>
      <pre className="h-full overflow-x-auto rounded-xl bg-[#0d1117] p-5 font-mono text-[13px] leading-loose text-neutral-200">
        {session.fixedCode}
      </pre>
    </div>
  );
}
