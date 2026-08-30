// RestEndpointsPage.tsx
import Breadcrumb from "../../_components/Breadcrumb";
import PageHeader from "../../_components/PageHeader";
import SectionHeading from "../../_components/SectionHeading";
import Toc from "../../_components/Toc";
import DocsPagination from "../../_components/DocsPagination";

const endpointGroups = [
  {
    id: "projects",
    title: "Projects",
    rows: [
      ["GET", "/api/projects", "List projects for the current user"],
      ["POST", "/api/projects", "Create a project"],
      ["GET", "/api/projects/:id", "Get a single project"],
      ["PATCH", "/api/projects/:id", "Update a project"],
      ["DELETE", "/api/projects/:id", "Delete a project"],
    ],
  },
  {
    id: "api-playground",
    title: "API Playground",
    rows: [
      ["GET", "/api/projects/:id/requests", "List saved requests"],
      ["POST", "/api/projects/:id/requests", "Save a request"],
      [
        "POST",
        "/api/projects/:id/requests/:reqId/send",
        "Send a saved request",
      ],
      ["GET", "/api/projects/:id/collections", "List collections"],
    ],
  },
  {
    id: "ai-debugging",
    title: "AI Debugging Assistant",
    rows: [
      [
        "POST",
        "/api/projects/:id/debug/analyze",
        "Analyze an error or stack trace",
      ],
      ["GET", "/api/projects/:id/debug/history", "List past analyses"],
    ],
  },
  {
    id: "analytics",
    title: "Developer Analytics",
    rows: [
      [
        "POST",
        "/api/projects/:id/analytics/connect-github",
        "Connect a GitHub repository",
      ],
      [
        "POST",
        "/api/projects/:id/analytics/connect-jira",
        "Connect a Jira project",
      ],
      ["GET", "/api/projects/:id/analytics/dashboard", "Get dashboard metrics"],
      [
        "GET",
        "/api/projects/:id/analytics/report",
        "Generate a project report",
      ],
    ],
  },
  {
    id: "idea-validator",
    title: "SaaS Idea Validator",
    rows: [
      [
        "POST",
        "/api/projects/:id/ideas/analyze",
        "Submit an idea for analysis",
      ],
      ["GET", "/api/projects/:id/ideas/:reportId", "Get a validation report"],
    ],
  },
];

const methodColor: Record<string, string> = {
  GET: "text-sky-400 bg-sky-500/10",
  POST: "text-emerald-400 bg-emerald-500/10",
  PATCH: "text-brand-primary bg-brand-primary/10",
  DELETE: "text-rose-400 bg-rose-500/10",
};

export default function RestEndpointsPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            {
              name: "API Reference",
              href: "/docs/api-reference/authentication",
            },
          ]}
          current="REST Endpoints"
        />

        <PageHeader
          title="REST Endpoints"
          description="Every endpoint DevMatrix exposes, grouped by the module it belongs to. All routes require an Authorization: Bearer <token> header."
        />

        <div className="max-w-none">
          {endpointGroups.map((group) => (
            <div key={group.id}>
              <SectionHeading id={group.id}>{group.title}</SectionHeading>
              <div className="not-prose overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 mb-6">
                <table className="w-full text-sm">
                  <tbody>
                    {group.rows.map(([method, path, desc], idx) => (
                      <tr
                        key={`${method}-${path}`}
                        className={
                          idx !== 0 ? "border-t border-neutral-border" : ""
                        }
                      >
                        <td className="px-4 py-3 w-24">
                          <span
                            className={`inline-block rounded px-2 py-0.5 text-xs font-mono font-semibold ${methodColor[method]}`}
                          >
                            {method}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-neutral-text-primary whitespace-nowrap">
                          {path}
                        </td>
                        <td className="px-4 py-3 text-xs text-neutral-text-secondary">
                          {desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <DocsPagination current="/docs/api-reference/rest-endpoints" />
      </main>

      <Toc items={endpointGroups.map((g) => ({ id: g.id, label: g.title }))} />
    </>
  );
}
