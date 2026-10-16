import express from "express";
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from "vitest";
import GithubProject from "../Models/GithubProject.js";
import Commit from "../Models/Commit.js";
import PullRequest from "../Models/PullRequest.js";
import { DebugSession } from "../Models/DebugSession.js";
import { Idea } from "../Models/Idea.js";
import type { Types } from "mongoose";

let mongod: MongoMemoryServer;
let app: express.Express;

const ORIGIN = "http://localhost:3000";
const DAY = 24 * 60 * 60 * 1000;

const daysAgo = (days: number): Date => new Date(Date.now() - days * DAY);

const extractCookies = (res: request.Response): string[] =>
  (res.headers["set-cookie"] as unknown as string[]) ?? [];

const registerUser = async (email: string) => {
  const res = await request(app)
    .post("/api/auth/register")
    .set("Origin", ORIGIN)
    .send({ name: "Analytics User", email, password: "secret123" });
  const me = await request(app)
    .get("/api/auth/me")
    .set("Cookie", extractCookies(res));
  return {
    cookies: extractCookies(res),
    userId: String(me.body.user.id) as string,
  };
};

const seedProject = async (userId: string, overrides: Record<string, unknown> = {}) =>
  GithubProject.create({
    userId: new mongoose.Types.ObjectId(userId),
    provider: "github",
    githubRepoId: Math.floor(Math.random() * 1_000_000),
    fullName: "acme/widget",
    name: "widget",
    ownerLogin: "acme",
    languages: { JavaScript: 1000, TypeScript: 500 },
    primaryLanguage: "JavaScript",
    lastSyncedAt: new Date(),
    ...overrides,
  });

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  app = (await import("../app.js")).default;
});

afterEach(async () => {
  const collections = await mongoose.connection.db!.collections();
  await Promise.all(collections.map((c) => c.deleteMany({})));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("dashboard analytics", () => {
  it("aggregates KPIs, languages and project breakdown from real data", async () => {
    const { cookies, userId } = await registerUser("analytics@example.com");
    const project = await seedProject(userId);
    const projectId = project._id as Types.ObjectId;

    await Commit.create([
      { projectId, sha: "a1", message: "today", committedAt: daysAgo(0) },
      { projectId, sha: "a2", message: "two days ago", committedAt: daysAgo(2) },
      {
        projectId,
        sha: "a3",
        message: "forty days ago",
        committedAt: daysAgo(40),
      },
    ]);

    await PullRequest.create({
      projectId,
      githubPrNumber: 1,
      title: "Merge me",
      authorGithubLogin: "acme",
      state: "merged",
      mergedAt: daysAgo(1),
    });

    const res = await request(app)
      .get("/api/dashboard/analytics?days=30")
      .set("Cookie", cookies);

    expect(res.status).toBe(200);
    expect(res.body.kpis.commits.value).toBe(2);
    // Previous 30-day window contains only the 40-days-ago commit.
    expect(res.body.kpis.commits.previous).toBe(1);
    expect(res.body.kpis.commits.changePct).toBe(100);
    expect(res.body.kpis.mergedPullRequests.value).toBe(1);
    expect(res.body.kpis.projects.total).toBe(1);
    expect(res.body.kpis.activeDays).toBe(2);
    expect(res.body.kpis.currentStreak).toBe(1);

    // Real language metadata, sorted by bytes descending.
    expect(res.body.languages[0].language).toBe("JavaScript");
    expect(res.body.languages[0].percent).toBeGreaterThan(60);

    expect(res.body.projectBreakdown).toHaveLength(1);
    expect(res.body.projectBreakdown[0].commits).toBe(2);
    expect(res.body.activitySeries[0]).toHaveProperty("commits");
    // Heatmap covers the full requested window.
    expect(res.body.heatmap).toHaveLength(30);
  });

  it("aggregates debugging and idea analytics with workspace scoping", async () => {
    const { cookies, userId } = await registerUser("mixed@example.com");
    const project = await seedProject(userId);
    const projectId = project._id as Types.ObjectId;

    await DebugSession.create([
      {
        userId: new mongoose.Types.ObjectId(userId),
        projectId,
        title: "Resolved bug",
        language: "TypeScript",
        sourceCode: "x",
        status: "resolved",
        resolvedAt: daysAgo(1),
        createdAt: daysAgo(2),
      },
      {
        userId: new mongoose.Types.ObjectId(userId),
        projectId,
        title: "Failing bug",
        language: "JavaScript",
        sourceCode: "y",
        status: "failed",
        createdAt: daysAgo(1),
      },
    ]);

    await Idea.create([
      {
        userId: new mongoose.Types.ObjectId(userId),
        projectId,
        title: "Great idea",
        description: "d",
        status: "completed",
        category: "SaaS",
        overallScore: 82,
        marketFitScore: 70,
        competitionScore: 60,
        riskScore: 40,
      },
      {
        userId: new mongoose.Types.ObjectId(userId),
        projectId,
        title: "Weak idea",
        description: "d",
        status: "completed",
        category: "SaaS",
        overallScore: 40,
      },
    ]);

    const debug = await request(app)
      .get("/api/dashboard/debugging?days=30")
      .set("Cookie", cookies);
    expect(debug.status).toBe(200);
    expect(debug.body.totals.total).toBe(2);
    expect(debug.body.totals.resolved).toBe(1);
    expect(debug.body.totals.resolutionRate).toBe(50);
    expect(debug.body.attention).toHaveLength(1);
    expect(debug.body.attention[0].title).toBe("Failing bug");

    const ideas = await request(app)
      .get("/api/dashboard/ideas?days=30")
      .set("Cookie", cookies);
    expect(ideas.status).toBe(200);
    expect(ideas.body.totals.total).toBe(2);
    expect(ideas.body.totals.validated).toBe(1);
    expect(ideas.body.totals.successRate).toBe(50);
    expect(ideas.body.scores.avgOverall).toBe(61);
    expect(ideas.body.byCategory[0].category).toBe("SaaS");
  });

  it("rejects unknown project ids and other users' projects", async () => {
    const { cookies } = await registerUser("owner@example.com");
    const other = await registerUser("other@example.com");
    const otherProject = await seedProject(other.userId);

    const invalid = await request(app)
      .get("/api/dashboard/analytics?projectId=not-an-id")
      .set("Cookie", cookies);
    expect(invalid.status).toBe(400);

    const foreign = await request(app)
      .get(`/api/dashboard/analytics?projectId=${otherProject._id}`)
      .set("Cookie", cookies);
    expect(foreign.status).toBe(404);
  });

  it("scopes analytics to the requested project", async () => {
    const { cookies, userId } = await registerUser("scope@example.com");
    const projectA = await seedProject(userId, { githubRepoId: 101, name: "a" });
    const projectB = await seedProject(userId, { githubRepoId: 102, name: "b" });

    await Commit.create([
      {
        projectId: projectA._id as Types.ObjectId,
        sha: "b1",
        message: "a",
        committedAt: daysAgo(1),
      },
      {
        projectId: projectB._id as Types.ObjectId,
        sha: "b2",
        message: "b",
        committedAt: daysAgo(1),
      },
      {
        projectId: projectB._id as Types.ObjectId,
        sha: "b3",
        message: "b",
        committedAt: daysAgo(1),
      },
    ]);

    const res = await request(app)
      .get(`/api/dashboard/analytics?days=30&projectId=${projectA._id}`)
      .set("Cookie", cookies);

    expect(res.status).toBe(200);
    expect(res.body.kpis.commits.value).toBe(1);
    expect(res.body.projectBreakdown).toHaveLength(1);
    expect(res.body.projectBreakdown[0].name).toBe("a");
  });
});
