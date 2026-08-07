"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
          <Mail size={20} />
        </div>
        <h2 className="text-xl font-medium text-neutral-text-primary">
          Check your email
        </h2>
        <p className="mt-2 text-sm text-neutral-text-secondary">
          If an account exists for that email, we sent a link to reset your
          password.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-2 text-sm text-brand-accent hover:underline"
        >
          <ArrowLeft size={14} />
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/login"
        className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-text-secondary hover:text-neutral-text-primary"
      >
        <ArrowLeft size={14} />
        Back to log in
      </Link>

      <h2 className="text-xl font-medium text-neutral-text-primary">
        Reset your password
      </h2>
      <p className="mt-1 text-sm text-neutral-text-secondary">
        Enter your email and we&apos;ll send you a link to reset it.
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
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
            required
            placeholder="name@company.com"
            className="w-full rounded-lg border border-neutral-border bg-neutral-surface-1 px-3 py-2.5 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:border-brand-primary focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-primary py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Send reset link
        </button>
      </form>
    </div>
  );
}
