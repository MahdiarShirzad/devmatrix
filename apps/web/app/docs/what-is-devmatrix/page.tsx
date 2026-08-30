// WhatIsDevMatrixPage.tsx
import Link from "next/link";
import { Zap, Bug, BarChart3, Rocket, CheckCircle2 } from "lucide-react";
import Breadcrumb from "../_components/Breadcrumb";
import PageHeader from "../_components/PageHeader";
import SectionHeading from "../_components/SectionHeading";
import Callout from "../_components/Callout";
import Toc from "../_components/Toc";
import DocsPagination from "../_components/DocsPagination";

const modules = [
  {
    icon: Zap,
    name: "API Playground",
    href: "/docs/modules/api-playground",
    tagline: "A lightweight API testing environment, similar to Postman.",
  },
  {
    icon: Bug,
    name: "AI Debugging Assistant",
    href: "/docs/modules/ai-debugging-assistant",
    tagline: "An assistant that analyzes errors and suggests fixes.",
  },
  {
    icon: BarChart3,
    name: "Developer Analytics Platform",
    href: "/docs/modules/developer-analytics",
    tagline: "GitHub and Jira activity, turned into dashboards.",
  },
  {
    icon: Rocket,
    name: "SaaS Idea Validator",
    href: "/docs/modules/saas-idea-validator",
    tagline: "AI-powered market and competitor research.",
  },
];

export default function WhatIsDevMatrixPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            { name: "Getting Started", href: "/docs/introduction" },
          ]}
          current="What is DevMatrix?"
        />

        <PageHeader
          title="What is DevMatrix?"
          description="DevMatrix is a comprehensive developer platform that brings API testing, debugging, analytics, and idea validation into a single, unified environment."
        />

        <div className="max-w-none">
          <SectionHeading id="overview">Overview</SectionHeading>
          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            DevMatrix aims to improve developer productivity by centralizing
            workflows such as API testing, debugging, analytics, and idea
            validation. Instead of stitching together multiple disconnected
            tools, DevMatrix provides a single dashboard where developers can
            manage and interact with every tool seamlessly.
          </p>
          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            The platform is built around a core system —{" "}
            <code className="bg-neutral-surface-2 px-1.5 py-0.5 rounded text-sm text-neutral-text-primary">
              User
            </code>
            ,{" "}
            <code className="bg-neutral-surface-2 px-1.5 py-0.5 rounded text-sm text-neutral-text-primary">
              Authentication
            </code>
            , and{" "}
            <code className="bg-neutral-surface-2 px-1.5 py-0.5 rounded text-sm text-neutral-text-primary">
              Project
            </code>{" "}
            — that connects every module together. See{" "}
            <Link
              href="/docs/concepts/architecture-overview"
              className="text-brand-primary hover:underline"
            >
              Architecture Overview
            </Link>{" "}
            for how the pieces fit together.
          </p>

          <Callout variant="info" title="Everything is project-scoped">
            Every module attaches to a{" "}
            <Link
              href="/docs/concepts/projects-workspaces"
              className="underline hover:text-white"
            >
              Project
            </Link>
            . That&apos;s what keeps a multi-tool platform feeling like one
            product instead of four.
          </Callout>

          <SectionHeading id="sub-applications">
            Sub-Applications (Modules)
          </SectionHeading>
          <p className="text-neutral-text-secondary mb-6 text-sm leading-7">
            DevMatrix ships as four focused modules. Each is independently
            useful, and each has its own doc page with full feature details.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 not-prose mb-6">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className={`rounded-xl border border-neutral-border bg-neutral-surface-1 p-5 hover:border-brand-primary/30 transition-colors`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-lg bg-neutral-surface-2 p-2">
                      <Icon size={18} className="text-brand-primary" />
                    </div>
                    <h3 className="text-neutral-text-primary font-semibold text-sm">
                      {mod.name}
                    </h3>
                  </div>
                  <p className="text-neutral-text-secondary/60 text-xs leading-6">
                    {mod.tagline}
                  </p>
                </Link>
              );
            })}
          </div>

          <SectionHeading id="core-system">The core system</SectionHeading>
          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            Underneath every module sits the same three primitives:
          </p>
          <ul className="space-y-2 mb-6 not-prose">
            {[
              "User — identity and authentication for everyone on a team.",
              "Project — the container every module's data hangs off.",
              "Authentication — JWT-based sessions shared by the web app and the API.",
            ].map((line) => (
              <li
                key={line}
                className="flex items-start gap-2 text-sm text-neutral-text-secondary"
              >
                <CheckCircle2
                  size={16}
                  className="shrink-0 mt-0.5 text-brand-primary"
                />
                {line}
              </li>
            ))}
          </ul>

          <SectionHeading id="final-goal">Final Goal</SectionHeading>
          <Callout variant="success" title="The vision">
            DevMatrix aims to become an all-in-one developer platform —
            combining API testing, analytics, an AI debugging assistant, and
            SaaS research tools, all integrated into a single system centered
            around projects.
          </Callout>
        </div>

        <DocsPagination current="/docs/what-is-devmatrix" />
      </main>

      <Toc
        items={[
          { id: "overview", label: "Overview" },
          { id: "sub-applications", label: "Sub-Applications" },
          { id: "core-system", label: "The core system" },
          { id: "final-goal", label: "Final Goal" },
        ]}
      />
    </>
  );
}
