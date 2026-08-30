"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, Lightbulb, FolderGit2 } from "lucide-react";
import ValidatorHeader from "./_components/ValidatorHeader";
import OverviewStats from "./_components/OverviewStats";
import IdeaSearchToolbar from "./_components/IdeaSearchToolbar";
import IdeasGrid from "./_components/IdeasGrid";
import { useIdeas } from "@/hooks/useIdea";
import { useState } from "react";
import FeatureUnavailableModal from "@/app/_components/ai/FeatureUnavailableModal";

export default function SaasValidatorPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { data, isLoading, isError } = useIdeas(projectId);
  const ideas = data?.ideas ?? [];

  return (
    <>
      <FeatureUnavailableModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feature="saas-validator"
      />
      {projectId === "none" ? (
        <div className="flex h-full flex-col pb-8">
          <ValidatorHeader />
          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-surface-2 text-neutral-text-secondary ring-1 ring-neutral-border">
              <FolderGit2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-text-primary">
              No project linked yet
            </h3>
            <p className="max-w-md text-sm text-neutral-text-secondary">
              Ideas belong to a project. Link a GitHub repository from Analytics
              Platform first, then come back here.
            </p>
            <Link
              href="/analytics"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 active:scale-95"
            >
              Go to Analytics Platform
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col pb-8">
          <ValidatorHeader />
          <OverviewStats projectId={projectId} />
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
      )}
    </>
  );
}
