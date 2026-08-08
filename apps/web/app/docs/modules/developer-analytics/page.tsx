import { BarChart3, CheckCircle2 } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import PageHeader from "../../_components/PageHeader";
import SectionHeading from "../../_components/SectionHeading";
import Callout from "../../_components/Callout";
import Toc from "../../_components/Toc";
import DocsPagination from "../../_components/DocsPagination";

const features = [
  "GitHub integration",
  "Jira integration",
  "Commit analysis",
  "Development velocity tracking",
  "Visual dashboards (commit frequency, team activity, code changes, productivity metrics)",
  "Project reports",
];

export default function DeveloperAnalyticsPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            { name: "Modules", href: "/docs/modules/api-playground" },
          ]}
          current="Developer Analytics"
        />

        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <BarChart3 size={20} className="text-emerald-400" />
          </div>
        </div>
        <PageHeader
          title="Developer Analytics Platform"
          description="A system for analyzing developer activity and project performance, sourced from GitHub and Jira."
        />

        <div className="prose prose-invert prose-slate max-w-none">
          <SectionHeading id="features">Features</SectionHeading>
          <ul className="space-y-2 mb-6 not-prose">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-400" />
                {f}
              </li>
            ))}
          </ul>

          <SectionHeading id="connecting-integrations">Connecting integrations</SectionHeading>
          <p className="text-slate-300 mb-4 text-sm leading-7">
            Analytics needs a data source before it can show anything.
            Connect a GitHub repository and, optionally, a Jira project from
            the module's settings — DevMatrix then pulls commit and issue
            history on a schedule and builds the dashboards from it.
          </p>

          <Callout variant="warning" title="This module needs the most setup">
            Unlike API Playground, Developer Analytics depends on external
            OAuth connections and background data processing — expect an
            initial sync delay after connecting a new repository.
          </Callout>

          <SectionHeading id="goal">Goal</SectionHeading>
          <p className="text-slate-300 mb-4 text-sm leading-7">
            Provide insights into development workflows and team
            performance.
          </p>
        </div>

        <DocsPagination current="/docs/modules/developer-analytics" />
      </main>

      <Toc
        items={[
          { id: "features", label: "Features" },
          { id: "connecting-integrations", label: "Connecting integrations" },
          { id: "goal", label: "Goal" },
        ]}
      />
    </>
  );
}
