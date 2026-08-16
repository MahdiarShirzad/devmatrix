import { model, Schema, Types } from "mongoose";

interface Idea {
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  title: string;
  description: string;
  status: "pending" | "completed" | "failed";
  category?: string;
  overallScore?: number;
  overallSummary?: string;
  marketFitScore?: number;
  marketFitSummary?: string;
  competitionScore?: number;
  competitionSummary?: string;
  riskScore?: number;
  riskSummary?: string;
  errorMessage?: string;
}

const ideaSchema = new Schema<Idea>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    projectId: {
      type: Types.ObjectId,
      ref: "GithubProject",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4000,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
      index: true,
    },
    category: { type: String, trim: true, maxlength: 60 },
    overallScore: { type: Number, min: 0, max: 100 },
    overallSummary: { type: String },
    marketFitScore: { type: Number, min: 0, max: 100 },
    marketFitSummary: { type: String },
    competitionScore: { type: Number, min: 0, max: 100 },
    competitionSummary: { type: String },
    riskScore: { type: Number, min: 0, max: 100 },
    riskSummary: { type: String },
    errorMessage: { type: String },
  },
  {
    timestamps: true,
  },
);

ideaSchema.index({ userId: 1, projectId: 1, createdAt: -1 });

export const Idea = model<Idea>("Idea", ideaSchema);
