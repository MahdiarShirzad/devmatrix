import type { Request, Response, NextFunction } from "express";
import Collection from "../Models/Collection.js";
import SavedRequest from "../Models/SavedRequest.js";
import GithubProject from "../Models/GithubProject.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { runExecuteRequest } from "../services/playgroundService.js";

const findOwnedProject = async (projectId: string, userId: string) => {
  return GithubProject.findOne({ _id: projectId, userId });
};

// POST /api/projects/:projectId/playground/collections
export const createCollection = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, env, baseUrl } = req.body;
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;

    const project = await findOwnedProject(projectId, userId);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    const collection = await Collection.create({
      name,
      env,
      baseUrl,
      userId,
      projectId,
    });

    res.status(201).json({ status: "success", data: { collection } });
  },
);

// GET /api/projects/:projectId/playground/collections
export const getCollections = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;

    const project = await findOwnedProject(projectId, userId);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    const collections = await Collection.find({ userId, projectId }).sort(
      "-updatedAt",
    );

    // requestCount is derived, not stored — attach it per collection
    const withCounts = await Promise.all(
      collections.map(async (collection) => {
        const requestCount = await SavedRequest.countDocuments({
          collectionId: collection._id.toString(),
        });
        return { ...collection.toObject(), requestCount };
      }),
    );

    res.status(200).json({
      status: "success",
      results: withCounts.length,
      data: { collections: withCounts },
    });
  },
);

// GET /api/projects/:projectId/playground/collections/:id
export const getCollection = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const id = req.params.id as string;

    const collection = await Collection.findOne({
      _id: id,
      userId,
      projectId,
    });

    if (!collection) {
      return next(new AppError("Collection not found", 404));
    }

    const requests = await SavedRequest.find({
      collectionId: collection._id.toString(),
    }).sort("createdAt");

    res.status(200).json({
      status: "success",
      data: { collection, requests },
    });
  },
);

// DELETE /api/projects/:projectId/playground/collections/:id
export const deleteCollection = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const id = req.params.id as string;

    const collection = await Collection.findOneAndDelete({
      _id: id,
      userId,
      projectId,
    });

    if (!collection) {
      return next(new AppError("Collection not found", 404));
    }

    // Requests belong to the collection — clean them up too
    await SavedRequest.deleteMany({
      collectionId: collection._id.toString(),
    });

    res.status(204).json({ status: "success", data: null });
  },
);

// POST /api/projects/:projectId/playground/collections/:id/requests
export const createRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const id = req.params.id as string;

    const collection = await Collection.findOne({
      _id: id,
      userId,
      projectId,
    });

    if (!collection) {
      return next(new AppError("Collection not found", 404));
    }

    const { name, method, path, headers, body, params } = req.body;

    const savedRequest = await SavedRequest.create({
      collectionId: collection._id.toString(),
      name,
      method,
      path,
      headers,
      body,
      params,
    });

    res
      .status(201)
      .json({ status: "success", data: { request: savedRequest } });
  },
);

// PATCH /api/projects/:projectId/playground/requests/:id
export const updateRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const id = req.params.id as string;

    const savedRequest = await SavedRequest.findById(id);

    if (!savedRequest) {
      return next(new AppError("Request not found", 404));
    }

    // Ownership check goes through the parent collection, scoped to project
    const collection = await Collection.findOne({
      _id: savedRequest.collectionId.toString(),
      userId,
      projectId,
    });

    if (!collection) {
      return next(new AppError("Request not found", 404));
    }

    const { name, method, path, headers, body, params } = req.body;

    if (name !== undefined) savedRequest.name = name;
    if (method !== undefined) savedRequest.method = method;
    if (path !== undefined) savedRequest.path = path;
    if (headers !== undefined) savedRequest.headers = headers;
    if (body !== undefined) savedRequest.body = body;
    if (params !== undefined) savedRequest.params = params;

    await savedRequest.save();

    res
      .status(200)
      .json({ status: "success", data: { request: savedRequest } });
  },
);

// DELETE /api/projects/:projectId/playground/requests/:id
export const deleteRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const id = req.params.id as string;

    const savedRequest = await SavedRequest.findById(id);

    if (!savedRequest) {
      return next(new AppError("Request not found", 404));
    }

    const collection = await Collection.findOne({
      _id: savedRequest.collectionId.toString(),
      userId,
      projectId,
    });

    if (!collection) {
      return next(new AppError("Request not found", 404));
    }

    await savedRequest.deleteOne();

    res.status(204).json({ status: "success", data: null });
  },
);

// POST /api/projects/:projectId/playground/execute
export const executeRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).userId;
    const projectId = req.params.projectId as string;
    const { method, url, headers, body, requestId } = req.body;

    // All the tricky logic (SSRF guard, timeout, size limit) lives in the service
    const result = await runExecuteRequest({ method, url, headers, body });

    // If this execution is tied to a saved request, persist the response
    // so it's still visible after a refresh or switching requests.
    if (requestId) {
      const savedRequest = await SavedRequest.findById(requestId);

      if (savedRequest) {
        const collection = await Collection.findOne({
          _id: savedRequest.collectionId.toString(),
          userId,
          projectId,
        });

        // Only persist if the request still belongs to this user/project —
        // otherwise silently skip persistence but still return the result.
        if (collection) {
          savedRequest.lastResponse = {
            status: result.status,
            body: result.body,
            durationMs: result.durationMs,
            sizeBytes: result.sizeBytes,
            executedAt: new Date(),
          };
          await savedRequest.save();
        }
      }
    }

    res.status(200).json({ status: "success", data: result });
  },
);
