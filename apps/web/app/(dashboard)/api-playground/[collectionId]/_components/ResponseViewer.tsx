"use client";

import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";
import { SAMPLE_RESPONSE } from "./constants";

export default function ResponseViewer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_RESPONSE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
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
            {copied ? (
              <CheckCheck size={16} className="text-success" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#0d0c1b] p-4">
        <pre className="font-mono text-[13px] leading-relaxed text-neutral-text-primary">
          {/* 
            استفاده از رنگ‌آمیزی ساختگی (Syntax Highlighting) برای نمایش بهتر JSON 
            در محیط واقعی می‌توانید از کتابخانه‌هایی مثل prismjs یا react-syntax-highlighter استفاده کنید.
          */}
          <span className="text-neutral-text-secondary">{`{`}</span>
          <br />
          <span className="text-brand-highlight">  "status"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"success"</span>
          <span className="text-neutral-text-primary">,</span>
          <br />
          <span className="text-brand-highlight">  "data"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-neutral-text-secondary">{`{`}</span>
          <br />
          <span className="text-brand-highlight">    "bookingId"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"bk_98f2a1c"</span>
          <span className="text-neutral-text-primary">,</span>
          <br />
          <span className="text-brand-highlight">    "userId"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"usr_7729alx"</span>
          <span className="text-neutral-text-primary">,</span>
          <br />
          <span className="text-brand-highlight">    "type"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"flight"</span>
          <span className="text-neutral-text-primary">,</span>
          <br />
          <span className="text-brand-highlight">    "details"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-neutral-text-secondary">{`{`}</span>
          <br />
          <span className="text-brand-highlight">      "airline"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"Aseman Airlines"</span>
          <span className="text-neutral-text-primary">,</span>
          <br />
          <span className="text-brand-highlight">      "route"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"THR -&gt; BUZ"</span>
          <span className="text-neutral-text-primary">,</span>
          <br />
          <span className="text-brand-highlight">      "class"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"Economy"</span>
          <span className="text-neutral-text-primary">,</span>
          <br />
          <span className="text-brand-highlight">      "departure"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"2025-04-07T05:05:00Z"</span>
          <br />
          <span className="text-neutral-text-secondary">    {`}`}</span>
          <span className="text-neutral-text-primary">,</span>
          <br />
          <span className="text-brand-highlight">    "paymentStatus"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"verified"</span>
          <br />
          <span className="text-neutral-text-secondary">  {`}`}</span>
          <span className="text-neutral-text-primary">,</span>
          <br />
          <span className="text-brand-highlight">  "meta"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-neutral-text-secondary">{`{`}</span>
          <br />
          <span className="text-brand-highlight">    "processedAt"</span>
          <span className="text-neutral-text-primary">: </span>
          <span className="text-success">"2026-08-08T09:34:00Z"</span>
          <br />
          <span className="text-neutral-text-secondary">  {`}`}</span>
          <br />
          <span className="text-neutral-text-secondary">{`}`}</span>
        </pre>
      </div>
    </div>
  );
}
