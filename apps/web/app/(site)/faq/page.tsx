import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import PageHero from "../_components/PageHero";

export const metadata: Metadata = {
  title: "FAQ — DevMatrix",
  description:
    "Answers to common questions about DevMatrix accounts, pricing, GitHub integration, AI features, data retention, and self-hosting.",
};

const FAQS = [
  {
    question: "What is DevMatrix?",
    answer: (
      <>
        <p>
          A developer workspace organized around projects. Each project can hold
          API requests, AI debug sessions, GitHub analytics, and idea-validation
          reports, so related work stays together instead of being split across
          separate tools.
        </p>
      </>
    ),
  },
  {
    question: "Is DevMatrix free?",
    answer: (
      <p>
        Yes — it is free while in beta. If paid plans are introduced, the price and
        billing terms will be shown before anything is charged, and you will be
        able to cancel beforehand.
      </p>
    ),
  },
  {
    question: "Do I need a GitHub account?",
    answer: (
      <p>
        No. You can register with an email address and password. A GitHub
        connection is only needed for Developer Analytics, which reads commit
        history from the repositories you choose to connect.
      </p>
    ),
  },
  {
    question: "How do the AI features work?",
    answer: (
      <p>
        When you run a debug session or validate an idea, the text you submit is
        sent to a third-party model provider, and the structured response is saved
        with the session. The AI Debugging Assistant returns a cause, an impact
        assessment, and a proposed fix; the Idea Validator returns a market and
        competitor breakdown with a SWOT summary.
      </p>
    ),
  },
  {
    question: "Will my code be used to train AI models?",
    answer: (
      <p>
        We do not use your project content to train our own models. For provider
        models, we configure the account so submitted content is not used for
        training where that option exists. See the{" "}
        <Link href="/privacy">Privacy Policy</Link> for details on AI processing.
      </p>
    ),
  },
  {
    question: "Can I use DevMatrix with a team?",
    answer: (
      <p>
        Not yet. Accounts are personal today, and each project belongs to the
        account that created it. Shared workspaces, roles, and invitations are a
        planned direction rather than a shipped feature, so the docs will not
        pretend otherwise.
      </p>
    ),
  },
  {
    question: "What happens when I delete a project?",
    answer: (
      <p>
        The project and the records attached to it — requests, collections, debug
        sessions, synced analytics, and idea reports — are removed from active
        systems. Copies in backups expire within 90 days. Deletion cannot be
        undone, so export anything you need first.
      </p>
    ),
  },
  {
    question: "Which languages does the AI debugger support?",
    answer: (
      <p>
        It accepts stack traces and snippets from most popular languages,
        including JavaScript and TypeScript, Python, Java, Go, Rust, C#, PHP, and
        Ruby. Quality depends on how much context the trace contains; a minimal
        reproduction with the actual error message works far better than a
        screenshot of a log.
      </p>
    ),
  },
  {
    question: "Can I self-host DevMatrix?",
    answer: (
      <p>
        The repository is public, so the code can be run locally for development.
        A documented, supported self-hosting path does not exist yet — there is no
        published deployment guide, migration story, or support commitment for
        self-hosted installs.
      </p>
    ),
  },
  {
    question: "How do I report a bug or request a feature?",
    answer: (
      <p>
        Open an issue on the{" "}
        <a
          href="https://github.com/MahdiarShirzad/devmatrix/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repository
        </a>{" "}
        or use the inboxes on the <Link href="/contact">contact page</Link>. For
        security issues, please follow the{" "}
        <Link href="/security">responsible disclosure process</Link> instead of
        filing publicly.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="faq"
        title="Questions, answered without the marketing."
        description="Accounts, pricing, GitHub, AI processing, data retention, and what DevMatrix does not do yet. If something is missing, the contact page is one click away."
        meta={
          <span className="font-mono text-[11px]">
            10 questions · last reviewed November 9, 2026
          </span>
        }
      />

      <div className="dm-shell py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="dm-mono-label text-neutral-text-secondary">help</p>
            <ul className="mt-4 space-y-2.5 text-[12.5px]">
              <li>
                <Link
                  href="/docs/quick-start"
                  className="text-neutral-text-secondary transition-colors hover:text-brand-primary"
                >
                  Quick start guide
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/introduction"
                  className="text-neutral-text-secondary transition-colors hover:text-brand-primary"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-text-secondary transition-colors hover:text-brand-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-neutral-text-secondary transition-colors hover:text-brand-primary"
                >
                  Security
                </Link>
              </li>
            </ul>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <div className="border-t border-neutral-border">
              {FAQS.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group border-b border-neutral-border py-5"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <span className="flex gap-4">
                      <span className="mt-0.5 font-mono text-[11px] text-neutral-text-secondary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] font-medium leading-6 text-neutral-text-primary">
                        {faq.question}
                      </span>
                    </span>
                    <ChevronDown
                      size={16}
                      aria-hidden
                      className="mt-1 shrink-0 text-neutral-text-secondary transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="mt-3 space-y-3 pl-[2.1rem] text-[13.5px] leading-7 text-neutral-text-secondary [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-14 flex flex-col gap-5 rounded-xl border border-neutral-border bg-neutral-surface-1 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13.5px] leading-6 text-neutral-text-secondary">
                Still stuck? Send the module, the project, and what you expected
                to happen.
              </p>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-brand-primary px-5 py-2.5 text-sm font-semibold text-button-text transition-colors hover:bg-brand-primary/90 active:scale-[0.98]"
              >
                Contact us
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
