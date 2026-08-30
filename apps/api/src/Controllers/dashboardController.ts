import type { Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import { parseDaysParam } from "../utils/parseDaysParam.js";
import GithubProject from "../Models/GithubProject.js";
import Commit from "../Models/Commit.js";
import { DebugSession } from "../Models/DebugSession.js";
import { Idea } from "../Models/Idea.js";

type ActivityType =
  | "commit"
  | "debug_resolved"
  | "debug_failed"
  | "idea_created"
  | "idea_validated"
  | "api_request";

interface DashboardActivityItem {
  id: string;
  type: ActivityType;
  projectId?: string;
  projectName?: string;
  title: string;
  description?: string;
  createdAt: string;
}

const DEFAULT_LIMIT = 30;

export const getActivity = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userId = (req as any).userId;
    const { isAllTime, rangeStart } = parseDaysParam(req.query.days);
    const limit = Math.min(
      Math.max(Number(req.query.limit) || DEFAULT_LIMIT, 1),
      100,
    );

    const projects = await GithubProject.find({
      userId,
      isActive: true,
    }).select("_id name");

    const projectIds = projects.map((p) => p._id);
    const projectNameById = new Map(
      projects.map((p) => [String(p._id), p.name]),
    );

    if (projectIds.length === 0) {
      res.status(200).json({ status: "success", activity: [] });
      return;
    }

    const commitMatch: Record<string, unknown> = {
      projectId: { $in: projectIds },
    };
    const debugMatch: Record<string, unknown> = {
      userId: userId.toString(),
    };
    const ideaMatch: Record<string, unknown> = { userId };

    if (!isAllTime && rangeStart) {
      commitMatch.committedAt = { $gte: rangeStart };
      debugMatch.createdAt = { $gte: rangeStart };
      ideaMatch.createdAt = { $gte: rangeStart };
    }

    // Pull more than `limit` from each source before merging, since
    // sorting happens after the merge — otherwise a project with many
    // commits could crowd out debug/idea activity from the same window.
    const perSourceLimit = limit * 2;

    const [commits, debugSessions, ideas] = await Promise.all([
      Commit.find(commitMatch)
        .sort({ committedAt: -1 })
        .limit(perSourceLimit)
        .select("projectId message committedAt authorName"),
      DebugSession.find(debugMatch)
        .sort({ createdAt: -1 })
        .limit(perSourceLimit)
        .select("projectId title status createdAt resolvedAt language"),
      Idea.find(ideaMatch)
        .sort({ createdAt: -1 })
        .limit(perSourceLimit)
        .select("projectId title status overallScore createdAt"),
    ]);

    const items: DashboardActivityItem[] = [];

    for (const c of commits) {
      const pid = String(c.projectId);
      items.push({
        id: `commit-${c._id}`,
        type: "commit",
        projectId: pid,
        projectName: projectNameById.get(pid),
        title: c.message?.split("\n")[0] || "Commit pushed",
        description: c.authorName ? `by ${c.authorName}` : undefined,
        createdAt: (c.committedAt as Date).toISOString(),
      });
    }

    for (const s of debugSessions) {
      const pid = s.projectId ? String(s.projectId) : undefined;
      const isResolved = s.status === "resolved";
      const isFailed = s.status === "failed";
      // Only surface sessions that reached a terminal state — in_progress
      // isn't "activity" that happened, it's activity in flight.
      if (!isResolved && !isFailed) continue;

      items.push({
        id: `debug-${s._id}`,
        type: isResolved ? "debug_resolved" : "debug_failed",
        projectId: pid,
        projectName: pid ? projectNameById.get(pid) : undefined,
        title: isResolved
          ? `Resolved ${s.language} issue: ${s.title}`
          : `Failed to resolve: ${s.title}`,
        createdAt: (
          (isResolved && s.resolvedAt ? s.resolvedAt : s.createdAt) as Date
        ).toISOString(),
      });
    }

    for (const i of ideas) {
      const pid = i.projectId ? String(i.projectId) : undefined;
      const isValidated =
        typeof i.overallScore === "number" && i.overallScore >= 70;

      items.push({
        id: `idea-${i._id}`,
        type: isValidated ? "idea_validated" : "idea_created",
        projectId: pid,
        projectName: pid ? projectNameById.get(pid) : undefined,
        title: isValidated
          ? `Validated "${i.title}"`
          : `Created idea "${i.title}"`,
        createdAt: (i.createdAt as Date).toISOString(),
      });
    }

    items.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    res.status(200).json({
      status: "success",
      activity: items.slice(0, limit),
    });
  },
);
