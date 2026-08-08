"use client";

import { useState } from "react";
import { 
  Send, 
  Plus, 
  MoreVertical, 
  Copy, 
  CheckCheck,
  ChevronDown
} from "lucide-react";

const REQUESTS = [
  { id: "req_1", method: "GET", name: "Get user profile", path: "/api/users/me" },
  { id: "req_2", method: "POST", name: "Create flight booking", path: "/api/bookings/flight" },
  { id: "req_3", method: "PUT", name: "Update hotel reservation", path: "/api/bookings/hotel/update" },
  { id: "req_4", method: "DELETE", name: "Cancel trip", path: "/api/trips/cancel" },
];

const REQUEST_TABS = ["Params", "Headers", "Body", "Auth"] as const;
type RequestTab = (typeof REQUEST_TABS)[number];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-success",
  POST: "text-brand-accent",
  PUT: "text-warning",
  DELETE: "text-error",
};

const SAMPLE_RESPONSE = `{
  "status": "success",
  "data": {
    "bookingId": "bk_98f2a1c",
    "userId": "usr_7729alx",
    "type": "flight",
    "details": {
      "airline": "Aseman Airlines",
      "route": "THR -> BUZ",
      "class": "Economy",
      "departure": "2025-04-07T05:05:00Z"
    },
    "paymentStatus": "verified"
  },
  "meta": {
    "processedAt": "2026-08-08T09:34:00Z"
  }
}`;

export default function PlaygroundCollectionPage() {
  const [activeRequest, setActiveRequest] = useState("req_2");
  const [activeTab, setActiveTab] = useState<RequestTab>("Body");
  const [copied, setCopied] = useState(false);

  const currentReq = REQUESTS.find((req) => req.id === activeRequest);

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_RESPONSE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-[calc(100vh-56px-48px)] gap-4 overflow-hidden">
      
      {/* 1. Sidebar - Requests List */}
      <div className="flex w-64 shrink-0 flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
        <div className="flex items-center justify-between border-b border-neutral-border bg-neutral-surface-2/50 px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-text-primary">
            my-trip API
          </span>
          <button
            type="button"
            className="rounded p-1 text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {REQUESTS.map((req) => (
            <button
              key={req.id}
              type="button"
              onClick={() => setActiveRequest(req.id)}
              className={`group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                activeRequest === req.id
                  ? "bg-brand-primary/10 text-neutral-text-primary"
                  : "text-neutral-text-secondary hover:bg-neutral-surface-2 hover:text-neutral-text-primary"
              }`}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className={`w-10 shrink-0 text-[10px] font-bold tracking-wide ${METHOD_COLORS[req.method]}`}>
                  {req.method}
                </span>
                <span className="truncate text-sm font-medium">{req.name}</span>
              </div>
              {activeRequest === req.id && (
                <MoreVertical size={14} className="shrink-0 text-brand-primary opacity-50 transition-opacity hover:opacity-100" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Workspace */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        
        {/* Omnibox (URL Bar) */}
        <div className="flex items-center gap-2 rounded-xl border border-neutral-border bg-neutral-surface-1 p-1 shadow-sm">
          <div className="relative shrink-0">
            <select 
              className={`appearance-none rounded-lg bg-transparent py-2 pl-4 pr-8 text-sm font-bold focus:outline-none ${METHOD_COLORS[currentReq?.method || "GET"]}`}
              value={currentReq?.method}
              onChange={() => {}}
            >
              <option value="GET" className="text-success">GET</option>
              <option value="POST" className="text-brand-accent">POST</option>
              <option value="PUT" className="text-warning">PUT</option>
              <option value="DELETE" className="text-error">DELETE</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-text-secondary" />
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

        {/* Split Pane: Request / Response */}
        <div className="flex flex-1 gap-4 overflow-hidden">
          
          {/* Left Pane: Request Builder */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
            <div className="flex border-b border-neutral-border bg-neutral-surface-2/30 px-2 pt-2">
              {REQUEST_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "text-brand-primary"
                      : "text-neutral-text-secondary hover:text-neutral-text-primary"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-[#0d0c1b]">
              {activeTab === "Params" && (
                <p className="text-sm text-neutral-text-secondary italic">No query parameters defined.</p>
              )}
              {activeTab === "Headers" && (
                <div className="space-y-2 font-mono text-sm text-neutral-text-primary">
                  <div className="flex gap-4">
                    <span className="text-brand-accent">Authorization</span>
                    <span className="text-success">Bearer eyJhbGciOiJIUzI1NiIsInR5...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-brand-accent">Content-Type</span>
                    <span className="text-success">application/json</span>
                  </div>
                </div>
              )}
              {activeTab === "Body" && (
                <textarea 
                  className="h-full w-full resize-none bg-transparent font-mono text-sm text-neutral-text-primary focus:outline-none"
                  defaultValue={`{\n  "userId": "usr_7729alx",\n  "flightId": "fl_1092"\n}`}
                  spellCheck="false"
                />
              )}
            </div>
          </div>

          {/* Right Pane: Response Viewer */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-border bg-neutral-surface-2/30 px-4 py-2.5">
              <span className="text-xs font-bold tracking-wider text-neutral-text-secondary uppercase">
                Response
              </span>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-success"></span>
                  <span className="font-semibold text-success">200 OK</span>
                </div>
                <span className="text-neutral-text-secondary">248 ms</span>
                <span className="text-neutral-text-secondary">1.2 KB</span>
                
                <div className="ml-2 h-4 w-px bg-neutral-border"></div>
                
                <button 
                  onClick={handleCopy}
                  className="ml-2 text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCheck size={16} className="text-success" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto bg-[#0d0c1b] p-4">
              <pre className="font-mono text-[13px] leading-relaxed text-neutral-text-primary">
                {/* 
                  استفاده از رنگ‌آمیزی ساختگی (Syntax Highlighting) برای نمایش بهتر JSON 
                  در محیط واقعی می‌توانید از کتابخانه‌هایی مثل prismjs یا react-syntax-highlighter استفاده کنید.
                */}
                <span className="text-neutral-text-secondary">{`{`}</span><br/>
                <span className="text-brand-highlight">  "status"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"success"</span><span className="text-neutral-text-primary">,</span><br/>
                <span className="text-brand-highlight">  "data"</span><span className="text-neutral-text-primary">: </span><span className="text-neutral-text-secondary">{`{`}</span><br/>
                <span className="text-brand-highlight">    "bookingId"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"bk_98f2a1c"</span><span className="text-neutral-text-primary">,</span><br/>
                <span className="text-brand-highlight">    "userId"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"usr_7729alx"</span><span className="text-neutral-text-primary">,</span><br/>
                <span className="text-brand-highlight">    "type"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"flight"</span><span className="text-neutral-text-primary">,</span><br/>
                <span className="text-brand-highlight">    "details"</span><span className="text-neutral-text-primary">: </span><span className="text-neutral-text-secondary">{`{`}</span><br/>
                <span className="text-brand-highlight">      "airline"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"Aseman Airlines"</span><span className="text-neutral-text-primary">,</span><br/>
                <span className="text-brand-highlight">      "route"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"THR -> BUZ"</span><span className="text-neutral-text-primary">,</span><br/>
                <span className="text-brand-highlight">      "class"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"Economy"</span><span className="text-neutral-text-primary">,</span><br/>
                <span className="text-brand-highlight">      "departure"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"2025-04-07T05:05:00Z"</span><br/>
                <span className="text-neutral-text-secondary">    {`}`}</span><span className="text-neutral-text-primary">,</span><br/>
                <span className="text-brand-highlight">    "paymentStatus"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"verified"</span><br/>
                <span className="text-neutral-text-secondary">  {`}`}</span><span className="text-neutral-text-primary">,</span><br/>
                <span className="text-brand-highlight">  "meta"</span><span className="text-neutral-text-primary">: </span><span className="text-neutral-text-secondary">{`{`}</span><br/>
                <span className="text-brand-highlight">    "processedAt"</span><span className="text-neutral-text-primary">: </span><span className="text-success">"2026-08-08T09:34:00Z"</span><br/>
                <span className="text-neutral-text-secondary">  {`}`}</span><br/>
                <span className="text-neutral-text-secondary">{`}`}</span>
              </pre>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}