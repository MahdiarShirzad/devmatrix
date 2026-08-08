"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Terminal,
  Code2,
  MessageSquare,
} from "lucide-react";

// لیست زبان‌ها رو کمی توسعه دادم تا شامل فریم‌ورک‌های پرکاربردتر هم باشه
const LANGUAGES = [
  "TypeScript",
  "JavaScript",
  "Next.js",
  "React.js",
  "Node.js",
  "Express",
  "Python",
  "Go",
  "C#",
];

export default function NewDebugSessionPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="mx-auto max-w-3xl pb-12">
      {/* دکمه بازگشت */}
      <button
        type="button"
        onClick={() => router.push("/ai-debug")}
        className="group mb-8 flex items-center gap-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to sessions
      </button>

      {/* هدر صفحه */}
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-neutral-text-primary">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
            <Sparkles size={20} />
          </div>
          New Debugging Session
        </h1>
        <p className="mt-2 text-sm text-neutral-text-secondary">
          Paste the code you&apos;re stuck on and describe what&apos;s going
          wrong. Our AI will analyze and help you fix it.
        </p>
      </div>

      {/* فرم اصلی */}
      <div className="rounded-2xl border border-neutral-border bg-neutral-surface-1 p-6 shadow-sm sm:p-8">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/ai-debug/sess_new");
          }}
        >
          {/* فیلد انتخاب زبان */}
          <div>
            <label
              htmlFor="language"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-text-primary"
            >
              <Terminal size={16} className="text-neutral-text-secondary" />
              Environment / Language
            </label>
            <div className="relative">
              <select
                id="language"
                className="w-full appearance-none rounded-xl border border-neutral-border bg-neutral-surface-2/50 px-4 py-3 text-sm text-neutral-text-primary transition-all focus:border-brand-primary focus:bg-neutral-surface-1 focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              {/* آیکون فلش سفارشی برای Select */}
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-text-secondary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* فیلد کد */}
          <div>
            <label
              htmlFor="code"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-text-primary"
            >
              <Code2 size={16} className="text-neutral-text-secondary" />
              Source Code
            </label>
            <div className="relative overflow-hidden rounded-xl border border-neutral-border bg-[#0d1117] transition-all focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10">
              {/* یک هدر کوچیک برای استایل دادن به ادیتور کد */}
              <div className="flex items-center gap-1.5 border-b border-neutral-border/50 bg-[#161b22] px-4 py-2">
                <div className="h-2.5 w-2.5 rounded-full bg-error/80"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-warning/80"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-success/80"></div>
              </div>
              <textarea
                id="code"
                rows={12}
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`function getUser(id) {\n  const user = users.find(u => u.id === id);\n  return user.name;\n}`}
                spellCheck={false}
                className="w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-neutral-200 placeholder:text-neutral-600 focus:outline-none"
              />
            </div>
          </div>

          {/* فیلد توضیحات */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-text-primary"
            >
              <MessageSquare
                size={16}
                className="text-neutral-text-secondary"
              />
              What&apos;s going wrong?
              <span className="ml-1 text-xs font-normal text-neutral-text-secondary">
                (optional)
              </span>
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. It throws a TypeError when the user doesn't exist in the database..."
              className="w-full resize-none rounded-xl border border-neutral-border bg-neutral-surface-2/50 p-4 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-all focus:border-brand-primary focus:bg-neutral-surface-1 focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
            />
          </div>

          {/* بخش دکمه ثبت */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-border pt-6 sm:flex-row">
            <p className="text-xs text-neutral-text-secondary">
              Pro tip: You can also paste error logs directly in the code block.
            </p>
            <button
              type="submit"
              disabled={!code.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:outline-none focus:ring-4 focus:ring-brand-primary/20 active:scale-95 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
            >
              <Sparkles size={18} />
              Analyze Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
