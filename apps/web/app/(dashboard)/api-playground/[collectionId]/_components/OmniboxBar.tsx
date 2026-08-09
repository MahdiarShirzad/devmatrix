"use client";

import { Send, ChevronDown, Loader2, Save } from "lucide-react";
import { METHOD_COLORS } from "./constants";
import type { HttpMethod } from "@/types/playground.types";

interface OmniboxBarProps {
  method: HttpMethod;
  onMethodChange: (method: HttpMethod) => void;
  fullUrl: string;
  onPathChange: (path: string) => void;
  baseUrl: string;
  onSend: () => void;
  isSending: boolean;
  onSave: () => void;
  isSaving: boolean;
  isDirty: boolean;
}

export default function OmniboxBar({
  method,
  onMethodChange,
  fullUrl,
  onPathChange,
  baseUrl,
  onSend,
  isSending,
  onSave,
  isSaving,
  isDirty,
}: OmniboxBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-neutral-border bg-neutral-surface-1 p-1 shadow-sm">
      <div className="relative shrink-0">
        <select
          className={`appearance-none rounded-lg bg-transparent py-2 pl-4 pr-8 text-sm font-bold focus:outline-none ${METHOD_COLORS[method]}`}
          value={method}
          onChange={(e) => onMethodChange(e.target.value as HttpMethod)}
        >
          <option value="GET" className="text-success">
            GET
          </option>
          <option value="POST" className="text-brand-accent">
            POST
          </option>
          <option value="PUT" className="text-warning">
            PUT
          </option>
          <option value="PATCH" className="text-warning">
            PATCH
          </option>
          <option value="DELETE" className="text-error">
            DELETE
          </option>
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-text-secondary"
        />
      </div>

      <div className="h-6 w-px bg-neutral-border"></div>

      <input
        type="text"
        value={fullUrl}
        onChange={(e) => {
          // Strip the baseUrl prefix back off so we only store the path portion
          const value = e.target.value;
          onPathChange(
            value.startsWith(baseUrl) ? value.slice(baseUrl.length) : value,
          );
        }}
        className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-neutral-text-primary focus:outline-none"
      />

      <button
        type="button"
        onClick={onSave}
        disabled={!isDirty || isSaving}
        title={isDirty ? "Save changes to this request" : "No changes to save"}
        className="flex items-center gap-2 rounded-lg border border-neutral-border px-4 py-2 text-sm font-medium text-neutral-text-primary transition-colors hover:bg-neutral-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSaving ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Save size={14} />
        )}
        {isSaving ? "Saving..." : "Save"}
      </button>

      <button
        type="button"
        onClick={onSend}
        disabled={isSending}
        className="flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95 disabled:opacity-60"
      >
        {isSending ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Send size={14} />
        )}
        {isSending ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
