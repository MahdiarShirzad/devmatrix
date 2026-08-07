import GithubIcon from "@/app/_utils/GithubIcon";
import Link from "next/link";
// import { Github } from "lucide-react";

export default function LoginPage() {
  return (
    <div>
      <div className="mb-8 lg:hidden">
        <span className="text-lg font-medium text-neutral-text-primary">
          DevMatrix
        </span>
      </div>

      <h2 className="text-xl font-medium text-neutral-text-primary">
        Welcome back
      </h2>
      <p className="mt-1 text-sm text-neutral-text-secondary">
        Log in to continue to your dashboard.
      </p>

      {/* Backend has GitHub OAuth ready via passport.ts */}
      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-1 py-2.5 text-sm text-neutral-text-primary transition-colors hover:bg-neutral-surface-2"
      >
        <GithubIcon width={22} height={22} className="text-black" />
        Continue with GitHub
      </button>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-border" />
        <span className="text-xs text-neutral-text-secondary">or</span>
        <div className="h-px flex-1 bg-neutral-border" />
      </div>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm text-neutral-text-primary"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-2.5 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm text-neutral-text-primary"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-brand-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-2.5 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-primary py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand-accent hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
