"use client";

import { MessageSquare } from "lucide-react";

interface DescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DescriptionField({
  value,
  onChange,
}: DescriptionFieldProps) {
  return (
    <div>
      <label
        htmlFor="description"
        className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-text-primary"
      >
        <MessageSquare size={16} className="text-neutral-text-secondary" />
        What&apos;s going wrong?
        <span className="ml-1 text-xs font-normal text-neutral-text-secondary">
          (optional)
        </span>
      </label>
      <textarea
        id="description"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. It throws a TypeError when the user doesn't exist in the database..."
        className="w-full resize-none rounded-xl border border-neutral-border bg-neutral-surface-2/50 p-4 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-all focus:border-brand-primary focus:bg-neutral-surface-1 focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
      />
    </div>
  );
}
