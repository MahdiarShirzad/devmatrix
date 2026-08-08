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
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between pb-6 mb-8 border-b border-white/10 bg-[#0a0916]/80 backdrop-blur-xl pt-4 md:pt-0">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight capitalize">
          {activeTab.replace("-", " ")}
        </h2>
      </div>

      {activeTab === "profile" && (
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-purple-500 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
        >
          {isSaving ? (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
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
