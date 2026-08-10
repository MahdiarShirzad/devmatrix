// DocsTopbar.tsx
import Link from "next/link";
import { Search } from "lucide-react";

export default function DocsTopbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#000000]/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link
            href="/docs/introduction"
            className="font-bold text-white text-lg tracking-tight"
          >
            DevMatrix{" "}
            <span className="text-[#e5e5e5]/50 font-normal">Docs</span>
          </Link>
        </div>

        <div className="relative w-full max-w-md hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e5e5e5]/50"
          />
          <input
            type="text"
            placeholder="Search documentation... (Press '/')"
            className="w-full rounded-lg border border-white/10 bg-[#0D1117] py-2 pl-10 pr-4 text-sm text-white placeholder:text-[#e5e5e5]/40 focus:border-[#fca311] focus:outline-none focus:ring-1 focus:ring-[#fca311] transition-all"
          />
        </div>
      </div>
    </header>
  );
}
