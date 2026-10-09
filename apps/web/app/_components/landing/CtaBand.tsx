import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Closing conversion band. Direct, no fabricated urgency or metrics —
 * it points at the two destinations that already exist: register and docs.
 */
export default function CtaBand() {
  return (
    <section className="border-b border-neutral-border">
      <div className="dm-shell py-20 md:py-28">
        <Reveal className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="dm-mono-label text-brand-primary">get started</p>
            <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-text-primary">
              Start with one project.
              <br />
              Let the context accumulate.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-neutral-text-secondary">
              Create an account, name a project, and open whichever workflow
              you need first. The others will be waiting under the same roof.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-button-text transition-colors hover:bg-brand-primary/90 active:scale-[0.98] sm:w-auto"
            >
              Create your account
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/docs/quick-start"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-border px-6 py-3 text-sm font-medium text-neutral-text-primary transition-colors hover:border-neutral-text-secondary/50 hover:bg-neutral-surface-1 active:scale-[0.98] sm:w-auto"
            >
              Quick start guide
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
