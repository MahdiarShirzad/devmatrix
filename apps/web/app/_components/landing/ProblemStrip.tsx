import Reveal from "./Reveal";

const FRAGMENTS = [
  { tool: "API client", task: "hit an endpoint" },
  { tool: "AI chat", task: "read a stack trace" },
  { tool: "Analytics dashboard", task: "check commit activity" },
  { tool: "Spreadsheet", task: "weigh the next idea" },
];

/**
 * A single editorial band that states the problem the product solves.
 * The copy mirrors the docs introduction: one tool per job, no shared memory.
 */
export default function ProblemStrip() {
  return (
    <section className="border-b border-neutral-border bg-neutral-surface-2/60">
      <div className="dm-shell py-14 md:py-16">
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
          </Reveal>

          <Reveal className="lg:col-span-8" delay={80}>
            <ol className="grid gap-px overflow-hidden rounded-md border border-neutral-border bg-neutral-border sm:grid-cols-2 lg:grid-cols-4">
              {FRAGMENTS.map((f, i) => (
                <li key={f.tool} className="bg-neutral-surface-1 px-4 py-4">
                  <span className="dm-mono-label text-brand-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-2.5 text-sm font-medium text-neutral-text-primary">
                    {f.tool}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-neutral-text-secondary">
                    {f.task}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-neutral-text-secondary">
              four tools · four contexts · the story of the project lives in
              your head
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
