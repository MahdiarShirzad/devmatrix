"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Loader2, Send } from "lucide-react";

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // شبیه‌سازی درخواست به سرور
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  // نمای پس از ارسال موفقیت‌آمیز
  if (submitted) {
    return (
      <div className="flex w-full flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-lg shadow-brand-primary/5">
          <Mail size={32} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
          Check your email
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-text-secondary">
          If an account exists for{" "}
          <span className="font-semibold text-neutral-text-primary">
            {email}
          </span>
          , we&apos;ve sent a secure link to reset your password.
        </p>
        <Link
          href="/login"
          className="group mt-8 flex items-center gap-2 rounded-xl border border-neutral-border bg-neutral-surface-1 px-5 py-2.5 text-sm font-semibold text-neutral-text-primary transition-all hover:bg-neutral-surface-2 active:scale-95"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to log in
        </Link>
      </div>
    );
  }

  // نمای فرم فراموشی رمز عبور
  return (
    <div className="w-full">
      {/* دکمه بازگشت */}
      <Link
        href="/login"
        className="group mb-8 flex w-fit items-center gap-2 text-sm font-medium text-neutral-text-secondary transition-colors hover:text-neutral-text-primary"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back to log in
      </Link>

      {/* هدر */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-text-primary">
          Reset your password
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-text-secondary">
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </p>
      </div>

      {/* فرم */}
      <form onSubmit={handleSubmit} className="space-y-5">
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

        <button
          type="submit"
          disabled={!email || isSubmitting}
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-primary/90 focus:ring-4 focus:ring-brand-primary/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending link...
            </>
          ) : (
            <>
              <Send
                size={18}
                className="transition-transform group-hover:scale-110"
              />
              Send reset link
            </>
          )}
        </button>
      </form>
    </div>
  );
}
