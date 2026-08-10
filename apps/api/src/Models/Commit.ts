import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ICommit extends Document {
  projectId: Types.ObjectId;
  sha: string;
  authorGithubLogin: string | null;
  authorName: string;
  authorEmail: string;
  authorAvatarUrl: string | null;
  message: string;
  additions: number;
  deletions: number;
  totalChanges: number;
  committedAt: Date;
  createdAt: Date;
}

const CommitSchema = new Schema<ICommit>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "GithubProject",
      required: true,
      index: true,
    },
    sha: {
      type: String,
      required: true,
    },
    authorGithubLogin: {
      type: String,
      default: null,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorEmail: {
      type: String,
      default: "",
    },
    authorAvatarUrl: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
    additions: {
      type: Number,
      default: 0,
    },
    deletions: {
      type: Number,
      default: 0,
    },
    totalChanges: {
      type: Number,
      default: 0,
    },
    committedAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

CommitSchema.index({ projectId: 1, sha: 1 }, { unique: true });

CommitSchema.index({ projectId: 1, committedAt: -1 });

const Commit: Model<ICommit> =
  mongoose.models.Commit || mongoose.model<ICommit>("Commit", CommitSchema);

export default Commit;
