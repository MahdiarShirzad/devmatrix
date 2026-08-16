"use client";

import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";
import type { ExecuteResult } from "@/types/playground.types";

interface ResponseViewerProps {
  result?: ExecuteResult;
  isError: boolean;
  errorMessage?: string;
  isStale?: boolean; // true when showing a persisted lastResponse, not a fresh execution
}

export default function ResponseViewer({
  result,
  isError,
  errorMessage,
  isStale,
}: ResponseViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSuccessStatus = result && result.status >= 200 && result.status < 300;

  // Best-effort pretty print — the body is stored as raw text since it
  // isn't guaranteed to be JSON (could be HTML, plain text, etc.)
  const formattedBody = (() => {
    if (!result) return "";
    try {
      return JSON.stringify(JSON.parse(result.body), null, 2);
    } catch {
      return result.body;
    }
  })();

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-border bg-neutral-surface-2/30 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider text-neutral-text-secondary uppercase">
            Response
          </span>
          {isStale && result && (
            <span className="rounded-full bg-neutral-surface-2 px-2 py-0.5 text-[10px] font-medium text-neutral-text-secondary">
              Last saved
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          {result && (
            <>
              <div className="flex items-center gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${isSuccessStatus ? "bg-success" : "bg-error"}`}
                ></span>
                <span
                  className={`font-semibold ${isSuccessStatus ? "text-success" : "text-error"}`}
                >
                  {result.status}
                </span>
              </div>
              <span className="text-neutral-text-secondary">
                {result.durationMs} ms
              </span>
              <span className="text-neutral-text-secondary">
                {(result.sizeBytes / 1024).toFixed(1)} KB
              </span>

              <div className="ml-2 h-4 w-px bg-neutral-border"></div>

              <button
                onClick={handleCopy}
                className="ml-2 text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
                title="Copy to clipboard"
              >
                {copied ? (
                  <CheckCheck size={16} className="text-success" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#0d0c1b] p-4">
        {!result && !isError && (
          <p className="text-sm italic text-neutral-text-secondary">
            Send a request to see the response here.
          </p>
        )}

        {isError && (
          <p className="text-sm text-error">
            {errorMessage || "The request failed. Check the URL and try again."}
          </p>
        )}

        {result && (
          <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-neutral-text-primary">
            {formattedBody}
          </pre>
        )}
      </div>
    </div>
  );
}
