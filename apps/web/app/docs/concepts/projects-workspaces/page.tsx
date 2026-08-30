// ProjectsWorkspacesPage.tsx
import Breadcrumb from "../../_components/Breadcrumb";
import PageHeader from "../../_components/PageHeader";
import SectionHeading from "../../_components/SectionHeading";
import Callout from "../../_components/Callout";
import CodeBlock from "../../_components/CodeBlock";
import Toc from "../../_components/Toc";
import DocsPagination from "../../_components/DocsPagination";

export default function ProjectsWorkspacesPage() {
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
          current="Projects & Workspaces"
        />

        <PageHeader
          title="Projects & Workspaces"
          description="A Project is the container every module's data lives under. This page covers the Project entity and how workspaces group projects for a team."
        />

        <div className="max-w-none">
          <SectionHeading id="the-project-entity">
            The Project entity
          </SectionHeading>
          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            Every request you make in the API Playground, every error you submit
            to the AI Debugging Assistant, every commit tracked by Developer
            Analytics, and every report from the SaaS Idea Validator is stored
            against a single{" "}
            <code className="bg-neutral-surface-2 px-1.5 py-0.5 rounded text-sm text-neutral-text-primary">
              Project
            </code>{" "}
            record.
          </p>
          <CodeBlock
            label="project.schema.ts"
            code={`interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: 'web' | 'api' | 'mobile' | 'other';
  createdAt: Date;
}`}
          />

          <SectionHeading id="workspaces">Workspaces</SectionHeading>
          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            A workspace is simply the set of projects a{" "}
            <code className="bg-neutral-surface-2 px-1.5 py-0.5 rounded text-sm text-neutral-text-primary">
              User
            </code>{" "}
            has access to. There&apos;s no separate workspace table today —
            access is resolved from ownership on the Project itself, which keeps
            the model simple while the platform is early.
          </p>

          <Callout variant="info" title="One project, every module">
            You don&apos;t create a separate &quot;API Playground project&quot;
            and &quot;Analytics project&quot; — you create one project, then use
            whichever modules you need inside it.
          </Callout>

          <SectionHeading id="switching-projects">
            Switching projects
          </SectionHeading>
          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            The project switcher in the dashboard sidebar lets you move between
            projects without losing your place — each module reads the active
            project ID from the same client instance you configured in Quick
            Start.
          </p>
        </div>

        <DocsPagination current="/docs/concepts/projects-workspaces" />
      </main>

      <Toc
        items={[
          { id: "the-project-entity", label: "The Project entity" },
          { id: "workspaces", label: "Workspaces" },
          { id: "switching-projects", label: "Switching projects" },
        ]}
      />
    </>
  );
}
