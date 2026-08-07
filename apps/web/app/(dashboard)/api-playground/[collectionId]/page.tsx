"use client";

import { useState } from "react";
import { Send, Plus } from "lucide-react";

const REQUESTS = [
  { id: "req_1", method: "GET", name: "List payments" },
  { id: "req_2", method: "POST", name: "Create payment" },
  { id: "req_3", method: "GET", name: "Get payment by id" },
  { id: "req_4", method: "DELETE", name: "Refund payment" },
];

const REQUEST_TABS = ["Params", "Headers", "Body"] as const;
type RequestTab = (typeof REQUEST_TABS)[number];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-success",
  POST: "text-brand-accent",
  PUT: "text-warning",
  DELETE: "text-error",
};

const SAMPLE_RESPONSE = `{
  "id": "pay_8f2a1c",
  "amount": 4200,
  "currency": "usd",
  "status": "succeeded",
  "created_at": "2026-08-08T09:12:00Z"
}`;

export default function PlaygroundCollectionPage() {
  const [activeRequest, setActiveRequest] = useState("req_1");
  const [activeTab, setActiveTab] = useState<RequestTab>("Params");

  return (
    <div className="flex h-[calc(100vh-56px-48px)] gap-4 overflow-hidden">
      {/* Requests sidebar */}
      <div className="w-56 shrink-0 overflow-y-auto rounded-xl border border-neutral-border bg-neutral-surface-1">
        <div className="flex items-center justify-between border-b border-neutral-border px-3 py-2.5">
          <span className="text-xs font-medium text-neutral-text-primary">
            Payments
          </span>
          <button
            type="button"
            aria-label="Add request"
            className="text-neutral-text-secondary hover:text-neutral-text-primary"
          >
            <Plus size={14} />
          </button>
        </div>
        <div className="p-1.5">
          {REQUESTS.map((req) => (
            <button
              key={req.id}
              type="button"
              onClick={() => setActiveRequest(req.id)}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                activeRequest === req.id
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-neutral-text-secondary hover:bg-neutral-surface-2"
              }`}
            >
              <span
                className={`w-12 shrink-0 text-xs font-medium ${METHOD_COLORS[req.method]}`}
              >
                {req.method}
              </span>
              <span className="truncate">{req.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Request builder + response */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-2.5 text-sm font-medium text-success focus:outline-none">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
          <input
            type="text"
            defaultValue="https://api.devmatrix.dev/v1/payments"
            className="flex-1 rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none"
          />
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Send size={14} />
            Send
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1">
          <div className="flex border-b border-neutral-border px-2">
            {REQUEST_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-3 py-2.5 text-sm transition-colors ${
                  activeTab === tab
                    ? "border-brand-primary text-brand-primary"
                    : "border-transparent text-neutral-text-secondary hover:text-neutral-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "Params" && (
              <p className="text-sm text-neutral-text-secondary">
                No query params added yet.
              </p>
            )}
            {activeTab === "Headers" && (
              <div className="space-y-2 font-mono text-xs text-neutral-text-primary">
                <p>Authorization: Bearer ••••••••</p>
                <p>Content-Type: application/json</p>
              </div>
            )}
            {activeTab === "Body" && (
              <p className="text-sm text-neutral-text-secondary">
                This request has no body.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1">
          <div className="flex items-center justify-between border-b border-neutral-border px-4 py-2.5">
            <span className="text-xs text-neutral-text-secondary">
              Response
            </span>
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-success-bg px-2 py-0.5 text-success">
                200 OK
              </span>
              <span className="text-neutral-text-secondary">184ms</span>
            </div>
          </div>
          <pre className="flex-1 overflow-auto p-4 font-mono text-xs text-neutral-text-primary">
            {SAMPLE_RESPONSE}
          </pre>
        </div>
      </div>
    </div>
  );
}
