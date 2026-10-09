import Image from "next/image";
import Link from "next/link";
import GithubIcon from "../_utils/GithubIcon";

const REPO_URL = "https://github.com/MahdiarShirzad/devmatrix";

const MODULE_LINKS = [
  { label: "API Playground", href: "/docs/modules/api-playground" },
  { label: "AI Debugging", href: "/docs/modules/ai-debugging-assistant" },
  { label: "Developer Analytics", href: "/docs/modules/developer-analytics" },
  { label: "Idea Validator", href: "/docs/modules/saas-idea-validator" },
];

const START_LINKS = [
  { label: "Introduction", href: "/docs/introduction" },
  { label: "What is DevMatrix?", href: "/docs/what-is-devmatrix" },
  { label: "Quick start", href: "/docs/quick-start" },
  { label: "Architecture", href: "/docs/concepts/architecture-overview" },
];

const ACCOUNT_LINKS = [
  { label: "Log in", href: "/login" },
  { label: "Create account", href: "/register" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-neutral-surface-1">
      <div className="dm-shell py-14">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex" aria-label="DevMatrix home">
              {/* Same light/dark wordmark convention as the header. */}
              <Image
                src="/logo2.png"
                alt="DevMatrix"
                width={140}
                height={50}
                className="h-auto w-[140px] theme-dark-only"
              />
              <Image
                src="/logo-dark.png"
                alt="DevMatrix"
                width={140}
                height={50}
                className="hidden h-auto w-[140px] theme-light-only"
              />
            </Link>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-neutral-text-secondary">
              A developer intelligence platform — analyze, debug, test, and
              validate, all project by project.
            </p>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[13px] text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
            >
              <GithubIcon width={18} height={18} className="text-neutral-text-secondary" />
              GitHub repository
            </a>
          </div>

          <nav aria-label="Modules" className="md:col-span-3">
            <h3 className="dm-mono-label text-neutral-text-secondary">modules</h3>
            <ul className="mt-4 space-y-2.5">
              {MODULE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Documentation" className="md:col-span-3">
            <h3 className="dm-mono-label text-neutral-text-secondary">docs</h3>
            <ul className="mt-4 space-y-2.5">
              {START_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Account" className="md:col-span-2">
            <h3 className="dm-mono-label text-neutral-text-secondary">account</h3>
            <ul className="mt-4 space-y-2.5">
              {ACCOUNT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-neutral-border pt-6 text-[12px] text-neutral-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} DevMatrix</span>
          <span className="font-mono text-[11px]">
            built by{" "}
            <a
              href="https://github.com/MahdiarShirzad"
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-neutral-text-primary hover:underline"
            >
              Mahdyar Shirzad
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
