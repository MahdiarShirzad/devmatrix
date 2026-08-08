import mongoose, { Document, Schema } from "mongoose";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ISavedRequest extends Document {
  collectionId: string;
  name: string;
  method: HttpMethod;
  path: string;
  headers: Record<string, string>;
  body?: string;
  params: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const savedRequestSchema = new Schema<ISavedRequest>(
  {
    collectionId: {
      type: String,
      ref: "Collection",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      required: true,
      default: "GET",
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    headers: {
      type: Schema.Types.Mixed,
      default: {},
    },
    body: {
      type: String,
    },
    params: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

savedRequestSchema.index({ collectionId: 1, name: 1 });

export default mongoose.model<ISavedRequest>(
  "SavedRequest",
  savedRequestSchema,
);
