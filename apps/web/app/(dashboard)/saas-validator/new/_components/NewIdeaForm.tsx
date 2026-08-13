"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Lightbulb,
  AlignLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCreateIdea } from "@/hooks/useIdea";
import { ApiError } from "@/lib/apiClient";

export default function NewIdeaForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { mutate: createIdea, isPending, error } = useCreateIdea();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createIdea(
      { title, description },
      {
        onSuccess: (data) => {
          router.push(`/saas-validator/${data.idea._id}`);
        },
      },
    );
  };

  const errorMessage =
    error instanceof ApiError
      ? error.message
      : error
        ? "Something went wrong. Please try again."
        : null;

  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8 sm:py-8">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-text-primary"
          >
            <Lightbulb size={16} className="text-neutral-text-secondary" />
            Idea Title
          </label>
          <input
            id="title"
            type="text"
            required
            disabled={isPending}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Async standup bot for remote teams"
            className="w-full rounded-xl border border-neutral-border bg-[#0d1117] px-4 py-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-all focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-semibold text-neutral-text-primary"
            >
              <AlignLeft size={16} className="text-neutral-text-secondary" />
              Detailed Description
            </label>
            <span className="text-xs text-neutral-text-secondary">
              Min 50 chars recommended
            </span>
          </div>
          <textarea
            id="description"
            rows={6}
            required
            disabled={isPending}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What exactly does it do? Who is the primary target audience? How do you plan to monetize it?"
            className="w-full resize-none rounded-xl border border-neutral-border bg-[#0d1117] p-4 text-sm leading-relaxed text-neutral-text-primary placeholder:text-neutral-text-secondary transition-all focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
          />
          <p className="mt-2.5 text-xs text-neutral-text-secondary">
            The more context you provide, the more accurate the validation score
            will be.
          </p>
        </div>

        {errorMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
            <AlertCircle size={16} className="shrink-0" />
            {errorMessage}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-end border-t border-neutral-border pt-6">
        <button
          type="submit"
          disabled={!title.trim() || !description.trim() || isPending}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto active:scale-95"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing Idea...
            </>
          ) : (
            <>
              <Sparkles
                size={18}
                className="transition-transform group-hover:scale-110"
              />
              Validate Idea Now
            </>
          )}
        </button>
      </div>
    </form>
  );
}
