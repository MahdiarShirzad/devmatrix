import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import {
  AnalyticsVignette,
  DebugVignette,
  PlaygroundVignette,
  ValidatorVignette,
} from "./ModuleVignettes";

const MODULES = [
  {
    index: "01",
    name: "API Playground",
    title: "Test an endpoint without leaving the project.",
    desc: "Build and send HTTP requests from inside DevMatrix. Group them into collections so a whole API surface can be saved, re-run, and picked up again later.",
    points: ["GET, POST, PUT, DELETE", "Headers, params, JSON bodies", "Collections per project"],
    href: "/docs/modules/api-playground",
    Vignette: PlaygroundVignette,
  },
  {
    index: "02",
    name: "AI Debugging",
    title: "An error arrives as a structured analysis, not a wall of text.",
    desc: "Submit a stack trace and receive a breakdown of the issue, its likely cause, its impact, and a concrete fix — an explanation you can learn from, not just a patch to paste.",
    points: ["Cause and impact, separated", "Fixes with reasoning", "Sessions kept per project"],
    href: "/docs/modules/ai-debugging-assistant",
    Vignette: DebugVignette,
  },
  {
    index: "03",
    name: "Developer Analytics",
    title: "Your GitHub activity, turned into a readable signal.",
    desc: "Connect a repository and DevMatrix transforms commit history into dashboards — activity over time, language distribution, and per-project patterns you can actually act on.",
    points: ["Commit and contribution trends", "Language and repo breakdowns", "Synced from GitHub"],
    href: "/docs/modules/developer-analytics",
    Vignette: AnalyticsVignette,
  },
  {
    index: "04",
    name: "Idea Validator",
    title: "Pressure-test an idea before you write the first commit.",
    desc: "Describe what you want to build. The validator returns a structured report — market, competitors, differentiators, revenue directions, and a SWOT breakdown.",
    points: ["Market and competitor scan", "Feature and revenue angles", "SWOT, structured"],
    href: "/docs/modules/saas-idea-validator",
    Vignette: ValidatorVignette,
  },
];

/**
 * The four real modules, each shown through its own interface composition
 * rather than a repeated card. Rows alternate sides for rhythm.
 */
export default function Modules() {
  return (
    <section id="modules" className="scroll-mt-20 border-b border-neutral-border">
      <div className="dm-shell py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="dm-mono-label text-neutral-text-secondary">the modules</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-neutral-text-primary md:text-[2.5rem] md:leading-[1.12]">
            Four workflows, each useful alone — designed to share one memory.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-text-secondary">
            Every module attaches to a project. Requests, debug sessions,
            metrics, and idea reports stay gathered around the thing they
            describe.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {MODULES.map((m, i) => {
            const textFirst = i % 2 === 0;
            return (
              <Reveal key={m.index} as="article" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={textFirst ? "lg:pr-4" : "lg:order-2 lg:pl-4"}>
                  <div className="flex items-baseline gap-3">
                    <span className="dm-mono-label text-brand-primary">{m.index}</span>
                    <span className="dm-mono-label text-neutral-text-secondary">
                      {m.name}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.02em] text-neutral-text-primary md:text-[1.75rem]">
                    {m.title}
                  </h3>

                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-text-secondary">
                    {m.desc}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {m.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-baseline gap-2.5 font-mono text-[11.5px] text-neutral-text-secondary"
                      >
                        <span aria-hidden className="text-brand-primary">
                          ·
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={m.href}
                    className="group mt-7 inline-flex items-center gap-1.5 border-b border-neutral-border pb-0.5 text-[13px] font-medium text-neutral-text-primary transition-colors hover:border-brand-primary hover:text-brand-primary"
                  >
                    {m.name} docs
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>

                <div className={textFirst ? "lg:order-2" : "lg:order-1"}>
                  <m.Vignette />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
