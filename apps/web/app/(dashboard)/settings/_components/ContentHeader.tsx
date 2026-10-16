"use client";

interface ContentHeaderProps {
  activeTab: string;
}

export default function ContentHeader({ activeTab }: ContentHeaderProps) {
  const formatTabName = (tab: string) => {
    return tab.replace(/-/g, " ");
  };

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-neutral-border pt-4 md:pt-0 gap-4 sm:gap-0">
      <div>
        <h2 className="text-2xl font-bold text-neutral-text-primary tracking-tight capitalize">
          {formatTabName(activeTab)}
        </h2>
      </div>
    </header>
  );
}
