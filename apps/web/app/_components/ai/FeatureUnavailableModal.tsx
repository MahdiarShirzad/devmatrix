"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  Copy,
  Globe2,
  Info,
  X,
  XCircle,
} from "lucide-react";
import GithubIcon from "@/app/_utils/GithubIcon";

type FeatureUnavailableModalProps = {
  open: boolean;
  onClose: () => void;
  feature: "ai-debug" | "saas-validator";
};

const FEATURE_CONTENT = {
  "ai-debug": {
    title: "New AI Debugging sessions are currently unavailable",
    description:
      "New AI Debugging sessions are temporarily unavailable in the deployed version of DevMatrix because the backend server is hosted in Iran and the external AI service cannot be reliably accessed from this server environment.",
    reassurance:
      "Your previous debugging sessions are still available. You can continue to open, review, and analyze your existing sessions.",
    availableItems: [
      "View previous debugging sessions",
      "Review previous AI debugging results",
      "Browse your existing projects",
    ],
    unavailableItems: [
      "Create a new AI debugging session",
      "Submit new code for AI analysis",
    ],
    localCtaLabel: "Run AI Debugging Locally",
  },
  "saas-validator": {
    title: "New AI validations are currently unavailable",
    description:
      "New SaaS idea validations and re-validations are temporarily unavailable in the deployed version of DevMatrix because the backend server is hosted in Iran and the external AI service cannot be reliably accessed from this server environment.",
    reassurance:
      "Your previous validation results are still available. You can continue to view and review your existing validations.",
    availableItems: [
      "View previous idea validations",
      "Review previous validation results",
      "Browse your existing ideas",
    ],
    unavailableItems: [
      "Validate a new SaaS idea",
      "Re-validate an existing idea",
    ],
    localCtaLabel: "Run SaaS Validator Locally",
  },
};

const GITHUB_REPO_URL = "https://github.com/MahdiarShirzad/devmatrix";

const CLONE_COMMAND = `git clone ${GITHUB_REPO_URL}.git
cd devmatrix`;

const BACKEND_COMMAND = `cd api
npm install
npm run dev`;

const FRONTEND_COMMAND = `cd web
npm install
npm run dev`;

const BACKEND_ENV = `# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=<YOUR_MONGODB_URI>

# JWT Secrets
ACCESS_TOKEN_SECRET=<YOUR_ACCESS_TOKEN_SECRET>
REFRESH_TOKEN_SECRET=<YOUR_REFRESH_TOKEN_SECRET>

# GitHub OAuth
GITHUB_CLIENT_ID=<YOUR_GITHUB_CLIENT_ID>
GITHUB_CLIENT_SECRET=<YOUR_GITHUB_CLIENT_SECRET>
GITHUB_CALLBACK_URL=<YOUR_LOCAL_GITHUB_CALLBACK_URL>

# AI
AI_DEBUG_GROQ_API_KEY=<YOUR_GROQ_API_KEY>
IDEA_VALIDATOR_GROQ_API_KEY=<YOUR_GROQ_API_KEY>`;

const FRONTEND_ENV = `NEXT_PUBLIC_API_URL=http://localhost:3001/api`;

export default function FeatureUnavailableModal({
  open,
  onClose,
  feature,
}: FeatureUnavailableModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const localSetupRef = useRef<HTMLDivElement>(null);
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus close button on open
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  const copyToClipboard = async (text: string, blockId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedBlock(blockId);
      setTimeout(() => setCopiedBlock(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const scrollToLocalSetup = () => {
    localSetupRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!open) return null;

  const content = FEATURE_CONTENT[feature];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-unavailable-title"
      aria-describedby="feature-unavailable-description"
    >
      <div className="relative w-full max-w-2xl max-h-full overflow-y-auto rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-2xl">
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-neutral-text-secondary hover:text-neutral-text-primary hover:bg-neutral-surface-2 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-warning-bg px-3 py-1 text-xs font-medium text-warning ring-1 ring-warning/30">
            <AlertTriangle size={14} />
            Temporarily Limited
          </div>

          {/* Title */}
          <h2
            id="feature-unavailable-title"
            className="mt-4 text-2xl font-semibold text-neutral-text-primary"
          >
            {content.title}
          </h2>

          {/* Description */}
          <p
            id="feature-unavailable-description"
            className="mt-2 text-sm text-neutral-text-secondary leading-relaxed"
          >
            {content.description}
          </p>

          {/* Reassurance */}
          <div className="mt-4 flex gap-3 rounded-lg border border-info/30 bg-info-bg p-4">
            <Info size={20} className="shrink-0 text-info" />
            <p className="text-sm text-neutral-text-primary">
              {content.reassurance}
            </p>
          </div>

          {/* Available / Unavailable */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Available */}
            <div className="rounded-lg border border-success/30 bg-success-bg p-4">
              <h3 className="text-sm font-semibold text-success">
                What you can do right now
              </h3>
              <ul className="mt-2 space-y-1.5">
                {content.availableItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-neutral-text-primary"
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Unavailable */}
            <div className="rounded-lg border border-error/30 bg-error-bg p-4">
              <h3 className="text-sm font-semibold text-error">
                What is currently unavailable
              </h3>
              <ul className="mt-2 space-y-1.5">
                {content.unavailableItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-neutral-text-primary"
                  >
                    <XCircle size={16} className="mt-0.5 shrink-0 text-error" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Why is this happening? */}
          <div className="mt-6 border-t border-neutral-border pt-6">
            <h3 className="text-lg font-medium text-neutral-text-primary">
              Why is this happening?
            </h3>
            <p className="mt-2 text-sm text-neutral-text-secondary leading-relaxed">
              Existing results are stored in DevMatrix and can still be accessed
              normally. Creating a new debugging session or running a new
              validation requires a fresh request to the external AI service.
              Those requests currently cannot be reliably processed by the
              deployed backend because it is hosted in Iran.
            </p>
          </div>

          {/* How to use this feature locally */}
          <div
            ref={localSetupRef}
            className="mt-6 border-t border-neutral-border pt-6"
          >
            <h3 className="text-lg font-medium text-neutral-text-primary">
              How to use this feature locally
            </h3>

            {/* Step 1: Clone DevMatrix */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-surface-2 text-xs font-medium text-neutral-text-primary ring-1 ring-neutral-border">
                  1
                </span>
                <span className="font-medium text-neutral-text-primary">
                  Clone DevMatrix
                </span>
              </div>
              <div className="mt-2 relative group">
                <button
                  onClick={() =>
                    copyToClipboard(CLONE_COMMAND, "clone-command")
                  }
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-neutral-surface-2 border border-neutral-border text-neutral-text-secondary hover:text-neutral-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  aria-label="Copy clone command"
                >
                  {copiedBlock === "clone-command" ? (
                    <Check size={14} className="text-success" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
                <pre className="rounded-lg border border-neutral-border bg-neutral-surface-2 p-4 overflow-x-auto text-sm font-mono text-neutral-text-primary">
                  <code>{CLONE_COMMAND}</code>
                </pre>
              </div>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm text-brand-primary hover:text-brand-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 rounded"
              >
                <GithubIcon width={22} className="text-black" />
                View DevMatrix on GitHub
              </a>
            </div>

            {/* Step 2: Start the backend */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-surface-2 text-xs font-medium text-neutral-text-primary ring-1 ring-neutral-border">
                  2
                </span>
                <span className="font-medium text-neutral-text-primary">
                  Start the backend
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-text-secondary">
                Open a terminal in the <code className="font-mono">api</code>{" "}
                directory.
              </p>
              <div className="mt-2 relative group">
                <button
                  onClick={() =>
                    copyToClipboard(BACKEND_COMMAND, "backend-command")
                  }
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-neutral-surface-2 border border-neutral-border text-neutral-text-secondary hover:text-neutral-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  aria-label="Copy backend commands"
                >
                  {copiedBlock === "backend-command" ? (
                    <Check size={14} className="text-success" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
                <pre className="rounded-lg border border-neutral-border bg-neutral-surface-2 p-4 overflow-x-auto text-sm font-mono text-neutral-text-primary">
                  <code>{BACKEND_COMMAND}</code>
                </pre>
              </div>
            </div>

            {/* Step 3: Start the frontend */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-surface-2 text-xs font-medium text-neutral-text-primary ring-1 ring-neutral-border">
                  3
                </span>
                <span className="font-medium text-neutral-text-primary">
                  Start the frontend
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-text-secondary">
                Open another terminal in the{" "}
                <code className="font-mono">web</code> directory.
              </p>
              <div className="mt-2 relative group">
                <button
                  onClick={() =>
                    copyToClipboard(FRONTEND_COMMAND, "frontend-command")
                  }
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-neutral-surface-2 border border-neutral-border text-neutral-text-secondary hover:text-neutral-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                  aria-label="Copy frontend commands"
                >
                  {copiedBlock === "frontend-command" ? (
                    <Check size={14} className="text-success" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
                <pre className="rounded-lg border border-neutral-border bg-neutral-surface-2 p-4 overflow-x-auto text-sm font-mono text-neutral-text-primary">
                  <code>{FRONTEND_COMMAND}</code>
                </pre>
              </div>
            </div>

            {/* Step 4: Configure environment variables */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-surface-2 text-xs font-medium text-neutral-text-primary ring-1 ring-neutral-border">
                  4
                </span>
                <span className="font-medium text-neutral-text-primary">
                  Configure environment variables
                </span>
              </div>

              {/* Backend .env */}
              <div className="mt-2">
                <p className="text-xs text-neutral-text-secondary mb-1">
                  Backend <code className="font-mono">devmatrix/api/.env</code>
                </p>
                <div className="relative group">
                  <button
                    onClick={() => copyToClipboard(BACKEND_ENV, "backend-env")}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-neutral-surface-2 border border-neutral-border text-neutral-text-secondary hover:text-neutral-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    aria-label="Copy backend environment variables"
                  >
                    {copiedBlock === "backend-env" ? (
                      <Check size={14} className="text-success" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                  <pre className="rounded-lg border border-neutral-border bg-neutral-surface-2 p-4 overflow-x-auto text-sm font-mono text-neutral-text-primary">
                    <code>{BACKEND_ENV}</code>
                  </pre>
                </div>
              </div>

              {/* Frontend .env.local */}
              <div className="mt-3">
                <p className="text-xs text-neutral-text-secondary mb-1">
                  Frontend{" "}
                  <code className="font-mono">devmatrix/web/.env.local</code>
                </p>
                <div className="relative group">
                  <button
                    onClick={() =>
                      copyToClipboard(FRONTEND_ENV, "frontend-env")
                    }
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-neutral-surface-2 border border-neutral-border text-neutral-text-secondary hover:text-neutral-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    aria-label="Copy frontend environment variables"
                  >
                    {copiedBlock === "frontend-env" ? (
                      <Check size={14} className="text-success" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                  <pre className="rounded-lg border border-neutral-border bg-neutral-surface-2 p-4 overflow-x-auto text-sm font-mono text-neutral-text-primary">
                    <code>{FRONTEND_ENV}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Network requirement */}
          <div className="mt-6 rounded-lg border border-warning/30 bg-warning-bg p-4 flex gap-3">
            <Globe2 size={20} className="shrink-0 text-warning" />
            <div>
              <p className="text-sm font-medium text-neutral-text-primary">
                Network requirement
              </p>
              <p className="mt-1 text-sm text-neutral-text-secondary">
                DevMatrix&apos;s AI features communicate with external AI
                services. These services may not be accessible when requests
                originate from an Iranian IP address. To use AI Debugging or
                SaaS Validator locally, use a supported non-Iranian network/VPN
                before sending AI requests.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-border bg-neutral-surface-2 px-4 py-2.5 text-sm font-medium text-neutral-text-primary transition-all hover:bg-neutral-border/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            >
              <GithubIcon width={25} className="text-black" />
              View on GitHub
            </a>
            <button
              onClick={scrollToLocalSetup}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-primary/30 bg-brand-primary/10 px-4 py-2.5 text-sm font-medium text-brand-primary transition-all hover:bg-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            >
              {content.localCtaLabel}
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-primary/25 transition-all hover:bg-brand-primary/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            >
              Continue to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
