import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync.js";
import Collection from "../Models/Collection.js";
import SavedRequest from "../Models/SavedRequest.js";
import AppError from "../utils/appError.js";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createCollection = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { name, env, baseUrl } = req.body;

    const collection = await Collection.create({
      name,
      env,
      baseUrl,
      userId: req.user!.id,
    });

    res.status(201).json({ status: "success", data: { collection } });
  },
);

export const getCollections = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const collections = await Collection.find({ userId: req.user!.id }).sort(
      "-updatedAt",
    );

    const withCounts = await Promise.all(
      collections.map(async (collection) => {
        const requestCount = await SavedRequest.countDocuments({
          collectionId: collection._id,
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

export const getCollection = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const collection = await Collection.findOne({
      _id: req.params.id,
      userId: req.user!.id,
    });

    if (!collection) {
      return next(new AppError("Collection not found", 404));
    }

    const requests = await SavedRequest.find({
      collectionId: collection._id,
    }).sort("_createdAt");

    res.status(200).json({
      status: "success",
      data: { collection, requests },
    });
  },
);

export const deleteCollection = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const collection = await Collection.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!.id,
    });

    if (!collection) {
      return next(new AppError("Collection not found", 404));
    }

    await SavedRequest.deleteMany({ collectionId: collection._id });

    res.status(204).json({
      status: "success",
      data: null,
    });
  },
);

export const createRequest = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const collection = await Collection.findOne({
      _id: req.params.id,
      userId: req.user!.id,
    });

    if (!collection) {
      return next(new AppError("Collection not found", 404));
    }

    const { name, method, path, headers, body, params } = req.body;

    const savedRequest = await SavedRequest.create({
      collectionId: collection._id,
      name,
      mathod,
      path,
      headers,
      body,
      params,
    });

    res.status(201).json({ status: "success", data: { savedRequest } });
  },
);

export const updateRequest = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const savedRequest = await SavedRequest.findById(req.params.id);

    if (!savedRequest) {
      return next(new AppError("Request not found", 404));
    }

    const collection = await Collection.findOne({
      _id: savedRequest.collectionId,
      userId: req.user!.id,
    });

    if (!collection) {
      return next(new AppError("Collection not found", 404));
    }

    const { name, method, path, headers, body, params } = req.body;

    if (name !== undefined) savedRequest.name = name;
    if (method !== undefined) savedRequest.method = method;
    if (path !== undefined) savedRequest.path = path;
    if (headers !== undefined) savedRequest.headers = headers;
    if (body !== undefined) savedRequest.body = body;
    if (params !== undefined) savedRequest.params = params;

    await savedRequest.save();

    res.status(200).json({ status: "success", data: { savedRequest } });
  },
);

export const deleteRequest = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const savedRequest = await SavedRequest.findById(req.params.id);

    if (!savedRequest) {
      return next(new AppError("Request not found", 404));
    }

    const collection = await Collection.findOne({
      _id: savedRequest.collectionId,
      userId: req.user!.id,
    });

    if (!collection) {
      return next(new AppError("Request not found", 404));
    }

    await savedRequest.deleteOne();

    res.status(204).json({ status: "success", data: null });
  },
);

export const executeRequest = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { method, url, headers, body } = req.body;

    // All the tricky logic (SSRF guard, timeout, size limit) lives in the service
    const result = await runExecuteRequest({ method, url, headers, body });

    res.status(200).json({ status: "success", data: result });
  },
);
