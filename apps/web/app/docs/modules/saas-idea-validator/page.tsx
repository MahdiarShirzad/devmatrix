// SaasIdeaValidatorPage.tsx
import { Rocket, CheckCircle2 } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import PageHeader from "../../_components/PageHeader";
import SectionHeading from "../../_components/SectionHeading";
import Callout from "../../_components/Callout";
import CodeBlock from "../../_components/CodeBlock";
import Toc from "../../_components/Toc";
import DocsPagination from "../../_components/DocsPagination";

const features = [
  "Input product ideas",
  "Market analysis",
  "Competitor analysis",
  "Feature suggestions",
  "Revenue model insights",
  "SWOT analysis",
  "Business validation report",
];

export default function SaasIdeaValidatorPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            { name: "Modules", href: "/docs/modules/api-playground" },
          ]}
          current="SaaS Idea Validator"
        />

        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-brand-primary/10 p-2">
            <Rocket size={20} className="text-brand-primary" />
          </div>
        </div>
        <PageHeader
          title="SaaS Idea Validator"
          description="An AI-powered tool for validating SaaS ideas before you spend time building them."
        />

        <div className="max-w-none">
          <SectionHeading id="features">Features</SectionHeading>
          <ul className="space-y-2 mb-6 not-prose">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-neutral-text-secondary"
              >
                <CheckCircle2
                  size={16}
                  className="shrink-0 mt-0.5 text-brand-primary"
                />
                {f}
              </li>
            ))}
          </ul>

          <SectionHeading id="requesting-a-report">
            Requesting a report
          </SectionHeading>
          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            Describe the idea in plain language, and the validator returns a
            structured report covering market size, competitors, suggested
            features, a revenue model, and a SWOT breakdown.
          </p>
          <CodeBlock
            label="validate-idea.ts"
            code={`const report = await matrix.ideaValidator.analyze({
  projectId: project.id,
  idea: 'A Slack bot that auto-triages GitHub issues by severity',
});

console.log(report.marketAnalysis);
console.log(report.swot);`}
          />

          <Callout variant="tip" title="Most complex module in the platform">
            The Idea Validator combines AI processing, external market-data
            APIs, and competitor research — it&apos;s built last in the roadmap,
            after the AI and analytics patterns are already established.
          </Callout>

          <SectionHeading id="goal">Goal</SectionHeading>
          <p className="text-neutral-text-secondary mb-4 text-sm leading-7">
            Help developers and founders evaluate ideas before building
            products.
          </p>
        </div>

        <DocsPagination current="/docs/modules/saas-idea-validator" />
      </main>

      <Toc
        items={[
          { id: "features", label: "Features" },
          { id: "requesting-a-report", label: "Requesting a report" },
          { id: "goal", label: "Goal" },
        ]}
      />
    </>
  );
}
