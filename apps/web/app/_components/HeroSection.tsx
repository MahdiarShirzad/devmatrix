import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CodeEditorMockup from "./CodeEditorMockup";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-accent/80 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-surface-1/30 border border-neutral-border text-sm font-medium text-neutral-text-secondary mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
          DevMatrix v1.0 is live
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-text-primary mb-6">
          Build. Manage. Scale. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
            All in One Place.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-text-secondary mb-10 leading-relaxed">
          DevMatrix is your all-in-one platform for managing projects, code,
          teams, and workflows — designed specifically for modern developers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="flex items-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-primary text-[var(--color-button-text)] font-bold transition-all hover:bg-brand-primary/90 hover:scale-105 active:scale-95"
          >
            Get Started <ArrowRight size={18} />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-surface-1/30 border border-neutral-border text-neutral-text-primary font-semibold transition-all hover:bg-neutral-surface-1/50 hover:border-neutral-text-secondary/30 active:scale-95"
          >
            Explore Features
          </Link>
        </div>

        <CodeEditorMockup />
      </div>
    </section>
  );
}
