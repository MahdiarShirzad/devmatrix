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

          <Reveal className="lg:col-span-6 lg:mt-14" delay={120}>
            <HubDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
