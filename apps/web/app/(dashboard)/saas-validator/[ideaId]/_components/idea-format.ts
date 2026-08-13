import type { IdeaStatus } from "@/types/ideaValidator.types";

export function statusLabel(status: IdeaStatus): string {
  switch (status) {
    case "pending":
      return "Needs Review";
    case "completed":
      return "Evaluated";
    case "failed":
      return "Failed";
    default:
      return status;
  }
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  if (diffDay < 30) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;

  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;

  const diffYear = Math.floor(diffMonth / 12);
  return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`;
}
