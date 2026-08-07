"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

const LANGUAGES = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Node.js",
  "React",
  "Go",
];

export default function NewDebugSessionPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="mx-auto max-w-2xl">
      <button
        type="button"
        onClick={() => router.push("/ai-debug")}
        className="mb-6 flex items-center gap-2 text-sm text-neutral-text-secondary hover:text-neutral-text-primary"
      >
        <ArrowLeft size={14} />
        Back to sessions
      </button>

      <h1 className="text-xl font-medium text-neutral-text-primary">
        New debugging session
      </h1>
      <p className="mt-1 text-sm text-neutral-text-secondary">
        Paste the code you&apos;re stuck on and describe what&apos;s going
        wrong.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          // Session created server-side, then redirect to the new session id
          router.push("/ai-debug/sess_new");
        }}
      >
        <div>
          <label
            htmlFor="language"
            className="mb-1.5 block text-sm text-neutral-text-primary"
          >
            Language
          </label>
          <select
            id="language"
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-2.5 text-sm text-neutral-text-primary focus:border-brand-primary focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="code"
            className="mb-1.5 block text-sm text-neutral-text-primary"
          >
            Code
          </label>
          <textarea
            id="code"
            rows={10}
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`function getUser(id) {\n  const user = users.find(u => u.id === id);\n  return user.name;\n}`}
            spellCheck={false}
            className="w-full resize-none rounded-lg border border-neutral-border bg-neutral-surface-1 p-3 font-mono text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm text-neutral-text-primary"
          >
            What&apos;s going wrong?{" "}
            <span className="text-neutral-text-secondary">(optional)</span>
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Throws a null pointer error when the user isn't found"
            className="w-full resize-none rounded-lg border border-neutral-border bg-neutral-surface-1 p-3 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!code.trim()}
          className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Sparkles size={16} />
          Analyze code
        </button>
      </form>
    </div>
  );
}
