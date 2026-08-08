import { Sparkles } from "lucide-react";

export default function NewSessionHeader() {
  return (
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
  );
}
