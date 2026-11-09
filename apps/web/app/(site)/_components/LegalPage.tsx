import type { ReactNode } from "react";
import { FileText } from "lucide-react";
import PageHero from "./PageHero";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

/**
 * Shared layout for policy documents: hero, sticky table of contents, and a
 * single measured reading column. Section bodies are plain JSX and styled
 * through the prose wrapper below.
 */
export default function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        meta={<span>Last updated · {updated}</span>}
      />

      <div className="dm-shell py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-label="On this page"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <p className="dm-mono-label text-neutral-text-secondary">
              on this page
            </p>
            <ul className="mt-4 space-y-1.5 border-l border-neutral-border">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l border-transparent py-1 pl-4 text-[12.5px] leading-5 text-neutral-text-secondary transition-colors hover:border-brand-primary hover:text-neutral-text-primary"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="min-w-0 max-w-2xl">
            <div className="flex gap-3 rounded-xl border border-neutral-border bg-neutral-surface-1 p-4">
              <FileText
                size={16}
                aria-hidden
                className="mt-0.5 shrink-0 text-brand-primary"
              />
              <p className="text-[12.5px] leading-5 text-neutral-text-secondary">
                <strong className="font-semibold text-neutral-text-primary">
                  Placeholder document.
                </strong>{" "}
                This copy is mock content for the DevMatrix prototype. Have it
                reviewed by counsel and replace the contact details before
                launch.
              </p>
            </div>

            <div className="mt-2 text-[14.5px] leading-7 text-neutral-text-secondary [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-neutral-text-primary [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <h2 className="mt-12 mb-3 text-lg font-semibold tracking-[-0.01em] text-neutral-text-primary">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">{section.body}</div>
                </section>
              ))}
            </div>

            <div className="mt-14 border-t border-neutral-border pt-6 text-[12px] leading-6 text-neutral-text-secondary">
              Questions about this document? Write to{" "}
              <a
                href="mailto:legal@devmatrix.dev"
                className="text-brand-primary underline underline-offset-4"
              >
                legal@devmatrix.dev
              </a>
              .
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
