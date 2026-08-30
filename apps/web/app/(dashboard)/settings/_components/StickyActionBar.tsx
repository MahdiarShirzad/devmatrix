import { Check, Loader2 } from "lucide-react";

interface StickyActionBarProps {
  visible: boolean;
  saving: boolean;
  success: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export default function StickyActionBar({
  visible,
  saving,
  success,
  onSave,
  onCancel,
}: StickyActionBarProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="border-t border-neutral-border bg-neutral-surface-1/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <span className="text-sm text-neutral-text-secondary">
            {saving
              ? "Saving changes..."
              : success
                ? "Changes saved"
                : "Unsaved changes"}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              disabled={saving}
              className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:bg-neutral-surface-2 hover:text-neutral-text-primary disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-lg bg-brand-primary text-btn-primary px-4 py-2 text-sm font-semibold transition-all hover:bg-brand-primary/90 disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : success ? (
                <>
                  <Check size={16} />
                  Saved
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
