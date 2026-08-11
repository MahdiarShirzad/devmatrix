import { Types } from "mongoose";
import GithubProject from "../../Models/GithubProject.js";
import Commit from "../../Models/Commit.js";
import PullRequest from "../../Models/PullRequest.js";
import User from "../../Models/User.js";
import AppError from "../../utils/appError.js";
import { listCommits, listPullRequests } from "./githubClient.js";
import { mapCommits, mapPullRequests } from "./githubMapper.js";

export interface SyncResult {
  commitsUpserted: number;
  pullRequestsUpserted: number;
  syncedAt: Date;
}

export const syncProjectData = async (
  projectId: string,
  userId: string,
): Promise<SyncResult> => {
  const project = await GithubProject.findOne({
    _id: projectId,
    userId,
  });

  if (!project) {
    throw new AppError("پروژه پیدا نشد یا متعلق به شما نیست", 404);
  }

  const user = await User.findById(userId).select("+githubAccessToken");
  if (!user || !user.githubAccessToken) {
    throw new AppError(
      "حساب گیت‌هاب متصل نیست یا access token موجود نیست",
      401,
    );
  }

  const [owner, repo] = project.fullName.split("/");
  if (!owner || !repo) {
    throw new AppError("نام پروژه نامعتبر است", 400);
  }

  const since = project.lastSyncedAt ?? undefined;

  const [rawCommits, rawPrs] = await Promise.all([
    listCommits(user.githubAccessToken, owner, repo, since),
    listPullRequests(user.githubAccessToken, owner, repo),
  ]);

  const projectObjectId = project._id as Types.ObjectId;

  const mappedCommits = mapCommits(rawCommits as any, projectObjectId);
  const mappedPrs = mapPullRequests(rawPrs as any, projectObjectId);

  const [commitResult, prResult] = await Promise.all([
    upsertCommits(mappedCommits),
    upsertPullRequests(mappedPrs),
  ]);

  const syncedAt = new Date();
  project.lastSyncedAt = syncedAt;
  await project.save();

  return {
    commitsUpserted: commitResult,
    pullRequestsUpserted: prResult,
    syncedAt,
  };
};

const upsertCommits = async (
  commits: ReturnType<typeof mapCommits>,
): Promise<number> => {
  if (commits.length === 0) return 0;

  const operations = commits.map((commit) => ({
    updateOne: {
      filter: { projectId: commit.projectId, sha: commit.sha },
      update: { $set: commit },
      upsert: true,
    },
  }));

  const result = await Commit.bulkWrite(operations);
  return result.upsertedCount + result.modifiedCount;
};

const upsertPullRequests = async (
  prs: ReturnType<typeof mapPullRequests>,
): Promise<number> => {
  if (prs.length === 0) return 0;

  const operations = prs.map((pr) => ({
    updateOne: {
      filter: { projectId: pr.projectId, githubPrNumber: pr.githubPrNumber },
      update: { $set: pr },
      upsert: true,
    },
  }));

  const result = await PullRequest.bulkWrite(operations);
  return result.upsertedCount + result.modifiedCount;
};
