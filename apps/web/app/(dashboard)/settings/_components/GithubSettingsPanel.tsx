"use client";

import { useState } from "react";
import { CheckCircle2, ExternalLink, Trash2 } from "lucide-react";
import {
  useGithubProjects,
  useSetGithubAccessToken,
  useRemoveGithubAccessToken,
} from "@/hooks/useGithubAnalytics";
import GithubIcon from "@/app/_utils/GithubIcon";

export default function GithubSettingsPanel() {
  const { data, isLoading } = useGithubProjects();
  const setToken = useSetGithubAccessToken();
  const removeToken = useRemoveGithubAccessToken();

  const [tokenInput, setTokenInput] = useState("");
  const githubConnected = data?.githubConnected ?? false;

  const handleSave = () => {
    if (!tokenInput.trim()) return;
    setToken.mutate(tokenInput.trim(), {
      onSuccess: () => setTokenInput(""),
    });
  };

  const handleRemove = () => {
    removeToken.mutate();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-4 rounded-xl border border-neutral-border bg-neutral-surface-1 p-6">
        <div className="rounded-lg bg-neutral-surface-2 p-2.5 flex items-center justify-center">
          <GithubIcon
            width={30}
            height={30}
            className="text-neutral-text-primary"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-medium text-neutral-text-primary">
              GitHub
            </h3>
            {!isLoading && githubConnected && (
              <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success border border-success/20">
                <CheckCircle2 size={12} /> Connected
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-text-secondary mt-1">
            Connect a GitHub personal access token to link repositories and view
            analytics for them.
          </p>
        </div>
      </div>

      {!isLoading && githubConnected && (
        <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-6">
          <p className="text-sm text-neutral-text-secondary mb-4">
            Your GitHub account is connected. You can replace the token below,
            or disconnect it entirely.
          </p>
          <button
            onClick={handleRemove}
            disabled={removeToken.isPending}
            className="flex items-center gap-2 rounded-lg bg-error/10 px-4 py-2 text-sm font-medium text-error transition-colors hover:bg-error hover:text-white border border-error/20 disabled:opacity-60 disabled:pointer-events-none"
          >
            <Trash2 size={14} />
            {removeToken.isPending ? "Disconnecting..." : "Disconnect GitHub"}
          </button>
          {removeToken.isError && (
            <p className="mt-2 text-xs text-error">
              {removeToken.error instanceof Error
                ? removeToken.error.message
                : "Failed to disconnect."}
            </p>
          )}
        </div>
      )}

      <div className="rounded-xl border border-neutral-border bg-neutral-surface-1 p-6">
        <label className="text-sm font-medium text-neutral-text-secondary">
          {githubConnected
            ? "Replace access token"
            : "GitHub personal access token"}
        </label>
        <p className="text-xs text-neutral-text-secondary/40 mt-1 mb-3">
          Needs the <code className="text-brand-primary">repo</code> scope. You
          can create one from{" "}
          <a
            href="https://github.com/settings/tokens/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-primary hover:underline"
          >
            GitHub token settings <ExternalLink size={11} />
          </a>
          . The token is stored securely and only used to read your repository
          data.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="flex-1 rounded-lg border border-neutral-border bg-neutral-surface-1 px-4 py-2.5 text-neutral-text-primary placeholder:text-neutral-text-secondary/30 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary font-mono text-sm"
          />
          <button
            onClick={handleSave}
            disabled={!tokenInput.trim() || setToken.isPending}
            className="shrink-0 rounded-lg bg-brand-primary text-btn-primary px-5 py-2.5 text-sm font-semibold transition-all hover:bg-brand-primary/90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            {setToken.isPending ? "Saving..." : "Save Token"}
          </button>
        </div>

        {setToken.isError && (
          <p className="mt-2 text-xs text-error">
            {setToken.error instanceof Error
              ? setToken.error.message
              : "Failed to save token."}
          </p>
        )}
        {setToken.isSuccess && (
          <p className="mt-2 text-xs text-success">
            Token saved. GitHub is now connected.
          </p>
        )}
      </div>
    </div>
  );
}
