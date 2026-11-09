import type { ReactNode } from "react";

/**
 * Editorial page opener for the marketing/legal surface. Mirrors the landing
 * page's type scale and hairline texture so the pages feel like one site.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-neutral-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808014_1px,transparent_1px),linear-gradient(to_bottom,#80808014_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_75%)]"
      />
      <div className="dm-shell relative py-16 md:py-20">
        <p className="dm-mono-label text-brand-primary">{eyebrow}</p>

        <h1 className="mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-neutral-text-primary">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-text-secondary">
          {description}
        </p>

        {meta ? (
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-border pt-5 font-mono text-[11px] text-neutral-text-secondary">
            {meta}
          </div>
        ) : null}
      </div>
    </section>
  );
}
