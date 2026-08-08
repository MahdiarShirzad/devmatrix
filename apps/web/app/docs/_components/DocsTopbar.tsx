import Link from "next/link";
import { Search } from "lucide-react";

export default function DocsTopbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0916]/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/docs/introduction" className="font-bold text-white text-lg tracking-tight">
            DevMatrix <span className="text-slate-500 font-normal">Docs</span>
          </Link>
        </div>

        {/* نوار جستجو */}
        <div className="relative w-full max-w-md hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            placeholder="Search documentation... (Press '/')"
            className="w-full rounded-lg border border-white/10 bg-[#131221] py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all"
          />
        </div>
      </div>
    </header>
  );
}
