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
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data, isLoading, isError } = useIdea(id);
  const reevaluate = useReevaluateIdea(id);

  const idea = data?.idea;

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center pb-8">
        <p className="text-sm text-neutral-text-secondary">
          در حال بارگذاری ایده...
        </p>
      </div>
    );
  }

  if (isError || !idea) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 pb-8">
        <BackButton />
        <p className="text-sm text-error">
          خطا در دریافت اطلاعات ایده. لطفاً دوباره تلاش کنید.
        </p>
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
            ? "این ایده در حال ارزیابی است، لطفاً چند لحظه صبر کنید."
            : idea.status === "failed"
              ? (idea.errorMessage ?? "ارزیابی این ایده با خطا مواجه شد.")
              : "خلاصه‌ای برای این ایده ثبت نشده است.")
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
