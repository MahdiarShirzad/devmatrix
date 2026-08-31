import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-text-primary mb-6">
          Ready to scale your workflow?
        </h2>
        <p className="text-neutral-text-secondary mb-10 text-lg max-w-xl mx-auto">
          Start building your next project with DevMatrix today. Join the
          ecosystem designed for builders.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 rounded-xl bg-brand-primary font-bold shadow-lg shadow-brand-primary/20 transition-all hover:shadow-brand-primary/40 hover:bg-brand-primary/90 hover:scale-105 active:scale-95"
            style={{ color: "var(--theme-button-text)" }}
          >
            Create Account
          </Link>
          <Link
            href="/docs/introduction"
            className="px-8 py-4 rounded-xl bg-neutral-surface-1/30 border border-neutral-border text-neutral-text-primary font-semibold transition-all hover:bg-neutral-surface-1/50 hover:border-neutral-text-secondary/30 active:scale-95"
          >
            View Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
