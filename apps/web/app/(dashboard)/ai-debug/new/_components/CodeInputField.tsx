"use client";

import { Code2 } from "lucide-react";

interface CodeInputFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeInputField({
  value,
  onChange,
}: CodeInputFieldProps) {
  return (
    <div>
      <label
        htmlFor="code"
        className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-text-primary"
      >
        <Code2 size={16} className="text-neutral-text-secondary" />
        Source Code
      </label>
      <div className="relative overflow-hidden rounded-xl border border-neutral-border bg-[#0d1117] transition-all focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10">
        {/* یک هدر کوچیک برای استایل دادن به ادیتور کد */}
        <div className="flex items-center gap-1.5 border-b border-neutral-border/50 bg-[#161b22] px-4 py-2">
          <div className="h-2.5 w-2.5 rounded-full bg-error/80"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-warning/80"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-success/80"></div>
        </div>
        <textarea
          id="code"
          rows={12}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`function getUser(id) {\n  const user = users.find(u => u.id === id);\n  return user.name;\n}`}
          spellCheck={false}
          className="w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-neutral-200 placeholder:text-neutral-600 focus:outline-none"
        />
      </div>
    </div>
  );
}
