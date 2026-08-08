"use client";

import { Send, ChevronDown } from "lucide-react";
import { METHOD_COLORS, RequestItem } from "./constants";

interface OmniboxBarProps {
  currentReq: RequestItem | undefined;
}

export default function OmniboxBar({ currentReq }: OmniboxBarProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-neutral-border bg-neutral-surface-1 p-1 shadow-sm">
      <div className="relative shrink-0">
        <select
          className={`appearance-none rounded-lg bg-transparent py-2 pl-4 pr-8 text-sm font-bold focus:outline-none ${METHOD_COLORS[currentReq?.method || "GET"]}`}
          value={currentReq?.method}
          onChange={() => {}}
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
        value={`https://api.devmatrix.dev${currentReq?.path || ""}`}
        readOnly
        className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-neutral-text-primary focus:outline-none"
      />

      <button
        type="button"
        className="flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-primary/90 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-neutral-bg active:scale-95"
      >
        <Send size={14} />
        Send
      </button>
    </div>
  );
}
