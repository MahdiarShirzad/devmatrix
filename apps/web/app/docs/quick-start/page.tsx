// QuickStartPage.tsx
import Breadcrumb from "../_components/Breadcrumb";
import PageHeader from "../_components/PageHeader";
import SectionHeading from "../_components/SectionHeading";
import Callout from "../_components/Callout";
import CodeBlock from "../_components/CodeBlock";
import Toc from "../_components/Toc";
import DocsPagination from "../_components/DocsPagination";

export default function QuickStartPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            { name: "Getting Started", href: "/docs/introduction" },
          ]}
          current="Quick Start"
        />

        <PageHeader
          title="Quick Start"
          description="Set up DevMatrix in your project in less than 5 minutes: install the client, configure it, and create your first project."
        />

        <div className="max-w-none">
          <Callout variant="info" title="Prerequisites">
            Make sure you have Node.js 18.17 or later installed. We recommend
            using{" "}
            <code className="bg-sky-500/20 px-1.5 py-0.5 rounded text-sky-300 font-mono text-xs">
              npm
            </code>{" "}
            or{" "}
            <code className="bg-sky-500/20 px-1.5 py-0.5 rounded text-sky-300 font-mono text-xs">
              pnpm
            </code>
            .
          </Callout>

          <SectionHeading id="installation">1. Installation</SectionHeading>
          <p className="text-[#e5e5e5]/80 mb-4 text-sm leading-7">
            Install the core DevMatrix client into your Next.js or Node.js
            environment.
          </p>
          <CodeBlock label="terminal" code={"npm install @devmatrix/core"} />

          <SectionHeading id="setup-workspace">
            2. Setup your workspace
          </SectionHeading>
          <p className="text-[#e5e5e5]/80 mb-4 text-sm leading-7">
            Initialize the DevMatrix client. If you&apos;re using TypeScript,
            the types are included out of the box. Create a new file called{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-[#e5e5e5]">
              matrix.config.ts
            </code>{" "}
            in your root directory.
          </p>
          <CodeBlock
            label="matrix.config.ts"
            code={`import { MatrixClient } from '@devmatrix/core';

// Initialize the client with your secret key
export const matrix = new MatrixClient({
  apiKey: process.env.DEVMATRIX_API_KEY,
  environment: 'development',
  options: {
    enableAnalytics: true,
    syncWorkflows: true
  }
});`}
          />

          <SectionHeading id="create-project">
            3. Create your first project
          </SectionHeading>
          <p className="text-[#e5e5e5]/80 mb-4 text-sm leading-7">
            Every module — API Playground, AI Debugging, Analytics, and the Idea
            Validator — needs a project to attach to. Create one from the
            client:
          </p>
          <CodeBlock
            label="create-project.ts"
            code={`const project = await matrix.projects.create({
  name: 'My First Project',
  description: 'Testing DevMatrix locally',
  type: 'web',
});

console.log(project.id); // use this in the dashboard`}
          />

          <Callout variant="tip" title="Pro Tip">
            You can seamlessly integrate DevMatrix with your Next.js App Router
            API routes to handle authentication and webhooks directly from the
            server side.
          </Callout>

          <SectionHeading id="next-steps">Next Steps</SectionHeading>
          <p className="text-[#e5e5e5]/80 mb-4 text-sm leading-7">
            With a project created, head into any module to start using it —
            send your first request in the API Playground, or connect a
            repository to Developer Analytics.
          </p>
        </div>

        <DocsPagination current="/docs/quick-start" />
      </main>

      <Toc
        items={[
          { id: "installation", label: "1. Installation" },
          { id: "setup-workspace", label: "2. Setup your workspace" },
          { id: "create-project", label: "3. Create your first project" },
          { id: "next-steps", label: "Next Steps" },
        ]}
      />
    </>
  );
}
