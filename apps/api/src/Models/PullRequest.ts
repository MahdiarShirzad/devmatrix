import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type PullRequestState = "open" | "closed" | "merged";

export interface IPullRequest extends Document {
  projectId: Types.ObjectId;
  githubPrNumber: number;
  title: string;
  authorGithubLogin: string;
  authorAvatarUrl: string | null;
  state: PullRequestState;
  additions: number;
  deletions: number;
  changedFiles: number;
  createdAt: Date;
  mergedAt: Date | null;
  closedAt: Date | null;
}

const PullRequestSchema = new Schema<IPullRequest>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "GithubProject",
      required: true,
      index: true,
    },
    githubPrNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authorGithubLogin: {
      type: String,
      required: true,
      index: true,
    },
    authorAvatarUrl: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      enum: ["open", "closed", "merged"],
      required: true,
      index: true,
    },
    additions: {
      type: Number,
      default: 0,
    },
    deletions: {
      type: Number,
      default: 0,
    },
    changedFiles: {
      type: Number,
      default: 0,
    },
    mergedAt: {
      type: Date,
      default: null,
    },
    closedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

PullRequestSchema.index({ projectId: 1, githubPrNumber: 1 }, { unique: true });

const PullRequest: Model<IPullRequest> =
  mongoose.models.PullRequest ||
  mongoose.model<IPullRequest>("PullRequest", PullRequestSchema);

export default PullRequest;
