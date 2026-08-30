import Link from "next/link";
import { Search } from "lucide-react";
import Image from "next/image";

export default function DocsTopbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-border bg-neutral-bg/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex h-14 shrink-0 items-center gap-3 px-5">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="DevMatrix"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="font-mono text-sm font-bold tracking-tight text-neutral-text-primary">
              DevMatrix
            </span>
          </Link>
        </div>

        <div className="relative w-full max-w-md hidden md:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-text-secondary/50"
          />
          <input
            type="text"
            placeholder="Search documentation... (Press '/')"
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 py-2 pl-10 pr-4 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary/40 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all"
          />
        </div>
      </div>
    </header>
  );
}
