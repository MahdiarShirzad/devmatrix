"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NewIdeaPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="mx-auto max-w-2xl">
      <button
        type="button"
        onClick={() => router.push("/saas-validator")}
        className="mb-6 flex items-center gap-2 text-sm text-neutral-text-secondary hover:text-neutral-text-primary"
      >
        <ArrowLeft size={14} />
        Back to ideas
      </button>

      <h1 className="text-xl font-medium text-neutral-text-primary">
        Validate a new idea
      </h1>
      <p className="mt-1 text-sm text-neutral-text-secondary">
        Describe your idea and get a score for market fit, competition, and
        risk.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          // Idea created server-side, then redirect to the new idea id
          router.push("/saas-validator/idea_new");
        }}
      >
        <div>
          <label
            htmlFor="title"
            className="mb-1.5 block text-sm text-neutral-text-primary"
          >
            Idea title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Async standup bot for remote teams"
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-2.5 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm text-neutral-text-primary"
          >
            Describe your idea
          </label>
          <textarea
            id="description"
            rows={6}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does it do, who is it for, and how would it make money?"
            className="w-full resize-none rounded-lg border border-neutral-border bg-neutral-surface-1 p-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!title.trim() || !description.trim()}
          className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Sparkles size={16} />
          Validate idea
        </button>
      </form>
    </div>
  );
}
