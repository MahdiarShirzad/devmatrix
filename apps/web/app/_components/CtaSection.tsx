import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to scale your workflow?
        </h2>
        <p className="text-slate-400 mb-10 text-lg max-w-xl mx-auto">
          Start building your next project with DevMatrix today. Join the
          ecosystem designed for builders.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
          >
            Create Account
          </Link>
          <Link
            href="/docs/introduction"
            className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            View Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
