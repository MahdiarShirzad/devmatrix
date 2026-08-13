"use client";

import { Loader2, Lightbulb } from "lucide-react";
import ValidatorHeader from "./_components/ValidatorHeader";
import OverviewStats from "./_components/OverviewStats";
import IdeaSearchToolbar from "./_components/IdeaSearchToolbar";
import IdeasGrid from "./_components/IdeasGrid";
import { useIdeas } from "@/hooks/useIdea";

export default function SaasValidatorPage() {
  const { data, isLoading, isError } = useIdeas();
  const ideas = data?.ideas ?? [];

  return (
    <div className="flex h-full flex-col pb-8">
      <ValidatorHeader />
      <OverviewStats />
      <IdeaSearchToolbar />

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-16 text-neutral-text-secondary">
          <Loader2 size={20} className="mr-2 animate-spin" />
          Loading ideas...
        </div>
      ) : isError ? (
        <div className="flex flex-1 items-center justify-center py-16 text-error">
          Failed to load ideas. Please try again.
        </div>
      ) : ideas.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center text-neutral-text-secondary">
          <Lightbulb size={28} className="text-neutral-text-secondary" />
          <p className="text-sm">
            No ideas yet. Validate your first SaaS idea to get started.
          </p>
        </div>
      ) : (
        <IdeasGrid ideas={ideas} />
      )}
    </div>
  );
}
