import Image from "next/image";
import type { Contributor } from "@/types/githubAnalytics.types";

interface ContributorsTableProps {
  contributors: Contributor[];
  isLoading: boolean;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ContributorsTable({
  contributors,
  isLoading,
}: ContributorsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-border bg-neutral-surface-1 shadow-sm">
      <div className="border-b border-neutral-border px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-text-primary">
          Productivity by Contributor
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-surface-2/30 text-left text-xs font-medium text-neutral-text-secondary">
              <th className="px-5 py-3">Contributor</th>
              <th className="px-5 py-3 text-right">Commits</th>
              <th className="px-5 py-3 text-right">PRs Merged</th>
              <th className="px-5 py-3 text-right">Lines Changed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-border">
            {isLoading && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-neutral-text-secondary"
                >
                  Loading contributors...
                </td>
              </tr>
            )}

            {!isLoading && contributors.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-neutral-text-secondary"
                >
                  No contributor data yet. Sync this project to populate it.
                </td>
              </tr>
            )}

            {!isLoading &&
              contributors.map((c) => (
                <tr
                  key={c.login}
                  className="group transition-colors hover:bg-neutral-surface-2/50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {c.avatarUrl ? (
                        // <Image
                        //   src={c.avatarUrl}
                        //   alt={c.name}
                        //   width={32}
                        //   height={32}
                        //   className="h-8 w-8 rounded-full"
                        // />
                        <div></div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-bold text-brand-primary">
                          {getInitials(c.name)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-neutral-text-primary">
                          {c.name}
                        </div>
                        <div className="text-[11px] text-neutral-text-secondary">
                          @{c.login}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right font-medium text-neutral-text-primary">
                    {c.commits}
                  </td>
                  <td className="px-5 py-4 text-right text-neutral-text-secondary">
                    {c.prsMerged}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="inline-flex items-center rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
                      +{c.linesChanged.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
