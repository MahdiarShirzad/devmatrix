import Reveal from "./Reveal";

const FRAGMENTS = [
  { tool: "API client", task: "hit an endpoint" },
  { tool: "AI chat", task: "read a stack trace" },
  { tool: "Analytics dashboard", task: "check commit activity" },
  { tool: "Spreadsheet", task: "weigh the next idea" },
];

/** Staggered vertical offsets keep the four panels from reading as a grid. */
const OFFSETS = [
  "sm:-translate-y-1",
  "sm:translate-y-4",
  "sm:-translate-y-1",
  "sm:translate-y-3",
];

/**
 * A single editorial band that states the problem the product solves.
 * The panels are deliberately offset and elevated at different depths so the
 * fragmentation is visible, not just described.
 */
export default function ProblemStrip() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-border bg-neutral-surface-2/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(to_right,transparent,var(--theme-surface),transparent)] opacity-40 lg:block"
      />

      <div className="dm-shell relative py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="dm-mono-label text-neutral-text-secondary">the problem</p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.02em] text-neutral-text-primary md:text-[1.75rem]">
              One tool per job —
              <br />
              none of them remember
              <br />
              the others.
            </h2>
            <p className="mt-5 max-w-[16rem] font-mono text-[11px] leading-relaxed text-neutral-text-secondary/80">
              four tools · four contexts · the story of the project lives in
              your head
            </p>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={80}>
            <div className="relative">
              {/* broken rail — the visual opposite of the connected hub */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-2 top-1/2 hidden border-t border-dashed border-neutral-border sm:block"
              />

              <ol className="relative grid gap-3 sm:grid-cols-2">
                {FRAGMENTS.map((fragment, index) => (
                  <li
                    key={fragment.tool}
                    className={`relative ${OFFSETS[index]}`}
                    style={{ zIndex: index % 2 === 0 ? 2 : 1 }}
                  >
                    <div className="group relative overflow-hidden rounded-md border border-neutral-border bg-neutral-surface-1 px-4 py-4 shadow-[0_18px_44px_-36px_rgba(0,0,0,0.9)] transition-[transform,border-color] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-neutral-text-secondary/40">
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,var(--theme-primary),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                      />

                      <div className="flex items-center justify-between gap-3">
                        <span className="dm-mono-label text-brand-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-neutral-text-secondary/60">
                          <span aria-hidden className="h-px w-4 border-t border-dashed border-current" />
                          isolated
                        </span>
                      </div>

                      <div className="mt-3 text-sm font-medium text-neutral-text-primary">
                        {fragment.tool}
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-neutral-text-secondary">
                        {fragment.task}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-5 font-mono text-[11px] leading-relaxed text-neutral-text-secondary">
                four tools · four contexts · the story of the project lives in
                your head
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
