import { Zap, CheckCircle2 } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import PageHeader from "../../_components/PageHeader";
import SectionHeading from "../../_components/SectionHeading";
import Callout from "../../_components/Callout";
import CodeBlock from "../../_components/CodeBlock";
import Toc from "../../_components/Toc";
import DocsPagination from "../../_components/DocsPagination";

const features = [
  "Send HTTP requests (GET, POST, PUT, DELETE)",
  "Manage headers and request body",
  "Save and organize requests",
  "View responses",
  "Create collections",
  "Link requests to projects",
];

export default function ApiPlaygroundPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            { name: "Modules", href: "/docs/modules/api-playground" },
          ]}
          current="API Playground"
        />

        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-purple-500/10 p-2">
            <Zap size={20} className="text-purple-400" />
          </div>
        </div>
        <PageHeader
          title="API Playground"
          description="A lightweight API testing environment, similar to Postman, built directly into your project — no external tool required."
        />

        <div className="prose prose-invert prose-slate max-w-none">
          <SectionHeading id="features">Features</SectionHeading>
          <ul className="space-y-2 mb-6 not-prose">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-purple-400" />
                {f}
              </li>
            ))}
          </ul>

          <SectionHeading id="collections">Collections</SectionHeading>
          <p className="text-slate-300 mb-4 text-sm leading-7">
            Requests are grouped into collections so a whole API surface —
            auth, projects, a third-party integration — can be saved,
            re-run, and shared with the rest of the team on the project.
          </p>
          <CodeBlock
            label="collection example"
            code={`{
  "collection": "Auth endpoints",
  "requests": [
    { "method": "POST", "path": "/api/auth/login" },
    { "method": "POST", "path": "/api/auth/register" }
  ]
}`}
          />

          <Callout variant="tip" title="Built first, on purpose">
            API Playground needs no AI and no external integrations, which
            is exactly why it ships first in the roadmap — it defines the
            module pattern every later module follows.
          </Callout>

          <SectionHeading id="goal">Goal</SectionHeading>
          <p className="text-slate-300 mb-4 text-sm leading-7">
            Provide a simple, built-in API testing tool without external
            dependencies.
          </p>
        </div>

        <DocsPagination current="/docs/modules/api-playground" />
      </main>

      <Toc
        items={[
          { id: "features", label: "Features" },
          { id: "collections", label: "Collections" },
          { id: "goal", label: "Goal" },
        ]}
      />
    </>
  );
}
