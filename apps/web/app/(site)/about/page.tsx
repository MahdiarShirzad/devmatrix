import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, Bug, Rocket, Zap } from "lucide-react";
import PageHero from "../_components/PageHero";

export const metadata: Metadata = {
  title: "About — DevMatrix",
  description:
    "Why DevMatrix exists, the principles behind it, and the four modules that share one project context.",
};

const MODULES = [
  {
    icon: Zap,
    name: "API Playground",
    href: "/docs/modules/api-playground",
    description:
      "Build and send HTTP requests, and keep them grouped in collections that belong to the project they test.",
  },
  {
    icon: Bug,
    name: "AI Debugging",
    href: "/docs/modules/ai-debugging-assistant",
    description:
      "Turn a stack trace into a structured explanation: cause, impact, and a fix you can actually review.",
  },
  {
    icon: BarChart3,
    name: "Developer Analytics",
    href: "/docs/modules/developer-analytics",
    description:
      "Read GitHub activity as trends — commits over time, language distribution, and contributor patterns.",
  },
  {
    icon: Rocket,
    name: "Idea Validator",
    href: "/docs/modules/saas-idea-validator",
    description:
      "Pressure-test a product idea with market, competitor, and SWOT analysis before writing the first commit.",
  },
];

const PRINCIPLES = [
  {
    index: "01",
    title: "The project is the unit",
    body: "A repository, an API, an idea, and a running error all describe the same thing. DevMatrix keeps them together instead of scattering them across four tools with four logins.",
  },
  {
    index: "02",
    title: "Context should accumulate",
    body: "Every request, debug session, metric, and report is saved. Coming back to a project next month should feel like resuming, not restarting.",
  },
  {
    index: "03",
    title: "Honest interfaces",
    body: "No fabricated metrics, invented customer logos, or fake urgency. If a number is on screen, it came from your data or it is clearly labeled as an example.",
  },
  {
    index: "04",
    title: "Open by default",
    body: "The source lives on GitHub. The design system, documentation, and module behavior are meant to be read, questioned, and improved.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="about"
        title="One workspace for the whole development loop."
        description="DevMatrix is a developer intelligence platform: test an API, debug a failure, read your activity, and validate an idea — all attached to the same project."
        meta={
          <span className="font-mono text-[11px]">
            open source · built by Mahdyar Shirzad
          </span>
        }
      />

      <div className="dm-shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p className="dm-mono-label text-neutral-text-secondary">
              why it exists
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-neutral-text-primary md:text-[1.75rem]">
              Developer tools are good at their job. They are bad at sharing.
            </h2>

            <div className="mt-6 space-y-4 text-[14.5px] leading-7 text-neutral-text-secondary">
              <p>
                A typical workflow touches a REST client, a debugging assistant, a
                GitHub dashboard, and a notes app. Each one holds a fragment of the
                same story, and none of them knows what the others do. The result
                is re-explaining context: which project, which environment, which
                error, which idea.
              </p>
              <p>
                DevMatrix takes the opposite approach. You create a project once,
                then every module writes to that project. An API request saved in
                the playground sits beside the error it produced and the commit
                activity around it.
              </p>
              <p>
                The aim is not to replace the tools you love. It is to give the
                work a single place to live, so the context you build up survives
                longer than the tab you built it in.
              </p>
            </div>
          </div>

          <aside className="h-fit rounded-xl border border-neutral-border bg-neutral-surface-1 p-6">
            <p className="dm-mono-label text-neutral-text-secondary">at a glance</p>
            <dl className="mt-5 space-y-4 text-[13px]">
              <div className="flex items-baseline justify-between gap-4 border-b border-neutral-border pb-4">
                <dt className="text-neutral-text-secondary">Modules</dt>
                <dd className="font-mono text-neutral-text-primary">4</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-neutral-border pb-4">
                <dt className="text-neutral-text-secondary">Core model</dt>
                <dd className="font-mono text-neutral-text-primary">Project</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-b border-neutral-border pb-4">
                <dt className="text-neutral-text-secondary">Auth</dt>
                <dd className="font-mono text-neutral-text-primary">
                  Email · GitHub
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-neutral-text-secondary">Source</dt>
                <dd className="font-mono text-neutral-text-primary">Public</dd>
              </div>
            </dl>
            <Link
              href="/docs/what-is-devmatrix"
              className="group mt-6 inline-flex items-center gap-1.5 border-b border-neutral-border pb-0.5 text-[12.5px] font-medium text-neutral-text-primary transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              Read the overview
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </aside>
        </div>

        <section className="mt-20 border-t border-neutral-border pt-14">
          <p className="dm-mono-label text-neutral-text-secondary">the modules</p>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.02em] text-neutral-text-primary md:text-[1.75rem]">
            Four workflows, each useful alone.
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.name}
                  href={module.href}
                  className="group rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 transition-colors hover:border-brand-primary/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-lg border border-neutral-border bg-neutral-surface-2 p-2">
                      <Icon size={17} className="text-brand-primary" />
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="text-neutral-text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-primary"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-neutral-text-primary">
                    {module.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-neutral-text-secondary">
                    {module.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-20 border-t border-neutral-border pt-14">
          <p className="dm-mono-label text-neutral-text-secondary">principles</p>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.02em] text-neutral-text-primary md:text-[1.75rem]">
            What the product optimizes for.
          </h2>

          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <div key={principle.index}>
                <div className="flex items-baseline gap-3">
                  <span className="dm-mono-label text-brand-primary">
                    {principle.index}
                  </span>
                  <h3 className="text-[15px] font-semibold text-neutral-text-primary">
                    {principle.title}
                  </h3>
                </div>
                <p className="mt-2.5 text-[13.5px] leading-7 text-neutral-text-secondary">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-neutral-border pt-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="dm-mono-label text-neutral-text-secondary">
                who builds it
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-neutral-text-primary md:text-[1.75rem]">
                An independent, open-source project.
              </h2>
              <p className="mt-4 max-w-2xl text-[14.5px] leading-7 text-neutral-text-secondary">
                DevMatrix is designed and maintained by{" "}
                <a
                  href="https://github.com/MahdiarShirzad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary underline underline-offset-4"
                >
                  Mahdyar Shirzad
                </a>
                . The repository is public, issues and pull requests are welcome,
                and the{" "}
                <Link
                  href="/docs/introduction"
                  className="text-brand-primary underline underline-offset-4"
                >
                  documentation
                </Link>{" "}
                explains how each module is put together.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://github.com/MahdiarShirzad/devmatrix"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-border px-5 py-2.5 text-sm font-medium text-neutral-text-primary transition-colors hover:border-neutral-text-secondary/50 hover:bg-neutral-surface-1"
              >
                View the repository
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-border px-5 py-2.5 text-sm font-medium text-neutral-text-primary transition-colors hover:border-neutral-text-secondary/50 hover:bg-neutral-surface-1"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-neutral-border pt-14">
          <div className="flex flex-col gap-6 rounded-xl border border-neutral-border bg-neutral-surface-1 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-neutral-text-primary">
                Start with one project.
              </h2>
              <p className="mt-2 text-[13.5px] text-neutral-text-secondary">
                Create an account, name a project, and open whichever module you
                need first.
              </p>
            </div>
            <Link
              href="/register"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-brand-primary px-5 py-3 text-sm font-semibold text-button-text transition-colors hover:bg-brand-primary/90 active:scale-[0.98]"
            >
              Create your account
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
