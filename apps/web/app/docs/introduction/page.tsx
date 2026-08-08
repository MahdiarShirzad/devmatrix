import Link from "next/link";
import { Zap, Bug, BarChart3, Rocket, ArrowRight } from "lucide-react";
import Breadcrumb from "../_components/Breadcrumb";
import PageHeader from "../_components/PageHeader";
import SectionHeading from "../_components/SectionHeading";
import Callout from "../_components/Callout";
import Toc from "../_components/Toc";
import DocsPagination from "../_components/DocsPagination";

const explore = [
  {
    icon: Zap,
    title: "API Playground",
    href: "/docs/modules/api-playground",
    description: "Test HTTP requests without leaving your project.",
  },
  {
    icon: Bug,
    title: "AI Debugging Assistant",
    href: "/docs/modules/ai-debugging-assistant",
    description: "Paste a stack trace, get a root cause and a fix.",
  },
  {
    icon: BarChart3,
    title: "Developer Analytics",
    href: "/docs/modules/developer-analytics",
    description: "Commit velocity and team activity, visualized.",
  },
  {
    icon: Rocket,
    title: "SaaS Idea Validator",
    href: "/docs/modules/saas-idea-validator",
    description: "Market and competitor analysis before you build.",
  },
];

export default function IntroductionPage() {
  return (
    <>
      <main className="flex-1 py-10 min-w-0">
        <Breadcrumb
          items={[{ name: "Docs", href: "/docs/introduction" }]}
          current="Introduction"
        />

        <PageHeader
          title="Introduction"
          description="DevMatrix brings API testing, AI debugging, developer analytics, and SaaS idea validation into one workspace. These docs walk through what it is, how it's put together, and how to get your first project running."
        />

        <div className="prose prose-invert prose-slate max-w-none">
          <SectionHeading id="welcome">Welcome</SectionHeading>
          <p className="text-slate-300 mb-4 text-sm leading-7">
            Most teams end up with a different tool for every job — one app
            for hitting an API, another for reading a stack trace, a
            dashboard for commit activity, and a spreadsheet for evaluating
            the next idea. DevMatrix centralizes all of that around a single{" "}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-slate-200">
              Project
            </code>
            , so context never gets lost moving between them.
          </p>
          <p className="text-slate-300 mb-4 text-sm leading-7">
            If you're new here, start with{" "}
            <Link href="/docs/what-is-devmatrix" className="text-purple-400 hover:text-purple-300">
              What is DevMatrix?
            </Link>{" "}
            for the full picture, or jump straight to{" "}
            <Link href="/docs/quick-start" className="text-purple-400 hover:text-purple-300">
              Quick Start
            </Link>{" "}
            if you'd rather install first and read later.
          </p>

          <Callout variant="tip" title="Everything is project-scoped">
            Every module you use in DevMatrix attaches to a Project. Create
            one project per app or team, and every request, error, metric,
            and idea report lives under it.
          </Callout>

          <SectionHeading id="explore">What you&apos;ll find in these docs</SectionHeading>
          <p className="text-slate-300 mb-6 text-sm leading-7">
            The sidebar is organized the same way DevMatrix itself is: core
            concepts first, then each module in depth, then the raw API
            reference.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 not-prose">
            {explore.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border border-white/10 bg-[#131221] p-5 hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="rounded-lg bg-white/5 p-2">
                      <Icon size={18} className="text-purple-400" />
                    </div>
                    <h3 className="text-white font-semibold text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-6 mb-3">
                    {item.description}
                  </p>
                  <span className="text-xs text-purple-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <DocsPagination current="/docs/introduction" />
      </main>

      <Toc
        items={[
          { id: "welcome", label: "Welcome" },
          { id: "explore", label: "What you'll find here" },
        ]}
      />
    </>
  );
}
