import type { ReactNode } from "react";
import DocsTopbar from "./_components/DocsTopbar";
import DocsSidebar from "./_components/DocsSidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-bg text-neutral-text-primary font-sans selection:bg-brand-primary/30">
      <DocsTopbar />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10">
          <DocsSidebar />

          <div className="flex-1 min-w-0 flex flex-col xl:flex-row gap-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
