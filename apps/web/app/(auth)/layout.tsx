import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal, Activity, FlaskConical, Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-bg">
      {/* هدر مخصوص موبایل (لوگو در موبایل مخفی نمی‌شود) */}
      <div className="absolute top-0 left-0 flex w-full items-center p-6 lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10">
            <Image src="/logo.png" alt="DevMatrix" width={20} height={20} />
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-text-primary">
            DevMatrix
          </span>
        </Link>
      </div>

      {/* بخش برندینگ (سمت چپ) - مخفی در موبایل */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-neutral-border bg-[#090b10] p-12 lg:flex">
        {/* افکت‌های نوری و پس‌زمینه */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-accent/10 blur-[120px]"></div>

        {/* لوگو */}
        <div className="relative z-10">
          <Link
            href="/"
            className="flex w-fit items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 border border-brand-primary/20 shadow-lg shadow-brand-primary/5">
              <Image src="/logo.png" alt="DevMatrix" width={24} height={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-text-primary">
              DevMatrix
            </span>
          </Link>
        </div>

        {/* محتوای متنی و ویژگی‌ها */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-3xl font-bold leading-tight text-neutral-text-primary sm:text-4xl">
            One workspace for every stage of building.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-text-secondary">
            The ultimate developer control center. Debug with AI, track your
            team&apos;s activity, test APIs, and validate your next big idea —
            all in one place.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            <div className="flex items-center gap-4 text-sm font-medium text-neutral-text-secondary">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-surface-1 border border-neutral-border">
                <Terminal size={18} className="text-brand-primary" />
              </div>
              Advanced API Testing & Management
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-neutral-text-secondary">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-surface-1 border border-neutral-border">
                <Sparkles size={18} className="text-brand-accent" />
              </div>
              AI-Powered Debugging Engine
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-neutral-text-secondary">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-surface-1 border border-neutral-border">
                <Activity size={18} className="text-success" />
              </div>
              Real-time Team Activity Tracking
            </div>
          </div>
        </div>

        {/* کپی‌رایت */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-text-secondary">
          <p>© {new Date().getFullYear()} DevMatrix Inc.</p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="hover:text-neutral-text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:text-neutral-text-primary transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>

      {/* بخش فرم لاگین/ثبت‌نام (سمت راست) */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 pt-20 lg:w-1/2 lg:pt-0">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </div>
    </div>
  );
}
