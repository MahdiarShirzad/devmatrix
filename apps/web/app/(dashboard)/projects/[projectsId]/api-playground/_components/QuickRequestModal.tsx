"use client";

import { useState } from "react";
import { X, Zap, Loader2 } from "lucide-react";
import { useExecuteRequest } from "@/hooks/usePlayground";
import { ApiError } from "@/lib/apiClient";
import type { HttpMethod } from "@/types/playground.types";

interface QuickRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QuickRequestModal({
  open,
  onClose,
}: QuickRequestModalProps) {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("");
  const executeRequest = useExecuteRequest();

  if (!open) return null;

  const handleSend = () => {
    if (!url.trim()) return;
    executeRequest.mutate({ method, url });
  };

  const handleClose = () => {
    setUrl("");
    setMethod("GET");
    executeRequest.reset();
    onClose();
  };

  const result = executeRequest.data?.data;
  const isSuccessStatus = result && result.status >= 200 && result.status < 300;
  const errorMessage =
    executeRequest.error instanceof ApiError
      ? executeRequest.error.message
      : executeRequest.isError
        ? "The request failed. Check the URL and try again."
        : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-text-primary flex items-center gap-2">
            <Zap size={18} className="text-brand-highlight" />
            Quick Request
          </h2>
          <button
            onClick={handleClose}
            className="text-neutral-text-secondary hover:text-neutral-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-neutral-text-secondary mb-4">
          Test an endpoint quickly without saving it to a collection.
        </p>

        <div className="flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-2 p-1">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as HttpMethod)}
            className="appearance-none rounded-md bg-transparent py-2 pl-3 pr-6 text-sm font-bold text-success focus:outline-none cursor-pointer hover:bg-neutral-surface-1 transition-colors"
          >
            <option className="text-success">GET</option>
            <option className="text-brand-accent">POST</option>
            <option className="text-warning">PUT</option>
            <option className="text-warning">PATCH</option>
            <option className="text-error">DELETE</option>
          </select>
          <div className="h-6 w-px bg-neutral-border"></div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/v1/..."
            className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-neutral-text-primary focus:outline-none placeholder:font-sans placeholder:text-neutral-text-secondary/50"
          />
        </div>

        {result && (
          <div className="mt-4 rounded-lg border border-neutral-border bg-[#0d0c1b] p-3">
            <div className="mb-2 flex items-center gap-3 text-xs font-mono">
              <span
                className={`font-semibold ${isSuccessStatus ? "text-success" : "text-error"}`}
              >
                {result.status}
              </span>
              <span className="text-neutral-text-secondary">
                {result.durationMs} ms
              </span>
            </div>
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap font-mono text-xs text-neutral-text-primary">
              {result.body}
            </pre>
          </div>
        )}

        {errorMessage && (
          <p className="mt-4 text-sm text-error">{errorMessage}</p>
        )}

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary hover:bg-neutral-surface-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!url.trim() || executeRequest.isPending}
            className="flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
          >
            {executeRequest.isPending && (
              <Loader2 size={14} className="animate-spin" />
            )}
            {executeRequest.isPending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
