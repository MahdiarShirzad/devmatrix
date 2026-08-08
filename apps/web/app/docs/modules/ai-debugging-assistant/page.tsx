import { Bug, CheckCircle2 } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import PageHeader from "../../_components/PageHeader";
import SectionHeading from "../../_components/SectionHeading";
import Callout from "../../_components/Callout";
import CodeBlock from "../../_components/CodeBlock";
import Toc from "../../_components/Toc";
import DocsPagination from "../../_components/DocsPagination";

const features = [
  "Submit error messages or stack traces",
  "AI-powered error analysis",
  "Suggest possible causes",
  "Provide solutions",
  "Explain issues in code",
  "Recommend refactoring",
];

export default function AiDebuggingAssistantPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[
            { name: "Docs", href: "/docs/introduction" },
            { name: "Modules", href: "/docs/modules/api-playground" },
          ]}
          current="AI Debugging Assistant"
        />

        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Bug size={20} className="text-blue-400" />
          </div>
        </div>
        <PageHeader
          title="AI Debugging Assistant"
          description="An intelligent assistant that helps developers debug code and errors, right where the error happened."
        />

        <div className="prose prose-invert prose-slate max-w-none">
          <SectionHeading id="features">Features</SectionHeading>
          <ul className="space-y-2 mb-6 not-prose">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-blue-400" />
                {f}
              </li>
            ))}
          </ul>

          <SectionHeading id="how-it-works">How it works</SectionHeading>
          <p className="text-slate-300 mb-4 text-sm leading-7">
            Submit an error message or stack trace, and the assistant
            analyzes it against your project's context to suggest likely
            causes, a concrete fix, and — where relevant — a refactor.
          </p>
          <CodeBlock
            label="submit-error.ts"
            code={`const result = await matrix.debugging.analyze({
  projectId: project.id,
  stackTrace: error.stack,
  language: 'typescript',
});

console.log(result.likelyCause);
console.log(result.suggestedFix);`}
          />

          <Callout variant="info" title="Where this fits in the roadmap">
            This is the platform's first AI-powered module — it's what
            establishes the LLM integration and prompt-handling pattern that
            Developer Analytics and the Idea Validator later build on.
          </Callout>

          <SectionHeading id="goal">Goal</SectionHeading>
          <p className="text-slate-300 mb-4 text-sm leading-7">
            Reduce debugging time and improve problem-solving efficiency.
          </p>
        </div>

        <DocsPagination current="/docs/modules/ai-debugging-assistant" />
      </main>

      <Toc
        items={[
          { id: "features", label: "Features" },
          { id: "how-it-works", label: "How it works" },
          { id: "goal", label: "Goal" },
        ]}
      />
    </>
  );
}
