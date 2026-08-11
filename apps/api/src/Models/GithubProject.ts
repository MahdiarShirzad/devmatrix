import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type GithubProjectProvider = "github" | "gitlab";

export interface IGithubProject extends Document {
  userId: Types.ObjectId;
  provider: GithubProjectProvider;
  githubRepoId: number;
  fullName: string;
  name: string;
  ownerLogin: string;
  defaultBranch: string;
  isPrivate: boolean;
  isActive: boolean;
  lastSyncedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const GithubProjectSchema = new Schema<IGithubProject>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    provider: {
      type: String,
      enum: ["github", "gitlab"],
      required: true,
      default: "github",
    },
    githubRepoId: {
      type: Number,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownerLogin: {
      type: String,
      required: true,
    },
    defaultBranch: {
      type: String,
      default: "main",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastSyncedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

GithubProjectSchema.index({ userId: 1, githubRepoId: 1 }, { unique: true });

const GithubProject: Model<IGithubProject> =
  mongoose.models.GithubProject ||
  mongoose.model<IGithubProject>("GithubProject", GithubProjectSchema);

export default GithubProject;
