"use client";

interface ContentHeaderProps {
  activeTab: string;
  isSaving: boolean;
  onSave: () => void;
}

export default function ContentHeader({
  activeTab,
  isSaving,
  onSave,
}: ContentHeaderProps) {
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

      {activeTab === "profile" && (
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-brand-primary text-btn-primary px-5 py-2 text-sm font-semibold transition-all hover:bg-brand-primary/90 active:scale-95 disabled:opacity-70 disabled:pointer-events-none whitespace-nowrap"
        >
          {isSaving ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-btn-primary/30 border-t-btn-primary animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      )}
    </header>
  );
}
