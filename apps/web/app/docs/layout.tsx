import type { ReactNode } from "react";
import DocsTopbar from "./_components/DocsTopbar";
import DocsSidebar from "./_components/DocsSidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0916] text-slate-300 font-sans selection:bg-purple-500/30">
      <DocsTopbar />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <DocsSidebar />

          {/* هر page.tsx یک <main> و یک <aside> (TOC) به‌عنوان دو فرزند
              کنار هم برمی‌گردونه؛ این wrapper همون grid سه‌ستونه رو می‌سازه */}
          <div className="flex-1 min-w-0 flex flex-col xl:flex-row gap-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
