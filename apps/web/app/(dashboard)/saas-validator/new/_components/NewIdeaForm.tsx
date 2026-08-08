"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Lightbulb, AlignLeft, Loader2 } from "lucide-react";

export default function NewIdeaForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // شبیه‌سازی تاخیر برای پردازش هوش مصنوعی و بعد انتقال به صفحه نتیجه
    setTimeout(() => {
      router.push("/saas-validator/idea_new");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8 sm:py-8">
      <div className="space-y-6">
        {/* فیلد عنوان */}
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
            disabled={isSubmitting}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Async standup bot for remote teams"
            className="w-full rounded-xl border border-neutral-border bg-[#0d1117] px-4 py-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-all focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* فیلد توضیحات */}
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
            disabled={isSubmitting}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What exactly does it do? Who is the primary target audience? How do you plan to monetize it?"
            className="w-full resize-none rounded-xl border border-neutral-border bg-[#0d1117] p-4 text-sm leading-relaxed text-neutral-text-primary placeholder:text-neutral-text-secondary transition-all focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
          />
          <p className="mt-2.5 text-xs text-neutral-text-secondary">
            The more context you provide, the more accurate the validation
            score will be.
          </p>
        </div>
      </div>

      {/* دکمه سابمیت */}
      <div className="mt-8 flex items-center justify-end border-t border-neutral-border pt-6">
        <button
          type="submit"
          disabled={!title.trim() || !description.trim() || isSubmitting}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none sm:w-auto active:scale-95"
        >
          {isSubmitting ? (
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
