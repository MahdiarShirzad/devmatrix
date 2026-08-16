"use client";

import { useParams } from "next/navigation";
import BackButton from "./_components/BackButton";
import IdeaHeader from "./_components/IdeaHeader";
import ScoreCard from "./_components/ScoreCard";
import IdeaEditor from "./_components/IdeaEditor";
import AnalysisGrid from "./_components/AnalysisGrid";
import { statusLabel, timeAgo } from "./_components/idea-format";
import { useIdea, useReevaluateIdea } from "@/hooks/useIdea";

export default function ValidatorIdeaPage() {
  const params = useParams<{ ideaId: string }>();
  const id = params.ideaId;

  const { data, isLoading, isError } = useIdea(id);
  const reevaluate = useReevaluateIdea(id);

  const idea = data?.idea;

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-4 pb-8">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-surface-2 border-t-brand-primary"></div>
        <p className="animate-pulse text-sm font-medium text-neutral-text-secondary">
          Loading idea details...
        </p>
      </div>
    );
  }

  if (isError || !idea) {
    return (
      <div className="flex h-full flex-col pb-8">
        <BackButton />
        <div className="mt-8 flex flex-1 flex-col items-center justify-center">
          <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-error/20 bg-error-bg/40 p-8 text-center shadow-lg backdrop-blur-sm">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
              <svg
                className="h-8 w-8 text-error"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-neutral-text-primary">
              Failed to Load Idea
            </h2>
            <p className="mb-8 text-sm text-neutral-text-secondary leading-relaxed">
              We couldn&apos;t retrieve the details for this idea. It might have
              been removed or a network error occurred.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-error px-8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-error/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-brand-bg active:scale-95"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleReEvaluate = (pitch: string) => {
    reevaluate.mutate({ description: pitch });
  };

  return (
    <div className="flex h-full flex-col pb-8">
      <BackButton />

      <IdeaHeader
        title={idea.title}
        status={statusLabel(idea.status)}
        submittedAgo={timeAgo(idea.createdAt)}
        category={idea.category ?? "General"}
      />

      <ScoreCard
        score={idea.overallScore ?? 0}
        description={
          idea.overallSummary ??
          (idea.status === "pending"
            ? "This idea is currently being evaluated, please wait a moment."
            : idea.status === "failed"
              ? (idea.errorMessage ?? "The evaluation of this idea failed.")
              : "No summary recorded for this idea.")
        }
      />

      <IdeaEditor
        initialPitch={idea.description}
        onReEvaluate={handleReEvaluate}
        isSubmitting={reevaluate.isPending}
      />

      <AnalysisGrid idea={idea} />
    </div>
  );
}
