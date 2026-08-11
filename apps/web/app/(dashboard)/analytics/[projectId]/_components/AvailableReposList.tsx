"use client";

import { useState } from "react";
import { Lock, GitBranch, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import {
  useAvailableRepos,
  useLinkGithubProject,
} from "@/hooks/useGithubAnalytics";

interface AvailableReposListProps {
  onClose?: () => void;
}

export default function AvailableReposList({
  onClose,
}: AvailableReposListProps) {
  const { data, isLoading, isError, error, refetch } = useAvailableRepos();
  const linkProject = useLinkGithubProject();
  const [linkingFullName, setLinkingFullName] = useState<string | null>(null);

  const repos = data?.repos ?? [];

  const handleLink = (fullName: string) => {
    setLinkingFullName(fullName);
    linkProject.mutate(
      { fullName },
      {
        onSuccess: () => {
          if (onClose) onClose();
        },
        onSettled: () => setLinkingFullName(null),
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-3 p-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-12 w-full animate-pulse rounded-lg bg-neutral-surface-2/60"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
        <AlertCircle className="h-6 w-6 text-error shrink-0" />
        <p className="text-sm font-medium text-error">
          {error instanceof Error
            ? error.message
            : "Failed to load GitHub repositories"}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <RefreshCw size={12} />
          Retry loading
        </button>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
        <p className="text-sm font-medium text-neutral-text-primary">
          No available repositories found
        </p>
        <p className="text-xs text-neutral-text-secondary max-w-xs">
          All repositories on your account are already linked, or none were
          found.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <RefreshCw size={12} />
          Refresh list
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-neutral-border pb-3 mb-2 px-1">
        <div>
          <h4 className="text-sm font-semibold text-neutral-text-primary">
            Link Repositories
          </h4>
          <p className="text-xs text-neutral-text-secondary">
            Select a GitHub repository to add to your analytics dashboard.
          </p>
        </div>
      </div>

      <ul className="divide-y divide-neutral-border/60 max-h-[360px] overflow-y-auto pr-1">
        {repos.map((repo) => {
          const isLinking = linkingFullName === repo.fullName;
          return (
            <li
              key={repo.githubRepoId}
              className="flex items-center justify-between gap-4 py-3 px-2 rounded-lg transition-colors hover:bg-neutral-surface-2/50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="rounded-md border border-neutral-border bg-neutral-surface-2 p-2 text-neutral-text-secondary shrink-0">
                  <GitBranch size={16} />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-neutral-text-primary">
                      {repo.fullName}
                    </p>
                    {repo.isPrivate && (
                      <span className="inline-flex items-center gap-1 rounded bg-neutral-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-neutral-text-secondary border border-neutral-border">
                        <Lock size={10} />
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-text-secondary font-mono">
                    {repo.defaultBranch}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleLink(repo.fullName)}
                disabled={isLinking || linkProject.isPending}
                className="shrink-0 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLinking ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 size={12} className="animate-spin" />
                    Linking...
                  </span>
                ) : (
                  "Link Project"
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {linkProject.isError && (
        <div className="mt-3 rounded-md bg-error/10 border border-error/20 p-2.5 text-xs text-error flex items-center gap-2">
          <AlertCircle size={14} className="shrink-0" />
          <span>
            {linkProject.error instanceof Error
              ? linkProject.error.message
              : "Failed to link repository."}
          </span>
        </div>
      )}
    </div>
  );
}
