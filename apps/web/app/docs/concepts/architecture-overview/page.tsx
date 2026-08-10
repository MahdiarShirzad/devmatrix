// ArchitectureOverviewPage.tsx
import { Server, Database } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import PageHeader from "../../_components/PageHeader";
import SectionHeading from "../../_components/SectionHeading";
import Callout from "../../_components/Callout";
import CodeBlock from "../../_components/CodeBlock";
import Toc from "../../_components/Toc";
import DocsPagination from "../../_components/DocsPagination";

export default function ArchitectureOverviewPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            {
              name: "Core Concepts",
              href: "/docs/concepts/projects-workspaces",
            },
          ]}
          current="Architecture Overview"
        />

        <PageHeader
          title="Architecture Overview"
          description="DevMatrix is built as a monorepo, keeping the frontend, backend, and shared packages versioned together."
        />

        <div className="max-w-none">
          <SectionHeading id="monorepo-structure">
            Monorepo structure
          </SectionHeading>
          <CodeBlock
            label="monorepo structure"
            code={`DevMatrix/
├─ apps/
│  ├─ web        # Next.js frontend
│  └─ api        # backend API
└─ packages/
   ├─ ui
   ├─ config
   └─ shared`}
          />

          <div className="grid sm:grid-cols-2 gap-4 not-prose mb-6">
            <div className="rounded-xl border border-white/10 bg-[#0D1117] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Server size={16} className="text-[#fca311]" />
                <h4 className="text-white font-semibold text-sm">Frontend</h4>
              </div>
              <ul className="space-y-2">
                {["Next.js", "TypeScript", "TailwindCSS"].map((t) => (
                  <li
                    key={t}
                    className="text-xs text-[#e5e5e5]/80 flex items-center gap-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#fca311]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0D1117] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Database size={16} className="text-sky-400" />
                <h4 className="text-white font-semibold text-sm">Backend</h4>
              </div>
              <ul className="space-y-2">
                {[
                  "Express or NestJS",
                  "TypeScript",
                  "MongoDB or PostgreSQL",
                  "JWT Authentication",
                ].map((t) => (
                  <li
                    key={t}
                    className="text-xs text-[#e5e5e5]/80 flex items-center gap-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-sky-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <SectionHeading id="how-modules-connect">
            How modules connect
          </SectionHeading>
          <p className="text-[#e5e5e5]/80 mb-4 text-sm leading-7">
            The backend exposes one core API for auth and projects, and each
            module (Playground, Debugging, Analytics, Idea Validator) is its own
            set of routes and tables that all foreign-key back to{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-[#e5e5e5]">
              projectId
            </code>
            . The frontend renders each module as a route inside the dashboard
            shell, reading the active project from the same authenticated
            client.
          </p>

          <Callout variant="tip" title="Why a monorepo">
            Shipping the frontend, backend, and shared types from one repo keeps
            the API contract and the UI in sync as new modules are added — a
            change to a shared type surfaces immediately in both apps.
          </Callout>

          <SectionHeading id="build-order">
            Why modules ship in this order
          </SectionHeading>
          <p className="text-[#e5e5e5]/80 mb-4 text-sm leading-7">
            Core auth and the Project entity come first since every module
            depends on them. API Playground ships next because it needs no AI
            and no external integrations, making it the reference pattern for
            the modules that follow. See{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-[#e5e5e5]">
              What is DevMatrix?
            </code>{" "}
            for the full roadmap.
          </p>
        </div>

        <DocsPagination current="/docs/concepts/architecture-overview" />
      </main>

      <Toc
        items={[
          { id: "monorepo-structure", label: "Monorepo structure" },
          { id: "how-modules-connect", label: "How modules connect" },
          { id: "build-order", label: "Why this build order" },
        ]}
      />
    </>
  );
}
