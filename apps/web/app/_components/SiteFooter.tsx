import Link from "next/link";
import GithubIcon from "../_utils/GithubIcon";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-border bg-neutral-surface-1/30 py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
            <span className="text-[var(--color-button-text)] font-bold text-sm">
              D
            </span>
          </div>
          <span className="text-lg font-semibold text-neutral-text-primary tracking-tight">
            DevMatrix
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-neutral-text-secondary">
          <Link
            href="/docs/introduction"
            className="hover:text-neutral-text-primary transition-all"
          >
            Docs
          </Link>
          <Link
            href="#"
            className="hover:text-neutral-text-primary transition-all flex items-center gap-1"
          >
            <GithubIcon
              width={24}
              height={24}
              className="text-neutral-text-secondary"
            />
            GitHub
          </Link>
          <Link
            href="#"
            className="hover:text-neutral-text-primary transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-8 text-center md:text-left text-neutral-text-secondary opacity-50 text-xs">
        &copy; {new Date().getFullYear()} DevMatrix Ecosystem. All rights
        reserved.
      </div>
    </footer>
  );
}
