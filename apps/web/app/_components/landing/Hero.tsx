import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HubDiagram from "./HubDiagram";
import Reveal from "./Reveal";

const MODULE_DOCS = [
  { label: "API Playground", href: "/docs/modules/api-playground" },
  { label: "AI Debugging", href: "/docs/modules/ai-debugging-assistant" },
  { label: "Analytics", href: "/docs/modules/developer-analytics" },
  { label: "Idea Validator", href: "/docs/modules/saas-idea-validator" },
];

export default function Hero() {
  return (
    <section className="relative border-b border-neutral-border pt-28 pb-16 md:pt-36 md:pb-24">
      {/* structural hairline column marks — quiet technical texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 lg:block"
      >
        <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-12 px-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-neutral-border/40 last:border-r" />
          ))}
        </div>
      </div>

      {/* soft, theme-driven ambient light behind the architecture panel.
          Clipped by its own layer so the section can still let the context
          strip overlap the next band. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      >
        <div className="absolute -right-40 top-10 h-[520px] w-[520px] bg-[radial-gradient(circle_at_center,var(--theme-primary),transparent_68%)] opacity-[0.09]" />
      </div>

      {/* floating UI fragments — depth behind the hero composition */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[3%] top-[16%] z-0 hidden rotate-2 xl:block"
      >
        <div className="dm-float-slow rounded-md border border-neutral-border bg-neutral-surface-1/90 px-3 py-2 shadow-[0_24px_60px_-38px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            <span className="dm-mono-label text-neutral-text-secondary">
              200 ok
            </span>
          </div>
          <div className="mt-1 font-mono text-[10px] text-neutral-text-secondary">
            GET /v1/projects · 142 ms
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[24%] left-[44%] z-0 hidden -rotate-2 2xl:block"
      >
        <div className="dm-float-slower rounded-md border border-neutral-border bg-neutral-surface-1/90 px-3 py-2 shadow-[0_24px_60px_-38px_rgba(0,0,0,0.9)]">
          <span className="dm-mono-label text-brand-primary">project</span>
          <div className="mt-1 font-mono text-[10px] text-neutral-text-secondary">
            devmatrix · 4 modules attached
          </div>
        </div>
      </div>

      <div className="dm-shell relative">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6 lg:pt-6">
            <p className="dm-mono-label text-brand-primary">
              analyze · debug · test · validate
            </p>

            <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-neutral-text-primary">
              The whole development
              <br />
              picture,{" "}
              <span className="relative whitespace-nowrap text-brand-primary">
                one project
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full bg-brand-primary/40"
                />
              </span>{" "}
              at a time.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-neutral-text-secondary md:text-lg">
              DevMatrix brings API testing, AI debugging, developer analytics,
              and idea validation around a single project — so the context of
              what you build never gets lost moving between tools.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/register"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-button-text transition-colors hover:bg-brand-primary/90 active:scale-[0.98] sm:w-auto"
              >
                Start a project
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/docs/introduction"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-border px-6 py-3 text-sm font-medium text-neutral-text-primary transition-colors hover:border-neutral-text-secondary/50 hover:bg-neutral-surface-1 active:scale-[0.98] sm:w-auto"
              >
                Read the docs
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-border pt-5">
              {MODULE_DOCS.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="font-mono text-[11px] text-neutral-text-secondary underline-offset-4 transition-colors hover:text-brand-primary hover:underline"
                  >
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative z-10 lg:col-span-6 lg:mt-14" delay={120}>
            {/* offset backing surface — layered workbench rather than a flat card */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-md border border-neutral-border/70 bg-neutral-surface-1/40"
            />
            <div className="relative">
              <HubDiagram />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Context strip straddles the section boundary, leading into the problem band. */}
      <div className="pointer-events-none absolute bottom-0 right-6 z-20 hidden translate-y-1/2 md:block">
        <div className="flex items-center gap-3 rounded-md border border-neutral-border bg-neutral-surface-1 px-4 py-2.5 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
          </span>
          <span className="dm-mono-label text-neutral-text-secondary">
            4 modules · 1 project · project-scoped by default
          </span>
        </div>
      </div>
    </section>
  );
}
