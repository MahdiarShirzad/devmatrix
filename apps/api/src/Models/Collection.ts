import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICollection extends Document {
  name: string;
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  env: "Local" | "Development" | "Production";
  baseUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const collectionSchema = new Schema<ICollection>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "GithubProject",
      required: true,
      index: true,
    },
    env: {
      type: String,
      enum: ["Local", "Development", "Production"],
      required: true,
    },
    baseUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Collections are always listed scoped to a project.
collectionSchema.index({ projectId: 1, createdAt: -1 });
// Kept for any remaining userId-only lookups (e.g. ownership checks).
collectionSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<ICollection>("Collection", collectionSchema);
