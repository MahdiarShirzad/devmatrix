"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToIdeasButton() {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <button
      type="button"
      onClick={() => router.push(`/projects/${projectId}/saas-validator`)}
      className="group mb-6 flex w-fit items-center gap-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
    >
      <ArrowLeft
        size={16}
        className="transition-transform group-hover:-translate-x-1"
      />
      Back to ideas
    </button>
  );
}
