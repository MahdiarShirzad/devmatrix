import { Terminal } from "lucide-react";
import { LANGUAGES } from "./constants";

export default function LanguageSelectField() {
  return (
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
  );
}
