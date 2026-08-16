import { Target } from "lucide-react";

export default function NewIdeaFormHeader() {
  return (
    <div className="border-b border-neutral-border px-6 py-8 sm:px-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 mb-5">
        <Target size={24} className="text-brand-primary" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
        Validate a New Idea
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-text-secondary">
        Describe your software concept below. Our AI will analyze market fit,
        potential competition, and execution risks to give you a
        comprehensive validation score.
      </p>
    </div>
  );
}
