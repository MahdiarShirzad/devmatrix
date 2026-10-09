const MODULES = [
  { id: "playground", label: "API Playground", artifact: "requests, collections, responses" },
  { id: "debug", label: "AI Debugging", artifact: "causes, fixes, explanations" },
  { id: "analytics", label: "Developer Analytics", artifact: "commits, trends, activity" },
  { id: "validator", label: "Idea Validator", artifact: "market, competitors, SWOT" },
] as const;

/** Vertical position of each module row in the SVG coordinate space. */
const ROW_Y = [16, 96, 176, 256];
const BOX_H = 62;
const HUB_CY = 178;

function modulePath(y: number) {
  const startY = y + BOX_H / 2;
  return `M 196 ${startY} C 268 ${startY}, 300 ${HUB_CY}, 368 ${HUB_CY}`;
}

/**
 * The product's real architecture, drawn as a routing diagram:
 * four project-scoped workflows converging on a single Project.
 *
 * Desktop renders the SVG diagram; mobile falls back to a stacked
 * list with the same content so nothing depends on precise alignment.
 */
export default function HubDiagram() {
  return (
    <div className="dm-panel relative overflow-hidden" aria-hidden={false}>
      {/* Corner ticks — echo of the matrix-grid mark */}
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-brand-primary/60" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-brand-primary/60" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-brand-primary/60" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-brand-primary/60" />

      <div className="flex items-center justify-between border-b border-neutral-border px-4 py-2.5">
        <span className="dm-mono-label text-neutral-text-secondary">
          architecture / project-scoping
        </span>
        <span className="dm-mono-label text-brand-primary">4 modules · 1 project</span>
      </div>

      {/* ---- Desktop: routing diagram ---- */}
      <svg
        viewBox="0 0 560 344"
        className="hidden h-auto w-full md:block"
        role="img"
        aria-label="Diagram: API Playground, AI Debugging, Developer Analytics and Idea Validator all connect to a single Project."
      >
        {/* faint baseline grid */}
        <g stroke="currentColor" className="text-neutral-border" strokeWidth="1" opacity="0.5">
          {[80, 160, 240, 320].map((x) => (
            <line key={x} x1={x} y1="8" x2={x} y2="336" strokeDasharray="1 7" />
          ))}
        </g>

        {/* connection rails */}
        <g fill="none" strokeLinecap="round">
          {MODULES.map((_, i) => (
            <path
              key={`base-${i}`}
              d={modulePath(ROW_Y[i])}
              stroke="currentColor"
              className="text-neutral-border"
              strokeWidth="1.25"
            />
          ))}
          {MODULES.map((_, i) => (
            <path
              key={`pulse-${i}`}
              d={modulePath(ROW_Y[i])}
              stroke="currentColor"
              className="text-brand-primary dm-route-pulse"
              strokeWidth="1.5"
              opacity="0.85"
            />
          ))}
        </g>

        {/* module nodes */}
        {MODULES.map((m, i) => (
          <g key={m.id}>
            <rect
              x="8"
              y={ROW_Y[i]}
              width="188"
              height={BOX_H}
              rx="3"
              fill="currentColor"
              className="text-neutral-surface-2"
              stroke="currentColor"
              strokeWidth="1"
            />
            <rect
              x="8"
              y={ROW_Y[i]}
              width="3"
              height={BOX_H}
              fill="currentColor"
              className="text-brand-primary"
              opacity="0.9"
            />
            <text
              x="24"
              y={ROW_Y[i] + 26}
              fill="currentColor"
              className="text-neutral-text-primary"
              fontSize="13.5"
              fontWeight="600"
              fontFamily="var(--font-sans)"
            >
              {m.label}
            </text>
            <text
              x="24"
              y={ROW_Y[i] + 45}
              fill="currentColor"
              className="text-neutral-text-secondary"
              fontSize="10.5"
              fontFamily="var(--font-mono)"
            >
              {m.artifact}
            </text>
          </g>
        ))}

        {/* project hub */}
        <g>
          <rect
            x="368"
            y={HUB_CY - 66}
            width="184"
            height="132"
            rx="3"
            fill="currentColor"
            className="text-neutral-surface-2"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          {/* matrix-dot motif inside the hub */}
          <g fill="currentColor" className="text-brand-primary" opacity="0.9">
            {[0, 1, 2].map((c) =>
              [0, 1, 2].map((r) => (
                <rect
                  key={`${c}-${r}`}
                  x={390 + c * 16}
                  y={HUB_CY - 46 + r * 16}
                  width="7"
                  height="7"
                  rx="1"
                  opacity={(c + r) % 2 === 0 ? 0.9 : 0.35}
                />
              )),
            )}
          </g>
          <text
            x="448"
            y={HUB_CY - 22}
            fill="currentColor"
            className="text-neutral-text-primary"
            fontSize="15"
            fontWeight="700"
            fontFamily="var(--font-sans)"
            letterSpacing="0.04em"
          >
            PROJECT
          </text>
          <text
            x="448"
            y={HUB_CY - 4}
            fill="currentColor"
            className="text-neutral-text-secondary"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            one shared context
          </text>
          <line
            x1="388"
            y1={HUB_CY + 18}
            x2="532"
            y2={HUB_CY + 18}
            stroke="currentColor"
            className="text-neutral-border"
            strokeWidth="1"
          />
          <text
            x="388"
            y={HUB_CY + 40}
            fill="currentColor"
            className="text-neutral-text-secondary"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            requests · errors · commits
          </text>
          <text
            x="388"
            y={HUB_CY + 54}
            fill="currentColor"
            className="text-neutral-text-secondary"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            metrics · idea reports
          </text>
        </g>
      </svg>

      {/* ---- Mobile: stacked equivalent ---- */}
      <div className="divide-y divide-neutral-border md:hidden">
        {MODULES.map((m) => (
          <div key={m.id} className="flex items-baseline justify-between gap-3 px-4 py-3.5">
            <div>
              <div className="text-sm font-semibold text-neutral-text-primary">{m.label}</div>
              <div className="mt-0.5 font-mono text-[11px] text-neutral-text-secondary">
                {m.artifact}
              </div>
            </div>
            <span className="dm-mono-label shrink-0 text-brand-primary">→</span>
          </div>
        ))}
        <div className="bg-neutral-surface-2 px-4 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid grid-cols-3 gap-[3px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-[1px] bg-brand-primary ${
                    i % 2 === 0 ? "opacity-90" : "opacity-40"
                  }`}
                />
              ))}
            </span>
            <div>
              <div className="text-sm font-bold tracking-wide text-neutral-text-primary">
                PROJECT
              </div>
              <div className="font-mono text-[11px] text-neutral-text-secondary">
                one shared context
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-border px-4 py-2.5">
        <p className="font-mono text-[11px] leading-relaxed text-neutral-text-secondary">
          Every module in DevMatrix attaches to a project — that is what keeps a
          multi-tool platform feeling like one product.
        </p>
      </div>
    </div>
  );
}
