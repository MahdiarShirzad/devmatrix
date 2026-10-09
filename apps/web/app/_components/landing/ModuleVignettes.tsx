/* Interface compositions for each DevMatrix module.
   These are illustrative depictions of real product capabilities,
   built from the flows documented in the product docs and README. */

import type { ReactNode } from "react";

function VignetteFrame({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <figure className="dm-panel overflow-hidden rounded-md">
      <figcaption className="flex items-center justify-between border-b border-neutral-border px-4 py-2.5">
        <span className="dm-mono-label text-neutral-text-secondary">{label}</span>
        {meta && <span className="dm-mono-label text-brand-primary">{meta}</span>}
      </figcaption>
      <div className="p-4">{children}</div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · API Playground                                                 */
/* ------------------------------------------------------------------ */

export function PlaygroundVignette() {
  return (
    <VignetteFrame label="api playground" meta="request">
      <div className="flex items-stretch gap-2">
        <span className="flex items-center rounded border border-brand-primary/40 bg-brand-primary/10 px-2.5 font-mono text-[11px] font-semibold text-brand-primary">
          GET
        </span>
        <span className="min-w-0 flex-1 truncate rounded border border-neutral-border bg-neutral-surface-2 px-3 py-1.5 font-mono text-[11px] text-neutral-text-primary">
          https://api.yourapp.com/v1/projects
        </span>
        <span className="hidden items-center rounded border border-neutral-border px-3 font-mono text-[11px] text-neutral-text-secondary sm:flex">
          Send
        </span>
      </div>

      <div className="mt-4 flex gap-4 border-b border-neutral-border">
        {["Params", "Headers", "Body"].map((tab, i) => (
          <span
            key={tab}
            className={`-mb-px border-b pb-2 font-mono text-[11px] ${
              i === 0
                ? "border-brand-primary text-neutral-text-primary"
                : "border-transparent text-neutral-text-secondary"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {[
          ["status", "active"],
          ["limit", "20"],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <span className="w-1/3 truncate font-mono text-[11px] text-neutral-text-secondary">
              {k}
            </span>
            <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-neutral-text-primary">
              {v}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded border border-neutral-border bg-neutral-surface-2 p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold text-success">
            200 OK
          </span>
          <span className="font-mono text-[11px] text-neutral-text-secondary">
            142 ms · JSON
          </span>
        </div>
        <pre className="mt-2 overflow-x-auto font-mono text-[11px] leading-relaxed text-neutral-text-secondary">
{`{
  "projects": [
    { "name": "devmatrix", "open": true }
  ]
}`}
        </pre>
      </div>
    </VignetteFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · AI Debugging                                                   */
/* ------------------------------------------------------------------ */

const DEBUG_STEPS = [
  { phase: "detect issue", result: "TypeError thrown in project list view" },
  { phase: "identify cause", result: "response.projects is undefined on 204" },
  { phase: "analyze impact", result: "list render crashes; dashboard blank" },
  { phase: "suggest fix", result: "guard with ?? [] before mapping" },
];

export function DebugVignette() {
  return (
    <VignetteFrame label="ai debugging" meta="structured analysis">
      <div className="rounded border border-error/40 bg-error/10 px-3 py-2.5">
        <div className="font-mono text-[11px] font-semibold text-error">
          TypeError: Cannot read properties of undefined (reading &apos;map&apos;)
        </div>
        <div className="mt-1 font-mono text-[10.5px] text-neutral-text-secondary">
          at ProjectList (src/views/projects.tsx:42)
        </div>
      </div>

      <ol className="mt-4 space-y-0">
        {DEBUG_STEPS.map((s, i) => (
          <li key={s.phase} className="relative flex gap-3 pb-4 last:pb-0">
            {i < DEBUG_STEPS.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[5px] top-4 h-full w-px bg-neutral-border"
              />
            )}
            <span
              aria-hidden
              className="relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border border-brand-primary bg-neutral-surface-1"
            />
            <div className="min-w-0">
              <span className="dm-mono-label text-brand-primary">{s.phase}</span>
              <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-neutral-text-primary">
                {s.result}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </VignetteFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Developer Analytics                                            */
/* ------------------------------------------------------------------ */

/* Deterministic pattern (7 day-rows × 12 week-columns) so SSR and client match. */
const HEAT = [
  0, 1, 2, 0, 3, 1, 0, 1, 2, 3, 1, 0, 2, 3, 1, 0, 2, 1, 3, 2, 0, 1, 2, 0, 1, 3,
  2, 1, 0, 2, 1, 0, 3, 2, 1, 0, 1, 2, 3, 0, 2, 1, 0, 3, 1, 2, 0, 1, 3, 2, 1, 0,
  2, 3, 1, 0, 1, 2, 0, 3, 1, 0, 2, 1, 3, 0, 1, 2, 3, 1, 0, 2, 1, 0, 3, 2, 1, 0,
  2, 3, 1, 0, 1, 2,
];

const LANGS = [
  { name: "TypeScript", w: "72%" },
  { name: "Python", w: "48%" },
  { name: "Go", w: "30%" },
];

export function AnalyticsVignette() {
  return (
    <VignetteFrame label="developer analytics" meta="github activity">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-neutral-text-secondary">
          commit activity
        </span>
        <span className="font-mono text-[10px] text-neutral-text-secondary/70">
          illustrative
        </span>
      </div>

      <div
        className="mt-3 grid grid-flow-col grid-rows-7 gap-[3px]"
        aria-hidden
      >
        {HEAT.map((level, i) => (
          <span
            key={i}
            className={`aspect-square rounded-[2px] ${
              level === 0
                ? "bg-neutral-surface-2"
                : level === 1
                  ? "bg-brand-primary/25"
                  : level === 2
                    ? "bg-brand-primary/55"
                    : "bg-brand-primary/90"
            }`}
          />
        ))}
      </div>

      <div className="mt-2 flex justify-between font-mono text-[10px] text-neutral-text-secondary/70">
        <span>12 weeks ago</span>
        <span>today</span>
      </div>

      <div className="mt-5 border-t border-neutral-border pt-4">
        <span className="font-mono text-[11px] text-neutral-text-secondary">
          language distribution
        </span>
        <div className="mt-3 space-y-2.5">
          {LANGS.map((l) => (
            <div key={l.name} className="flex items-center gap-3">
              <span className="w-24 shrink-0 font-mono text-[11px] text-neutral-text-primary">
                {l.name}
              </span>
              <span className="h-1.5 flex-1 rounded-full bg-neutral-surface-2">
                <span
                  className="block h-full rounded-full bg-brand-primary/80"
                  style={{ width: l.w }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </VignetteFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · Idea Validator                                                 */
/* ------------------------------------------------------------------ */

const REPORT_SECTIONS = [
  { name: "Market analysis", note: "size, segment, timing" },
  { name: "Competitors", note: "who already ships this" },
  { name: "Feature suggestions", note: "where to differentiate" },
  { name: "Revenue model", note: "pricing directions" },
  { name: "SWOT", note: "strengths, risks, gaps" },
];

export function ValidatorVignette() {
  return (
    <VignetteFrame label="idea validator" meta="validation report">
      <div className="rounded border border-neutral-border bg-neutral-surface-2 px-3 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-text-secondary">
          idea
        </span>
        <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-neutral-text-primary">
          &ldquo;A Slack bot that auto-triages GitHub issues by severity&rdquo;
        </p>
      </div>

      <ul className="mt-4 divide-y divide-neutral-border overflow-hidden rounded border border-neutral-border">
        {REPORT_SECTIONS.map((s, i) => (
          <li
            key={s.name}
            className="flex items-baseline justify-between gap-3 bg-neutral-surface-1 px-3 py-2.5"
          >
            <span className="flex min-w-0 items-baseline gap-2.5">
              <span className="font-mono text-[10px] text-brand-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate text-[12.5px] font-medium text-neutral-text-primary">
                {s.name}
              </span>
            </span>
            <span className="hidden shrink-0 font-mono text-[10.5px] text-neutral-text-secondary sm:block">
              {s.note}
            </span>
          </li>
        ))}
      </ul>
    </VignetteFrame>
  );
}
