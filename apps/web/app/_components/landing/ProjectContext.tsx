import Reveal from "./Reveal";

const LEDGER = [
  { artifact: "Requests, collections, responses", source: "API Playground" },
  { artifact: "Debug sessions, causes, resolutions", source: "AI Debugging" },
  { artifact: "Commit history, trends, languages", source: "Developer Analytics" },
  { artifact: "Validation reports, SWOT breakdowns", source: "Idea Validator" },
];

/**
 * The single inverted band on the page. Rendered with the product's own
 * brand-primary / button-text token pair, so it stays legible in every theme.
 */
export default function ProjectContext() {
  return (
    <section className="bg-brand-primary text-button-text">
      <div className="dm-shell relative py-20 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-button-text/10"
        />
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="dm-mono-label opacity-70">one context</p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-[-0.025em] md:text-[2.35rem]">
              A project is not a folder.
              <br />
              It is the memory of the work.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed opacity-80">
              In most setups, every tool forgets the others. In DevMatrix,
              each workflow deposits what it learns into the project it belongs
              to — so the next session starts where the last one ended.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <div className="relative">
              {/* offset backing surface — the ledger sits above the section plane */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-2 translate-y-3 rounded-md border border-button-text/20 bg-button-text/5"
              />

              <div className="relative overflow-hidden rounded-md border border-button-text/25 bg-brand-primary shadow-[0_28px_60px_-38px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between border-b border-button-text/25 px-4 py-2.5">
                <span className="dm-mono-label opacity-70">project ledger</span>
                <span className="dm-mono-label opacity-70">written by</span>
              </div>
              <ul className="divide-y divide-button-text/20">
                {LEDGER.map((row) => (
                  <li
                    key={row.artifact}
                    className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-[14.5px] font-medium">{row.artifact}</span>
                    <span className="shrink-0 font-mono text-[11px] opacity-70">
                      {row.source}
                    </span>
                  </li>
                ))}
              </ul>
                <div className="border-t border-button-text/25 px-4 py-3">
                  <p className="font-mono text-[11px] leading-relaxed opacity-70">
                    create one project per app — every request, error, metric,
                    and report lives under it
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 right-3 hidden rounded border border-button-text/25 bg-button-text px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] text-brand-primary sm:block">
                memory of the work
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
