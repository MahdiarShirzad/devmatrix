import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Bug,
  FileText,
  LifeBuoy,
  Mail,
  Shield,
} from "lucide-react";
import PageHero from "../_components/PageHero";

export const metadata: Metadata = {
  title: "Contact — DevMatrix",
  description:
    "Where to write for product support, security reports, privacy requests, legal questions, or general feedback about DevMatrix.",
};

const CHANNELS = [
  {
    icon: LifeBuoy,
    label: "Support",
    email: "support@devmatrix.dev",
    description:
      "Something in the dashboard is broken, a sync failed, or a feature is behaving differently than the docs describe.",
  },
  {
    icon: Shield,
    label: "Security",
    email: "security@devmatrix.dev",
    description:
      "Vulnerability reports and anything that could expose account or project data. Please report privately first.",
    href: "/security",
    hrefLabel: "Read the security policy",
  },
  {
    icon: FileText,
    label: "Privacy",
    email: "privacy@devmatrix.dev",
    description:
      "Access, correction, export, or deletion requests, and questions about how project data or AI requests are handled.",
    href: "/privacy",
    hrefLabel: "Read the privacy policy",
  },
  {
    icon: Mail,
    label: "General",
    email: "hello@devmatrix.dev",
    description:
      "Feedback, partnerships, or anything that does not fit the other inboxes. Product ideas are welcome.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="contact"
        title="Tell us what broke, or what you want next."
        description="DevMatrix is a small, independent project, so messages reach the people who write the code. Pick the inbox that fits and you will get a human reply."
        meta={
          <span className="font-mono text-[11px]">
            typical response · 1–2 business days
          </span>
        }
      />

      <div className="dm-shell py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2">
          {CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.email}
                className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-neutral-border bg-neutral-surface-2 p-2">
                      <Icon size={16} className="text-brand-primary" />
                    </div>
                    <h2 className="text-sm font-semibold text-neutral-text-primary">
                      {channel.label}
                    </h2>
                  </div>
                  <span className="dm-mono-label text-neutral-text-secondary">
                    inbox
                  </span>
                </div>

                <p className="mt-4 flex-1 text-[13px] leading-6 text-neutral-text-secondary">
                  {channel.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-border pt-4">
                  <a
                    href={`mailto:${channel.email}`}
                    className="font-mono text-[11.5px] text-brand-primary underline-offset-4 hover:underline"
                  >
                    {channel.email}
                  </a>
                  {channel.href ? (
                    <Link
                      href={channel.href}
                      className="text-[11.5px] text-neutral-text-secondary underline-offset-4 transition-colors hover:text-neutral-text-primary hover:underline"
                    >
                      {channel.hrefLabel}
                    </Link>
                  ) : null}
                </div>
              </div>
            );
          })}

          <div className="flex flex-col rounded-xl border border-neutral-border bg-neutral-surface-1 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-neutral-border bg-neutral-surface-2 p-2">
                  <Bug size={16} className="text-brand-primary" />
                </div>
                <h2 className="text-sm font-semibold text-neutral-text-primary">
                  GitHub
                </h2>
              </div>
              <span className="dm-mono-label text-neutral-text-secondary">
                public
              </span>
            </div>

            <p className="mt-4 flex-1 text-[13px] leading-6 text-neutral-text-secondary">
              Reproducible bugs, feature requests, and documentation fixes are
              easiest to track as an issue. Search first — someone may have
              already reported it.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-border pt-4">
              <a
                href="https://github.com/MahdiarShirzad/devmatrix/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-brand-primary underline-offset-4 hover:underline"
              >
                Open an issue <ArrowUpRight size={12} />
              </a>
              <a
                href="https://github.com/MahdiarShirzad/devmatrix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11.5px] text-neutral-text-secondary underline-offset-4 transition-colors hover:text-neutral-text-primary hover:underline"
              >
                Repository
              </a>
            </div>
          </div>
        </div>

        <section className="mt-14 grid gap-10 border-t border-neutral-border pt-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="dm-mono-label text-neutral-text-secondary">
              before you write
            </p>
            <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-neutral-text-primary">
              A useful bug report takes two minutes.
            </h2>
            <ul className="mt-5 space-y-2.5 text-[13.5px] leading-6 text-neutral-text-secondary">
              <li className="flex gap-3">
                <span aria-hidden className="text-brand-primary">
                  ·
                </span>
                What you expected, and what happened instead.
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="text-brand-primary">
                  ·
                </span>
                The module and project involved, plus roughly when it happened.
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="text-brand-primary">
                  ·
                </span>
                Browser and operating system, if the issue looks visual.
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="text-brand-primary">
                  ·
                </span>
                Steps to reproduce, with secrets and personal data removed.
              </li>
            </ul>
          </div>

          <div>
            <p className="dm-mono-label text-neutral-text-secondary">
              a note on these addresses
            </p>
            <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-neutral-text-primary">
              Placeholder inboxes.
            </h2>
            <p className="mt-4 text-[13.5px] leading-7 text-neutral-text-secondary">
              The addresses on this page are placeholders for the prototype and
              are not monitored yet. Before launch, replace them with real inboxes
              — or point them at the GitHub issue tracker — so that support,
              security, and privacy requests have somewhere to land.
            </p>
            <p className="mt-4 text-[13.5px] leading-7 text-neutral-text-secondary">
              For anything security-related today, use the process on the{" "}
              <Link
                href="/security"
                className="text-brand-primary underline underline-offset-4"
              >
                security page
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
