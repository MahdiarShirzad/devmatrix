import { Info } from "lucide-react";
import { DebugSession } from "@/types/aiDebug.types";

interface ExplanationTabProps {
  session: DebugSession;
}

export default function ExplanationTab({ session }: ExplanationTabProps) {
  if (!session.explanation) {
    return (
      <p className="text-sm text-neutral-text-secondary">
        {session.status === "in_progress" || session.status === "pending"
          ? "در حال تحلیل..."
          : "توضیحی موجود نیست."}
      </p>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex gap-3 rounded-xl border border-warning/20 bg-warning-bg/50 p-4">
        <Info size={20} className="shrink-0 text-warning" />
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-text-primary">
          {session.explanation}
        </p>
      </div>
    </div>
  );
}
