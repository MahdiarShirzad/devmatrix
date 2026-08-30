import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function DocsNotFound() {
  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text-secondary font-sans flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-neutral-border bg-neutral-surface-1">
          <FileQuestion size={24} className="text-brand-accent" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-text-primary mb-2">
          Page not found
        </h1>
        <p className="text-sm text-neutral-text-secondary mb-6 leading-6">
          This doc doesn&apos;t exist yet. It may have moved, or the link is out
          of date.
        </p>
        <Link
          href="/docs/introduction"
          className="inline-flex items-center gap-2 text-sm text-brand-primary hover:text-brand-primary/80 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to the docs
        </Link>
      </div>
    </div>
  );
}
