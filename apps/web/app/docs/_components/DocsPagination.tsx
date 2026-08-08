import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { flatDocsNav } from "./nav-config";

export default function DocsPagination({ current }: { current: string }) {
  const idx = flatDocsNav.findIndex((item) => item.href === current);
  const prev = idx > 0 ? flatDocsNav[idx - 1] : null;
  const next =
    idx >= 0 && idx < flatDocsNav.length - 1 ? flatDocsNav[idx + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
      {prev ? (
        <Link href={prev.href} className="flex flex-col items-start group">
          <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Previous
          </span>
          <span className="text-white font-medium flex items-center gap-2 group-hover:text-purple-400 transition-colors">
            <ChevronLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            {prev.name}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={next.href} className="flex flex-col items-end group">
          <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">
            Next Step
          </span>
          <span className="text-white font-medium flex items-center gap-2 group-hover:text-purple-400 transition-colors">
            {next.name}
            <ChevronRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
