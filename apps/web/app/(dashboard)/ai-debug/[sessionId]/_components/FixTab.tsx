"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const FIXED_CODE = `function getUser(id) {
  const user = users.find(u => u.id === id);
  
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  return user.name;
}`;

export default function FixTab() {
  const [isCopied, setIsCopied] = useState(false);

  // شبیه‌سازی کپی کردن کد
  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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
        {FIXED_CODE}
      </pre>
    </div>
  );
}
