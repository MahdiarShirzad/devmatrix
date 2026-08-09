import { Schema, model, Types } from "mongoose";

interface IDebugSession {
  userId: Types.ObjectId;
  projectId?: Types.ObjectId;
  title: string;
  language: string;
  sourceCode: string;
  userDescription?: string;
  status: "pending" | "in_progress" | "resolved" | "failed";
  explanation?: string;
  fixedCode?: string;
  errorMessage?: string;
  resolvedAt?: Date;
}

const debugSessionSchema = new Schema<IDebugSession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    projectId: { type: Schema.Types.ObjectId, ref: "Project" },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    language: { type: String, required: true },
    sourceCode: { type: String, required: true, maxlength: 20000 },
    userDescription: { type: String, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved", "failed"],
      default: "pending",
      index: true,
    },
    explanation: { type: String },
    fixedCode: { type: String },
    errorMessage: { type: String },
    resolvedAt: { type: Date },
  },
  { timestamps: true },
);

export const DebugSession = model<IDebugSession>(
  "DebugSession",
  debugSessionSchema,
);
