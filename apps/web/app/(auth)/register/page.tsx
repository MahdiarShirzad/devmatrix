"use client";

import { useState } from "react";
import Link from "next/link";
import GithubIcon from "@/app/_utils/GithubIcon";
import { User, Mail, Lock, UserPlus, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // شبیه‌سازی درخواست ثبت‌نام به سرور
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  const handleGithubLogin = () => {
    // ریدایرکت به روت بک‌اند برای شروع فلوی Passport.js OAuth
    console.log("Initiating GitHub OAuth flow...");
  };

  return (
    <div className="w-full">
      {/* هدر صفحه */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
          Create your account
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-text-secondary">
          Start debugging, tracking, and validating in minutes.
        </p>
      </div>

      {/* دکمه ورود با گیت‌هاب */}
      <button
        type="button"
        onClick={handleGithubLogin}
        className="group flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-border bg-neutral-surface-1 py-3 text-sm font-semibold text-neutral-text-primary transition-all hover:border-brand-primary/40 hover:bg-neutral-surface-2 active:scale-95"
      >
        <GithubIcon
          width={20}
          height={20}
          className="transition-transform group-hover:scale-110 text-black"
        />
        Continue with GitHub
      </button>

      {/* خط جداکننده */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-border" />
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-text-secondary">
          Or register with email
        </span>
        <div className="h-px flex-1 bg-neutral-border" />
      </div>

      {/* فرم ثبت‌نام */}
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-neutral-text-primary"
          >
            Full Name
          </label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
            />
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mahdiar Shirzad"
              className="w-full rounded-xl border border-neutral-border bg-[#0d1117] py-3 pl-11 pr-4 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-all focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-neutral-text-primary"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
            />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full rounded-xl border border-neutral-border bg-[#0d1117] py-3 pl-11 pr-4 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-all focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-neutral-text-primary"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-text-secondary"
            />
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-neutral-border bg-[#0d1117] py-3 pl-11 pr-4 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary transition-all focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!name || !email || !password || isSubmitting}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <UserPlus
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              Create account
            </>
          )}
        </button>
      </form>

      {/* لینک لاگین */}
      <p className="mt-8 text-center text-sm text-neutral-text-secondary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-primary transition-colors hover:text-brand-accent hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
